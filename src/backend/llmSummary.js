const dotenv = require('dotenv');
const axios = require('axios');
const fs = require('fs');
const path = require('path')

// API key and other variables from .env
const OPENROUTER_API_KEY = process.env.API_KEY;
console.log(OPENROUTER_API_KEY)

// File path
const filepa = path.join(__dirname, "test.txt")

// function to read file
function readTxtFile(filepath){
    try {
        const data = fs.readFileSync(filepath, 'utf-8')
        return data;
    } catch (err){
        console.error('Error reading the file:', err);
    return err; // Return null or handle the error as needed
    }
    
}

// Function to call the OpenRouter API & API endpoint and request parameters
async function callOpenRouter(data) {
  try {
    const response = await axios.post(
        apiEndpoint = "https://openrouter.ai/api/v1/chat/completions", 
        requestBody = {
            model: "meta-llama/llama-3.1-8b-instruct:free",
            messages: [
              { role: "user", content: `Summerize the following conversation the sale representative from Rilla: ${data}` },
            ],
          }, {
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    // Extract the message
    const message = response.data.choices[0].message.content
    console.log('Respons meassage: ', message)

  } catch (error) {
    console.error('Error making request:', error);
  }
}

module.exports = { callOpenRouter }

// Call the function to make the API request
const data = readTxtFile(filepa)
callOpenRouter(data);
