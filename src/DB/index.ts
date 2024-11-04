import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    const mongoURL = Bun.env.MONGO_URL;
    if (!mongoURL) {
      return "Environment url was not defined.";
    }
    await mongoose.connect(mongoURL);
    console.log("Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
}
