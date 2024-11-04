import { Elysia, t } from "elysia";
import bcrypt from "bcrypt";
import { User } from "../../models/user";
import jwt from "jsonwebtoken";

export const authRoutes = new Elysia({ prefix: "/auth" })

  .post(
    "/signin",

    async (req) => {
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
        { expiresIn: "5min" }
      );

      return { message: "User Authenticated.", token };
    }
  )
  .post("/signup", async (req) => {
    const { email, name, password } = (await req.body) as {
      email: string;
      password: string;
      name: string;
    };

    try {
      const newPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: newPassword });

      const user = User.findOne({ email });

      if (!user) {
        await newUser.save();
      } else {
        return "There is already an user with this email.";
      }

      return "User created.";
    } catch (error) {
      console.log(error);
      return "An error ocourred while creating the new user.";
    }
  });
