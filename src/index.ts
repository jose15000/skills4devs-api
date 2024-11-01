import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { connectToDatabase } from "./DB";
import { authRoutes } from "./Auth";
import { chatRoute } from "./chat/chatroute";
await connectToDatabase();
const app = new Elysia({ prefix: "/api" })

  .use(cors())
  .use(swagger())
  .use(authRoutes)
  .use(chatRoute)
  .get("/", () => "Hello Elysia")
  .listen(3000);
