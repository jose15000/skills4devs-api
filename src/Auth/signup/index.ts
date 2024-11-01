import Elysia from "elysia";
import { User } from "../../../models/user";
import bcrypt from "bcrypt";
export const signup = (app: Elysia) => {
  app.post("/signup", async (req) => {
    const { name, email, password } = (await req.body) as {
      name: string;
      email: string;
      password: string;
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
};
