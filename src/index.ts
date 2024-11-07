import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { connectToDatabase } from "./DB";
import { authRoutes } from "./Auth";
import { chatRoute } from "./chat/chatRoute";
await connectToDatabase();
new Elysia()
  .use(cors())
  .use(swagger())
  .use(authRoutes)
  .use(chatRoute)
  .get("/", () => "Hello Elysia")
  .listen(3000);
