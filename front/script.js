document.getElementById('analyze-text-btn').addEventListener('click', analyzeText);
document.getElementById('analyze-tweet-btn').addEventListener('click', analyzeTweet);

const detectionTextElement = document.getElementById('detection-text');
const detectionTweetElement = document.getElementById('detection-tweet');
const resultPositiveText = document.getElementById('result-positive-text');
const resultNegativeText = document.getElementById('result-negative-text');
// const resultPositiveTweet = document.getElementById('result-positive-tweet');
// const resultNegativeTweet = document.getElementById('result-negative-tweet');


// Analyze simple text for hate speech
async function analyzeText() {

    resultNegativeText.innerText = '';
    resultNegativeText.style.display = `none`;

    resultPositiveText.innerText = '';
    resultPositiveText.style.display = `none`;


    const message = document.getElementById('simple-text').value;

    try {
        detectionTextElement.style.display = 'block';

        const response = await fetch('http://localhost:3000/analyze-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        if(data.hate_probability > 0) {
            resultPositiveText.innerText = data.hate_probability.toString() + '%';
            resultPositiveText.style.display = `flex`;
        } else {
            resultNegativeText.innerText = data.hate_probability.toString() + '%';
            resultNegativeText.style.display = `flex`;
        }
    } catch (error) {
        console.error('Error:', error);
    }
    finally {
        detectionTextElement.style.display = 'none';
    }
}

// Analyze a tweet object (tweet + responses) for hate speech
async function analyzeTweet() {
    const tweetObject = document.getElementById('tweet-object').value;
    const resultBox = document.getElementById('tweet-result');

    // resultNegativeTweet.innerHTML = '';
    // resultPositiveTweet.style.display = `none`;

    resultBox.innerHTML = '<p></p>';

    if (tweetObject.trim() === "") {
        resultBox.innerHTML = '<p class="error">Please enter a tweet object to analyze.</p>';
        return;
    }

    try {
        detectionTweetElement.style.display = 'block';

        const parsedObject = JSON.parse(tweetObject);
        const response = await fetch('http://localhost:3000/analyze-tweets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parsedObject)
        });

        const data = await response.json();

        if (data.hate_speech_detected) {
            let resultHTML = '<p class="success">Hate speech detected:</p>';
            data.results.forEach(result => {
                resultHTML += `<p>(user) ${result.username} (id) ${result.user_id} (prob) ${result.hate_probability}%</p>`;
            });
            resultBox.innerHTML = resultHTML;
        } else {
            resultBox.innerHTML = '<p class="success">No hate speech detected.</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        resultBox.innerHTML = '<p class="error">Error: Could not analyze the tweet object. Make sure the input is valid JSON.</p>';
    }
    finally {
        detectionTweetElement.style.display = 'none';
    }
}