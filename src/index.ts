import { Elysia } from "elysia";
import { conversation, input } from "./chat";

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
        content: process.env.PROMPT,
      },
    ];
  }

  conversation[userId].push({ role: "user", content: prompt });
  const response = await input(prompt, userId);

  return { response: response };
});

app.get("/", () => "Hello Elysia").listen(3000);
