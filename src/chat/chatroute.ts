import Elysia from "elysia";
import { conversation, input } from ".";

export const chatRoute = (app: Elysia) => {
  app.post("/chat", async (req) => {
    const { prompt, userId } = (await req.body) as {
      prompt: string;
      userId: number;
    };

    if (!conversation[userId]) {
      conversation[userId] = [
        {
          role: "system",
          content: Bun.env.PROMPT,
        },
      ];
    }
    const response = await input(prompt, userId);
    conversation[userId].push({ role: "user", content: response });

    return { response: response };
  });
};
