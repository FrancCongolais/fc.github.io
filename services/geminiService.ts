
import { GoogleGenAI } from "@google/genai";
import { 
  MODEL_CHAT, 
  MODEL_VISION, 
  MODEL_IMAGE_GEN, 
  SYSTEM_INSTRUCTION_CHAT, 
  SYSTEM_INSTRUCTION_VISION 
} from '../constants';

// Initialize Gemini Client
// Use process.env.API_KEY directly as per SDK guidelines.
// Note: process.env.API_KEY is replaced by string value during Vite build via define config.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const SYSTEM_INSTRUCTION = `
You are the official AI Assistant for the "Franc Congolais (FC)" token project.
Your role is to answer investor and user questions based STRICTLY on the following whitepaper data:

Project Name: Franc Congolais (FC)
Network: Binance Smart Chain (BEP-20)
Total Supply: 1,000,000,000 FC
Current Price: 0.0000047163 USDT
Token Address: 0xddf5d280948c0c9529ffa93471ae5fb924084444
Price Objective: 1 FC >= 0.1 USDT (Major Goal)
Official Website: https://franccongolais.github.io/fc.github.io
Fees: 2-5% transaction fee (40% Liquidity, 30% Dev, 20% Community, 10% Burn).
Motto: Justice – Paix – Travail.
Vision: To become the premier national cryptocurrency of DR Congo, promoting financial inclusion.
Useful Links:
- Buying: Four.meme (https://four.meme/token/0xddf5d280948c0c9529ffa93471ae5fb924084444)
- Price/Chart: CoinMarketCap DEX (https://dex.coinmarketcap.com/fr/token/bsc/0xddf5d280948c0c9529ffa93471ae5fb924084444)
- Swap: KuCoin Web3 (https://www.kucoin.com/fr/web3/swap?inputCurrency=2&outputCurrency=6898177)
- Explorer: BscScan
- Wallet: Binance Web3
- Community: Telegram (https://t.me/+UZUNcqtBESgxM2Zk), WhatsApp Group, Twitter
- Source: GitHub (https://github.com/FrancCongolais/fc.github.io)

Roadmap Status (Post-Deployment):
- Phase 1: Tech Deployment (COMPLETED) - Token created, deployed, and verified.
- Phase 2: PancakeSwap Listing (IN PROGRESS) - Adding liquidity and marketing.
- Phase 3: Airdrops & Marketing (Planned)
- Phase 4: FC Wallet App (Planned)
- Phase 5: Local Partnerships (Planned)
- Phase 6: Burn & Stabilization (Planned)

Tone: Professional, patriotic, encouraging, and technically accurate.
Language: Respond in the language the user asks in (mostly French or English).
If you do not know the answer based on this data, politely say you don't have that information yet.
`;

export const chatWithGemini = async (userMessage: string, history: { role: string; parts: { text: string }[] }[] = []) => {
  // Check if API Key is valid before attempting call
  // The check is done against the substituted string from Vite config
  if (!process.env.API_KEY || process.env.API_KEY === "") {
    console.warn("API Key is missing in environment.");
    return "Le système de chat est en maintenance (Clé API non configurée). Veuillez contacter l'administrateur ou utiliser les liens Telegram.";
  }

  try {
    const model = 'gemini-2.5-flash';
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Désolé, je rencontre des difficultés techniques pour le moment. Veuillez réessayer plus tard.";
  }
};

// --- Nebula Workspace Services ---

export const sendMessageStream = async (message: string) => {
  const chat = ai.chats.create({
    model: MODEL_CHAT,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION_CHAT,
    },
  });

  return await chat.sendMessageStream({ message });
};

export const analyzeImage = async (base64Image: string, prompt: string) => {
  // Ensure base64 string is correctly formatted
  const base64Data = base64Image.includes(',') ? base64Image.split(',')[1] : base64Image;
  const mimeType = base64Image.includes(';') ? base64Image.split(';')[0].split(':')[1] : 'image/png';

  const response = await ai.models.generateContent({
    model: MODEL_VISION,
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Data,
          },
        },
        {
          text: prompt || "Analyze this image in detail.",
        },
      ],
    },
    config: {
      systemInstruction: SYSTEM_INSTRUCTION_VISION,
    },
  });

  return response.text;
};

export const generateImage = async (prompt: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: MODEL_IMAGE_GEN,
    contents: {
      parts: [
        {
          text: prompt,
        },
      ],
    },
  });

  // Iterate through parts to find the image
  if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
  }

  throw new Error("No image generated.");
};
