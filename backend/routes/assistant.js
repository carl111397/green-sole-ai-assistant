const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
require('dotenv').config();  // Add this

// ✅ Secure API key management
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY  // Use environment variables
});

router.post("/", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query?.trim()) return res.status(400).json({ reply: "Please provide a query." });

    console.log("📩 User query:", query);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an AI agricultural assistant..." },
        { role: "user", content: query }
      ],
      max_tokens: 150
    });

    const aiMessage = completion.choices[0]?.message?.content?.trim() || "No response";
    res.json({ reply: aiMessage });
  } catch (error) {
    console.error("❌ OpenAI Error:", error);
    res.status(500).json({ 
      reply: "AI service error",
      error: error.message 
    });
  }
});

module.exports = router;