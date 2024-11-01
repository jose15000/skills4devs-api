import { Elysia, t } from "elysia";
import bcrypt from "bcrypt";
import { User } from "../../../models/user";
import jwt from "jsonwebtoken";

export const signin = (app: Elysia) => {
  app.post("/signin", async (req) => {
    const { email, password } = (await req.body) as {
      email: string;
      password: string;
    };

    const user = await User.findOne({ email });

    if (!user) {
      return { message: "Invalid credentials." };
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return { message: "Invalid credentials" };
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return token;
  });
};
