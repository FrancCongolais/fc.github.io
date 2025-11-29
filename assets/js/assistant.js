
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are the official AI Assistant for the "Franc Congolais (FC)" token project.
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
Philosophy: La confiance d'abord. Trading ensuite.
Vision: To become the premier national cryptocurrency of DR Congo, promoting financial inclusion.
Useful Links:
- Buying: Four.meme, Binance Web3
- Explorer: BscScan
- Community: Telegram, WhatsApp

Roadmap Status:
- Phase 1: Tech Deployment (COMPLETED)
- Phase 2: PancakeSwap Listing (IN PROGRESS)
- Phase 3: Expansion (Planned)

Tone: Professional, patriotic, encouraging, and technically accurate.
Language: Respond in the language the user asks in (mostly French or English).
`;

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('chat-toggle');
    const windowEl = document.getElementById('chat-window');
    const closeBtn = document.getElementById('chat-close');
    const sendBtn = document.getElementById('chat-send');
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');

    // Initialize AI
    let ai = null;
    let history = [];
    
    // Robust API Key Retrieval
    try {
        // Check if process is defined (Vite/Node env)
        if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
            ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        } else {
            console.warn("API Key not found. Chat will respond with maintenance message.");
        }
    } catch (e) {
        console.error("Error initializing AI:", e);
    }

    const toggleChat = () => {
        const isHidden = windowEl.classList.contains('hidden');
        if (isHidden) {
            windowEl.classList.remove('hidden');
            windowEl.classList.add('flex');
            // Focus input when opening
            setTimeout(() => input.focus(), 100);
        } else {
            windowEl.classList.add('hidden');
            windowEl.classList.remove('flex');
        }
    };

    if (toggle) toggle.addEventListener('click', toggleChat);
    if (closeBtn) closeBtn.addEventListener('click', toggleChat);

    const appendMessage = (text, sender) => {
        if (!messages) return;
        const div = document.createElement('div');
        div.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`;
        
        // Simple markdown-like parsing for bold text
        let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        div.innerHTML = `
            <div class="${sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-200 border border-slate-700'} p-3 rounded-2xl ${sender === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'} text-sm max-w-[85%] shadow-md">
                ${formattedText}
            </div>
        `;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    };

    const sendMessage = async () => {
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;
        
        appendMessage(text, 'user');
        input.value = '';
        
        if (!ai) {
            setTimeout(() => {
                appendMessage("Le système de chat est en maintenance (Clé API non configurée). Veuillez contacter l'administrateur ou utiliser les liens Telegram/WhatsApp.", 'model');
            }, 500);
            return;
        }

        // Add loading state
        const loadingId = 'loading-' + Date.now();
        const loadingDiv = document.createElement('div');
        loadingDiv.id = loadingId;
        loadingDiv.className = "flex justify-start";
        loadingDiv.innerHTML = `<div class="bg-slate-800 text-slate-400 p-3 rounded-2xl rounded-tl-none text-xs italic flex items-center gap-2 border border-slate-700"><i data-lucide="loader-2" class="w-3 h-3 animate-spin"></i> L'IA réfléchit...</div>`;
        messages.appendChild(loadingDiv);
        messages.scrollTop = messages.scrollHeight;
        
        // Refresh icons if lucide is available
        if(window.lucide) window.lucide.createIcons();

        try {
            const chat = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: SYSTEM_INSTRUCTION,
                },
                history: history,
            });

            const result = await chat.sendMessage({ message: text });
            const responseText = result.text;
            
            const loader = document.getElementById(loadingId);
            if(loader) loader.remove();
            
            appendMessage(responseText, 'model');
            
            // Update local history for next turn context
            history.push({ role: 'user', parts: [{ text: text }] });
            history.push({ role: 'model', parts: [{ text: responseText }] });

        } catch (e) {
            const loader = document.getElementById(loadingId);
            if(loader) loader.remove();
            appendMessage("Désolé, une erreur technique est survenue. Veuillez réessayer plus tard.", 'model');
            console.error(e);
        }
    };

    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
});
