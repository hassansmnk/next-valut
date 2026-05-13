import { Store, type VirtualCard } from '../store';
import { createIcons, icons } from 'lucide';

export function WalletPage(): HTMLElement {
  const cards = Store.getCards();
  const container = document.createElement('div');
  container.className = 'animate-slide-up space-y-10';

  const formatCardNumber = (num: string) => num;

  container.innerHTML = `
    <div class="flex flex-col xl:flex-row gap-10">
      <!-- Cards Section -->
      <div class="flex-1 space-y-8">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-display font-bold text-white tracking-tight">Virtual Cards</h2>
            <p class="text-white/40 text-sm mt-1">Manage your digital payment methods</p>
          </div>
          <button class="flex items-center gap-2 btn-secondary text-sm">
            <i data-lucide="plus" class="w-4 h-4 text-brand"></i> New Card
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8" id="cards-container">
          ${cards.map(card => renderCard(card)).join('')}
        </div>

        <!-- Saved Beneficiaries -->
        <div class="space-y-6 pt-6">
          <h3 class="text-xl font-display font-bold text-white tracking-tight text-center md:text-left">Quick Transfer</h3>
          <div class="flex justify-center md:justify-start gap-6 overflow-x-auto pb-4 no-scrollbar">
            <button class="flex-shrink-0 w-16 h-16 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center hover:border-brand hover:bg-brand/5 hover:text-brand transition-all">
              <i data-lucide="plus" class="w-6 h-6"></i>
            </button>
            ${['Sarah', 'Michael', 'Emily', 'David', 'Jessica'].map(name => `
              <div class="flex-shrink-0 text-center space-y-3 cursor-pointer group">
                <div class="relative">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${name}" class="w-16 h-16 rounded-full bg-white/5 border border-white/5 group-hover:border-brand/40 transition-all p-0.5" />
                  <div class="absolute inset-0 rounded-full bg-brand/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <p class="text-xs font-bold text-white/40 group-hover:text-white transition-colors">${name}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Wallet Sidebar -->
      <div class="w-full xl:w-80 space-y-8">
        <div class="glass-card space-y-6 bg-surface-800 border-white/5">
          <h3 class="font-bold text-lg">Wallet Actions</h3>
          <div class="grid grid-cols-1 gap-4">
            <button class="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5 group">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-blue-500/10 text-brand flex items-center justify-center">
                  <i data-lucide="arrow-up" class="w-5 h-5"></i>
                </div>
                <span class="font-bold text-sm">Add Money</span>
              </div>
              <i data-lucide="chevron-right" class="w-4 h-4 text-white/20 group-hover:text-white"></i>
            </button>
            <button class="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5 group">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <i data-lucide="arrow-down" class="w-5 h-5"></i>
                </div>
                <span class="font-bold text-sm">Withdraw</span>
              </div>
              <i data-lucide="chevron-right" class="w-4 h-4 text-white/20 group-hover:text-white"></i>
            </button>
            <button class="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5 group">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <i data-lucide="refresh-cw" class="w-5 h-5"></i>
                </div>
                <span class="font-bold text-sm">Exchange</span>
              </div>
              <i data-lucide="chevron-right" class="w-4 h-4 text-white/20 group-hover:text-white"></i>
            </button>
          </div>
        </div>

        <div class="glass-card bg-[#161B22] p-0 overflow-hidden border-white/5">
          <div class="p-6 bg-gradient-to-br from-brand/10 to-transparent">
            <h3 class="font-bold mb-1 text-lg">NexVault QR</h3>
            <p class="text-xs text-white/40">Swift contactless payments</p>
          </div>
          <div class="p-8 flex flex-col items-center gap-6">
            <div class="p-6 bg-white rounded-3xl mb-2 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <i data-lucide="qr-code" class="w-32 h-32 text-surface-900"></i>
            </div>
            <button class="btn-primary w-full flex items-center justify-center gap-2">
              <i data-lucide="smartphone" class="w-4 h-4"></i> Scan to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  function renderCard(card: VirtualCard) {
    const isMain = card.color.includes('indigo');
    return `
      <div class="relative h-60 rounded-[2.5rem] p-8 text-white ${isMain ? 'card-gradient shadow-blue-500/20' : 'bg-[#161B22] border border-white/5 shadow-black/40'} shadow-2xl group cursor-pointer overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]">
        <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-10 scale-150 transition-all duration-500"></div>
        <div class="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-3xl opacity-50"></div>
        
        <div class="relative z-10 flex flex-col h-full justify-between">
          <div class="flex justify-between items-start">
            <div class="space-y-1">
              <p class="text-[10px] uppercase font-bold tracking-[0.2em] ${isMain ? 'opacity-70' : 'text-brand'}">Virtual Card</p>
              <h4 class="text-sm font-semibold mt-1">Sarah Jenkins</h4>
            </div>
            <div class="w-12 h-8 bg-white/20 rounded-md backdrop-blur-md flex items-center justify-center">
              <div class="flex -space-x-3">
                <div class="w-5 h-5 rounded-full bg-red-500/80"></div>
                <div class="w-5 h-5 rounded-full bg-yellow-500/80"></div>
              </div>
            </div>
          </div>
          
          <div class="space-y-6">
            <p class="text-2xl font-display font-medium tracking-[0.25em] text-white/90 drop-shadow-md">**** **** **** 8824</p>
            <div class="flex justify-between items-end">
              <div class="flex gap-10">
                <div>
                  <p class="text-[9px] uppercase font-bold text-white/40 tracking-wider">Expiry</p>
                  <p class="text-sm font-bold mt-0.5">12 / 26</p>
                </div>
                <div>
                  <p class="text-[9px] uppercase font-bold text-white/40 tracking-wider">CVV</p>
                  <p class="text-sm font-bold mt-0.5">***</p>
                </div>
              </div>
              <div class="flex gap-3">
                <button class="p-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition-all border border-white/10">
                  <i data-lucide="eye" class="w-4 h-4 text-white"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setTimeout(() => {
    createIcons({ icons });
  }, 0);

  return container;
}
