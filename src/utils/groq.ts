// utils/groq.ts
import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

// Ensure GROQ_API_KEY is defined
const apiKey = process.env.GROQ_API_KEY;
if (!apiKey) throw new Error("GROQ_API_KEY is not defined in .env");


const groq = new Groq({ apiKey });

export interface GroqChatCompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: { role: string; content: string };
    finish_reason: string;
  }>;
}

/**
 * Generate a quiz from a given text using Groq API.
 * @param extractedText The text extracted from the PDF.
 */
export async function generateQuizFromText(extractedText: string): Promise<GroqChatCompletion> {
  if (!extractedText) throw new Error("No text provided for quiz generation");

  const prompt = `Generate 3 MCQs, 2 SAQs, and 1 LAQ from the following text. Include the correct answer and a short explanation for each. Text: '${extractedText}'`;

  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "openai/gpt-oss-20b",
  });

  // Map response to match GroqChatCompletion interface
  return {
    ...response,
    choices: response.choices.map(choice => ({
      ...choice,
      message: {
        ...choice.message,
        content: choice.message.content ?? "",
      },
    })),
  } as GroqChatCompletion;
}