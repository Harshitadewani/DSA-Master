const { GoogleGenerativeAI } = require("@google/generative-ai");
const env = require("../config/env");
const ApiError = require("../utils/apiError");

async function askGemini({ problemTitle, problemDescription, userCode, prompt }) {
  if (!env.geminiApiKey) {
    throw new ApiError(400, "Gemini API key is not configured");
  }

  const genAI = new GoogleGenerativeAI(env.geminiApiKey);
  const model = genAI.getGenerativeModel({
    model: env.geminiModel || "gemini-2.5-flash"
  }, { apiVersion: 'v1' });

  const fullPrompt = `
You are an Elite DSA Coding Mentor with a focus on clean, high-density technical guidance.
Current Problem: "${problemTitle}"
Problem Context: ${problemDescription}
User's Current Source Code:
\`\`\`
${userCode}
\`\`\`

User Question: "${prompt}"

STRICT GUIDELINES:
1. RESPONSE FORMAT: Always use professional Markdown. Use clear headings (h3), bold text for emphasis, and bullet points for readability.
2. CODE BLOCKS: If asked for code, or if code helps explain a concept, ALWAYS provide it in a clean markdown code block with the correct language identifier (e.g. \`\`\`javascript).
3. STYLE: Do NOT use excessive asterisks or cluttered symbols. Keep it elegant and spacious.
4. STRUCTURE: 
   - Start with a direct answer or high-level logic.
   - Use bullet points for step-by-step breakdown.
   - End with a performance/complexity note if applicable.
5. NO PLEASANTRIES: Skip "Hello" or "I can help with that". Get straight to the intelligence.
`;

  try {
    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();
    // Basic sanitization to ensure code blocks and markdown are preserved
    return text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new ApiError(500, `AI Assistant failed: ${error.message}`);
  }
}

module.exports = { askGemini };
