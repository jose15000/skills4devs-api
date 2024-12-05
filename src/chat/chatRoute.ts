import Elysia from "elysia";
import { runConversation } from "./chat";
export const chatRoute = new Elysia({ prefix: "/interviews" }).post(
  "/chat",
  async (req) => {
    const { input } = (await req.body) as {
      input: string;
    };

    try {
      const response = runConversation(input);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
