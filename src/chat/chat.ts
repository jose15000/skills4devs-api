const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = Bun.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export async function runConversation(input: string) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: Bun.env.PROMPT,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Olá! 😄  É ótimo te ver aqui.  Antes de começarmos, me fale um pouco sobre você e sua experiência como desenvolvedor.  O que te atraiu a essa vaga? \n",
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(input);
  return result.response.text();
}
