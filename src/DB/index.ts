import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Test");
    console.log("Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
}
