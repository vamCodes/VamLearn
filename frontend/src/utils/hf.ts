import { InferenceClient } from "@huggingface/inference";

// Initialize the client without an API key
const hfClient = new InferenceClient();

export async function generateQuizFromText(extractedText: string) {
  const prompt = `Generate 3 MCQs, 2 SAQs, and 1 LAQ from the following text. Include correct answer and short explanation for each. Output JSON array with id, type, question, options (for MCQs), answer, explanation. Text: "${extractedText}"`;

  try {
    const response = await hfClient.textGeneration({
      model: "google/flan-t5-small",
      inputs: prompt,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7,
      },
    }) as { generated_text?: string }[] | { generated_text?: string };

    const rawText = Array.isArray(response)
      ? response[0]?.generated_text ?? ""
      : response.generated_text ?? "";
    return JSON.parse(rawText);
  } catch (e) {
    console.error("Failed to parse quiz JSON:", e);
    throw new Error("Quiz generation failed");
  }
}