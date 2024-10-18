require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const API_KEY = process.env.API_KEY;  

async function analyzeMessageWithChatGPT(message, isText = true) {

  const textMessage = 'You are an assistant trained to detect hate speech. Do not return null values, your response has to be a number between 0 and 100 based on how likely this message is hate speech, 100 is the most hate speech, and 0 being absolutly no hate speech.'
  const jsonMessage = 'You are an assistant trained to detect hate speech. You are receinving a tweet as an object with its reponses, I need you to detect hate speech inside tweet and its responses, for each hate speech message return an object with user name, message, and hate speech percentage between 0 and 100, 100 being the most hate speech. Do not forget to take into account the context of the main tweet.'

  try {
      const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
              model: 'gpt-3.5-turbo',
              messages: [
                  {
                      role: 'system',
                      content: isText ? textMessage : jsonMessage
                  },
                  {
                      role: 'user',
                      content: message
                  }
              ],
              max_tokens: 200
          },
          {
              headers: {
                  'Authorization': `Bearer ${API_KEY}`,
                  'Content-Type': 'application/json'
              }
          }
      );

      return parseFloat(response.data.choices[0].message.content);  // Retourne la probabilité de discours haineux
  } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
  }
}

// Endpoint pour analyser un texte simple
app.post('/analyze-text', async (req, res) => {
  const { message } = req.body;
  const hateProbability = await analyzeMessageWithChatGPT(message, true);
  res.json({ hate_probability: hateProbability });
});

// Endpoint pour analyser un tweet complet avec ses réponses
app.post('/analyze-tweets', async (req, res) => {
  const tweetData = req.body;
  const results = [];

  for (const response of tweetData.responses) {
      const hateProbability = await analyzeMessageWithChatGPT(response.content, true);

      if (hateProbability > 50) {
          results.push({
              user_id: response.author.user_id,
              username: response.author.username,
              message: response.content,
              hate_probability: hateProbability
          });
      }
  }

  res.json({
      tweet_id: tweetData.tweet.id,
      hate_speech_detected: results.length > 0,
      results
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});