const express = require("express");
const database = require("./connect");
const axios = require("axios");
//const { buildContextFromDocuments } = require("./contextBuilder"); 
require("dotenv").config({ path: "./config-2.env" });

const promptRoute = express.Router();

promptRoute.route("/prompt").post(async (req, res) => {
  console.log(req.body.docs)
  const userPrompt = req.body.prompt.message;
  const context = req.body.docs;
  const apiUrl = "https://thrive-openai.openai.azure.com/openai/deployments/gpt-35-turbo/chat/completions?api-version=2024-02-01";

  console.log(context)
  console.log(userPrompt)
  const headers = {
    "Content-Type": "application/json",
    "api-key": process.env.THRIVE_API_KEY,
  };


    const prompt = `
You are an AI assistant for the company trying to help users with questions. The question will be on the first with the heading User Question and then the rest will be followed by the context under Context:.

User Question: ${userPrompt}

Context: ${context}
    `.trim();

    const data = {
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      top_p: 0.95,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 800,
      stop: null,
    };

    console.log(data)

    const aiResponse = await axios.post(apiUrl, data, { headers });
    res.json(aiResponse.data);

//   } catch (error) {
//     console.error("Error querying AI:", error.response?.data || error.message);
//     res.status(500).json({ error: "Failed to query AI", details: error.response?.data || error.message });
//   }
});

module.exports = promptRoute;
