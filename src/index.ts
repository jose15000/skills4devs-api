import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { connectToDatabase } from "./DB";
import { signup } from "./Auth/signup";
import { chatRoute } from "./chat/chatroute";
import { signin } from "./Auth/signin";
const app = new Elysia();
await connectToDatabase();

app.use(cors());
app.use(swagger());

chatRoute(app);
signup(app);
signin(app);

app.get("/", () => "Hello Elysia").listen(3000);
