import { GoogleGenerativeAI } from "@google/generative-ai";

export default {
  async fetch(req, env) {
    if (req.method !== "POST")
      return new Response("Only POST", { status: 405 });

    const { prompt } = await req.json();

    const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      tools: [{ google_search: {} }]
    });

    const result = await model.generateContent(prompt);

    return new Response(
      JSON.stringify({ text: result.response.text() }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
};
