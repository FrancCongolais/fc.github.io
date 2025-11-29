import { GoogleGenAI } from "@google/genai";

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

Roadmap Status (Post-Deployment):
- Phase 1: Tech Deployment (COMPLETED)
- Phase 2: PancakeSwap Listing (IN PROGRESS)
- Phase 3: Airdrops & Marketing (Planned)
- Phase 4: FC Wallet App (Planned)

Tone: Professional, patriotic, encouraging, and technically accurate.
Language: Respond in the language the user asks in (mostly French or English).
`;

export const getChatResponse = async (userMessage, history = []) => {
    // API Key must be in process.env.API_KEY
    if (!process.env.API_KEY) {
        throw new Error("API_KEY not found in environment variables.");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            },
            history: history,
        });

        const result = await chat.sendMessage({ message: userMessage });
        return result.text;
    } catch (error) {
        console.error("Gemini API Error in logic:", error);
        throw error;
    }
};
