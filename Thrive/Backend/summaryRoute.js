const express = require("express");
const axios = require("axios");
require("dotenv").config({ path: "./config.env" });

let queryRoute = express.Router();

const prompt = "You are an AI assistant that takes work notes on technical information technology ticket notes and summarizes them with a 5-10 sentence paragraph with the key points in bullet points below the summary paragraph.";

queryRoute.route("/summary").post(async (request, response) => {
    try {
        const apiUrl = "https://thrive-openai.openai.azure.com/openai/deployments/gpt-35-turbo/chat/completions?api-version=2024-02-01";

        const headers = {
            "Content-Type": "application/json",
            "api-key": process.env.THRIVE_API_KEY, 
        };

        const data = {
            "messages": [
                {
                    "role": "system",
                    "content": prompt
                },
                {
                    "role": "user",
                    "content": request.body.text // Correct reference to request body
                }
            ],
            "temperature": 0.7,
            "top_p": 0.95,
            "frequency_penalty": 0,
            "presence_penalty": 0,
            "max_tokens": 800,
            "stop": null
        };

        // Make Axios request
        const aiResponse = await axios.post(apiUrl, data, { headers });

        // Send response back to client
        response.json(aiResponse.data);
    } catch (error) {
        console.error("Error querying AI:", error.response?.data || error.message);
        response.status(500).json({ error: "Failed to query AI", details: error.response?.data || error.message });
    }
});

module.exports = queryRoute;
