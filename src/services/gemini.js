import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const generateSummary = async (articleContent) => {
  if (!API_KEY) {
    return {
      summary: "Gemini API key is missing. Cannot generate summary.",
      highlights: []
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Summarize the following news article in simple language. Create a concise 2-line summary and 5 bullet point highlights.
    
    Article Content:
    ${articleContent}
    
    Format the response exactly like this:
    SUMMARY:
    [2 line summary here]
    
    HIGHLIGHTS:
    - [Point 1]
    - [Point 2]
    - [Point 3]
    - [Point 4]
    - [Point 5]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const summaryMatch = text.match(/SUMMARY:\n([\s\S]*?)HIGHLIGHTS:/);
    const highlightsMatch = text.match(/HIGHLIGHTS:\n([\s\S]*)/);

    const summary = summaryMatch ? summaryMatch[1].trim() : "Summary not available.";
    const highlightsText = highlightsMatch ? highlightsMatch[1].trim() : "";
    const highlights = highlightsText.split('\n').filter(line => line.trim().startsWith('-')).map(line => line.replace('-', '').trim());

    return { summary, highlights };
  } catch (error) {
    console.error("Gemini AI error:", error);
    return {
      summary: "Error generating summary.",
      highlights: []
    };
  }
};
