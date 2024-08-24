const dotenv = require('dotenv');
const axios = require('axios');

// API key and other variables from .env
const OPENROUTER_API_KEY = process.env.API_KEY;
console.log(OPENROUTER_API_KEY)

// API endpoint and request parameters
const apiEndpoint = "https://openrouter.ai/api/v1/chat/completions";
const requestBody = {
  model: "meta-llama/llama-3.1-8b-instruct:free",
  messages: [
    { role: "user", content: "What is the meaning of life?" },
  ],
};

// Function to call the OpenRouter API
async function callOpenRouter() {
  try {
    const response = await axios.post(apiEndpoint, requestBody, {
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    // Extract the message
    const message = response.data.choices[0].message
    console.log('Respons meassage: ', message)


    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error making request:', error);
  }
}

// Call the function to make the API request
callOpenRouter();
