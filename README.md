# 🧠 Hate Speech Detection System

Welcome to the **Hate Speech Detection System**! This project uses **OpenAI's ChatGPT API** to analyze text messages, tweets, and their responses for potential hate speech, returning a probability score for each message.

![Hate Speech Detection Banner](https://your-banner-image-url.com)

## ✨ Features

- **Analyze Simple Text**: Enter a single message to detect hate speech and get a probability score.
- **Analyze Tweet & Responses**: Submit a tweet and its responses in JSON format for a contextual analysis of hate speech across multiple messages.
- **Beautiful Neumorphic UI**: A soft, modern, and responsive user interface.
- **Backend Powered by Node.js & Express**: A backend service handling requests and communication with OpenAI's API.

---

## 🚀 Getting Started

### Prerequisites

Before running this project, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (v14+)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

#### 1. Clone the repository

   ```bash
   git clone https://github.com/pcazin/HateSpeechAI.git
   cd HateSpeechAI
   ```

#### 2. Install the dependencies

    ```bash
    cd backend
    npm install
    ```

#### 3. Configure environment variables

Create a .env file and paste the following content

    ```bash
    OPENAI_API_KEY=your_openai_api_key_here
    ```

### ⚙️ Running the Application

    ```bash
    cd backend
    npm start
    ```

Then double click the index.html file inside the frontend folder to open it in a browser.