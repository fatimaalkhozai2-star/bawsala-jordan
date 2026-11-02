const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        message: "Please enter a message"
      });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        message: "OpenRouter API key is not configured"
      });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "Bawsala Jordan"
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [
            {
              role: "system",
              content: `You are Bawsala Jordan AI travel assistant.
              Help users explore tourist destinations in Jordan.
              Answer in the same language as the user's question,
              Arabic or English.
              Give clear, friendly and useful travel information.
              Do not invent current prices, opening hours, or availability.
              If you are unsure, say so.`
            },
            {
              role: "user",
              content: message.trim()
            }
          ],
         max_tokens: 1500,
reasoning: {
  effort: "low"
}
        })
      }
    );

    const data = await response.json();
console.log("OpenRouter Status:", response.status);
console.log("OpenRouter Data:", JSON.stringify(data, null, 2));
    if (!response.ok) {
      console.error("OpenRouter Error:", response.status, data);

      return res.status(502).json({
        message: "AI provider error",
        detail: data?.error?.message || "Could not generate response"
      });
    }

    const answer = data?.choices?.[0]?.message?.content;

    if (!answer) {
      return res.status(502).json({
        message: "AI returned an empty response"
      });
    }

    return res.status(200).json({ answer });

  } catch (error) {
    console.error("AI Chat Error:", error.message);

    return res.status(500).json({
      message: "Sorry, the AI assistant is temporarily unavailable."
    });
  }
};

module.exports = { chatWithAI };