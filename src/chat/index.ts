import OpenAI from "openai";

export const conversation: Record<string, any[]> = {};

export const openai = new OpenAI({
  apiKey: Bun.env.API_KEY,
});

export async function input(prompt: string, userId: number) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: conversation[userId],
    });
    const botResponse = completion.choices[0].message.content;
    return botResponse;
  } catch (error) {
    console.log(error);
  }
}
