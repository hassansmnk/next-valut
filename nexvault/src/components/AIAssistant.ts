import { GoogleGenAI } from "@google/genai";
import { createIcons, icons } from "lucide";
import { Toast } from "./Notifications";

export function AIAssistant(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'fixed bottom-24 right-6 z-50 md:bottom-10';
  
  let isOpen = false;
  let messages: { role: 'user' | 'model', text: string }[] = [
    { role: 'model', text: "Hello! I'm Nex, your AI financial assistant. How can I help you today?" }
  ];

  const renderContent = () => `
    <div class="relative">
      <!-- Toggle Button -->
      <button id="ai-toggle" class="w-16 h-16 bg-gradient-to-tr from-brand to-blue-600 text-white rounded-[2rem] shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all group overflow-hidden">
        <div class="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <i data-lucide="${isOpen ? 'x' : 'bot'}" class="w-7 h-7 relative z-10"></i>
      </button>

      <!-- Chat Window -->
      <div id="ai-chat" class="absolute bottom-20 right-0 w-[350px] md:w-[400px] glass-card p-0 flex flex-col transition-all duration-500 transform-gpu ${isOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-10 scale-90 pointer-events-none'} shadow-[0_30px_100px_rgba(0,0,0,0.5)] border-white/10" style="height: 550px;">
        <div class="p-6 border-b border-white/5 bg-gradient-to-r from-brand/20 to-transparent backdrop-blur-3xl flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-11 h-11 bg-brand/10 border border-brand/20 rounded-2xl flex items-center justify-center relative shadow-inner">
               <div class="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-[#161B22]"></div>
               <i data-lucide="bot" class="w-6 h-6 text-brand"></i>
            </div>
            <div>
              <p class="font-bold text-base text-white tracking-tight">Nex Intelligent Agent</p>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <p class="text-[10px] text-white/40 uppercase font-black tracking-widest leading-none">Core-Active</p>
              </div>
            </div>
          </div>
          <button id="ai-close" class="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors">
            <i data-lucide="x" class="w-4 h-4 text-white/40 hover:text-white"></i>
          </button>
        </div>

        <div id="ai-messages" class="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-[#0B0E14]/40">
          ${messages.map(m => `
            <div class="flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up">
              <div class="max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-brand text-white rounded-br-none shadow-blue-500/20 font-medium' : 'bg-white/[0.03] border border-white/5 text-white/80 rounded-bl-none'}">
                ${m.text}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="p-6 border-t border-white/5 bg-[#0B0E14]/60">
          <div class="relative group">
            <input type="text" id="ai-input" class="input-field pr-14 h-14 text-sm bg-white/[0.03] border-white/5 focus:bg-white/[0.05]" placeholder="Ask Nex terminal...">
            <button id="ai-send" class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand/10 text-brand hover:bg-brand hover:text-white rounded-xl transition-all flex items-center justify-center">
              <i data-lucide="send" class="w-5 h-5"></i>
            </button>
          </div>
          <p class="text-[9px] text-center text-white/20 mt-3 font-bold uppercase tracking-tighter">Powered by NexCore Intelligence V3.0</p>
        </div>
      </div>
    </div>
  `;

  const setupListeners = () => {
    container.querySelector('#ai-toggle')?.addEventListener('click', () => {
      isOpen = !isOpen;
      update();
    });

    container.querySelector('#ai-close')?.addEventListener('click', () => {
      isOpen = false;
      update();
    });

    const sendBtn = container.querySelector('#ai-send');
    const input = container.querySelector('#ai-input') as HTMLInputElement;

    const handleSend = async () => {
      const text = input.value.trim();
      if (!text) return;

      messages.push({ role: 'user', text });
      input.value = '';
      update();

      // AI Response
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          systemInstruction: "You are Nex, a premium digital wallet AI assistant. You help users with financial questions, dashboard navigation, and savings advice. Keep responses concise and professional.",
          contents: messages.map(m => m.text).join('\n')
        });

        messages.push({ role: 'model', text: response.text || "I'm sorry, I couldn't process that. How else can I help?" });
      } catch (err) {
        messages.push({ role: 'model', text: "Connection issues. Please check your API key in settings." });
        Toast.show("AI Assistant unavailable", "error");
      }
      update();
    };

    sendBtn?.addEventListener('click', handleSend);
    input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSend();
    });

    // Auto-scroll
    const msgContainer = container.querySelector('#ai-messages');
    if (msgContainer) msgContainer.scrollTop = msgContainer.scrollHeight;

    // @ts-ignore
    createIcons({ icons });
  };

  const update = () => {
    container.innerHTML = renderContent();
    setupListeners();
  };

  update();
  return container;
}
