import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment.");
  }
  return new GoogleGenAI({ apiKey });
};

export const enhancePrompt = async (rawInput: string): Promise<string> => {
  const ai = getClient();
  
  // Using Gemini 3 Pro Preview as requested for complex text tasks
  const modelId = 'gemini-3-pro-preview';

  const systemInstruction = `
    You are 'PromptAlchemy', an elite Senior Technical Product Manager and Prompt Engineer.
    Your task is to take a vague or simple project idea and transform it into a HIGH-FIDELITY, COMPREHENSIVE SYSTEM PROMPT.
    
    The output must be designed to be fed into another LLM (like Claude 3.5 Sonnet, Gemini 1.5 Pro, or GPT-4o) to build the actual application.
    
    Structure the output carefully in Markdown format. It should include:
    1. **Project Identity**: Name, tagline, and high-level goal.
    2. **User Persona**: Who is this for?
    3. **Core Features**: A bulleted list of MVPs and potential nice-to-haves.
    4. **Tech Stack**: Recommend a modern, robust stack (e.g., React, TypeScript, Tailwind, Node/Supabase/Firebase) based on the idea.
    5. **UI/UX Design Philosophy**: Detailed visual guidelines (e.g., "Glassmorphism", "Brutalist", "Clean SaaS").
    6. **Data Structure**: A rough schema or data model.
    7. **Step-by-Step Implementation Plan**: How the AI should build it.
    8. **Constraints & Rules**: Code quality standards, accessibility, etc.
    
    Tone: Professional, authoritative, technically precise.
    Do not include conversational filler. Output ONLY the improved prompt.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: rawInput,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // Creativity balanced with structure
        topK: 40,
        topP: 0.95,
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated.");
    }

    return text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to enhance prompt. Ensure your API key is valid.");
  }
};