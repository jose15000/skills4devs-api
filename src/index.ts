import { Elysia } from "elysia";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

async function input(prompt: string, userId: number) {
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

const conversation: Record<string, any[]> = {};

const app = new Elysia();

app.post("/chat", async (req) => {
  const { prompt, userId } = (await req.body) as {
    prompt: string;
    userId: number;
  };

  if (!conversation[userId]) {
    conversation[userId] = [
      {
        role: "system",
        content:
          "A partir de agora, você é um tech recruiter de uma empresa. Quero que simule uma entrevista para uma vaga de desenvolvedor. Quero que faça uma pergunta por vez, e espere sempre a minha resposta.",
      },
    ];
  }

  conversation[userId].push({ role: "user", content: prompt });
  const response = await input(prompt, userId);

  return { response: response };
});

app.get("/", () => "Hello Elysia").listen(3000 );
