import { Store } from '../store';
import { router } from '../main';
import { createIcons, icons } from 'lucide';
import { AIAssistant } from './AIAssistant';

export function Layout(content: HTMLElement): HTMLElement {
  const user = Store.getUser();
  const container = document.createElement('div');
  container.className = 'flex flex-col md:flex-row min-h-screen bg-surface-900';

  const isPath = (p: string) => window.location.pathname === p;

  // Sidebar (Desktop)
  const sidebar = `
    <aside class="hidden md:flex flex-col w-64 glass border-r border-white/5 p-6 h-screen sticky top-0">
      <div class="flex items-center gap-3 mb-12 px-2">
        <div class="w-10 h-10 bg-brand rounded-xl flex items-center justify-center pulse-brand shadow-lg shadow-brand/20 font-bold text-xl text-white">
          N
        </div>
        <span class="text-xl font-display font-bold tracking-tight">NexVault</span>
      </div>

      <nav class="flex-1 space-y-2">
        <a href="/dashboard" class="nav-item flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isPath('/dashboard') ? 'active-tab' : 'text-white/40 hover:bg-white/5 hover:text-white'}" data-link="/dashboard">
          <i data-lucide="layout-dashboard" class="w-5 h-5"></i>
          <span class="font-medium">Dashboard</span>
        </a>
        <a href="/wallet" class="nav-item flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isPath('/wallet') ? 'active-tab' : 'text-white/40 hover:bg-white/5 hover:text-white'}" data-link="/wallet">
          <i data-lucide="wallet" class="w-5 h-5"></i>
          <span class="font-medium">My Wallet</span>
        </a>
        <a href="/transactions" class="nav-item flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isPath('/transactions') ? 'active-tab' : 'text-white/40 hover:bg-white/5 hover:text-white'}" data-link="/transactions">
          <i data-lucide="arrow-left-right" class="w-5 h-5"></i>
          <span class="font-medium">Transactions</span>
        </a>
        <a href="/profile" class="nav-item flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isPath('/profile') ? 'active-tab' : 'text-white/40 hover:bg-white/5 hover:text-white'}" data-link="/profile">
          <i data-lucide="user" class="w-5 h-5"></i>
          <span class="font-medium">Profile</span>
        </a>
      </nav>

      <div class="mt-auto pt-6 border-t border-white/5">
        <button id="logout-btn" class="flex items-center gap-3 px-4 py-3 w-full text-white/40 hover:text-red-400 transition-colors">
          <i data-lucide="log-out" class="w-5 h-5"></i>
          <span class="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  `;

  // Mobile Header
  const mobileHeader = `
    <header class="md:hidden glass border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
          <span class="text-surface-900 font-bold text-sm">N</span>
        </div>
        <span class="font-display font-bold">NexVault</span>
      </div>
      <div class="flex items-center gap-4">
        <button class="relative">
          <i data-lucide="bell" class="w-6 h-6 text-white/60"></i>
          <span class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <img src="${user.avatar}" class="w-8 h-8 rounded-full border border-brand/20" />
      </div>
    </header>
  `;

  // Mobile Bottom Nav
  const bottomNav = `
    <nav class="md:hidden fixed bottom-6 left-6 right-6 glass rounded-2xl border border-white/10 px-6 py-3 flex items-center justify-between z-50">
      <a href="/dashboard" class="p-2 ${isPath('/dashboard') ? 'text-brand' : 'text-white/40'}" data-link="/dashboard">
        <i data-lucide="home" class="w-6 h-6"></i>
      </a>
      <a href="/wallet" class="p-2 ${isPath('/wallet') ? 'text-brand' : 'text-white/40'}" data-link="/wallet">
        <i data-lucide="credit-card" class="w-6 h-6"></i>
      </a>
      <button class="bg-brand text-surface-900 w-12 h-12 rounded-xl flex items-center justify-center -translate-y-6 shadow-lg shadow-brand/20">
        <i data-lucide="plus" class="w-6 h-6"></i>
      </button>
      <a href="/transactions" class="p-2 ${isPath('/transactions') ? 'text-brand' : 'text-white/40'}" data-link="/transactions">
        <i data-lucide="arrow-left-right" class="w-6 h-6"></i>
      </a>
      <a href="/profile" class="p-2 ${isPath('/profile') ? 'text-brand' : 'text-white/40'}" data-link="/profile">
        <i data-lucide="user" class="w-6 h-6"></i>
      </a>
    </nav>
  `;

  container.innerHTML = `
    ${sidebar}
    ${mobileHeader}
    <main class="flex-1 p-6 md:p-10 pb-32 md:pb-10 overflow-x-hidden">
      <header class="hidden md:flex items-center justify-between mb-10">
        <div>
          <h1 class="text-2xl text-white/60 font-medium">Welcome back,</h1>
          <h2 class="text-4xl font-display font-bold">${user.name}</h2>
        </div>
        <div class="flex items-center gap-6">
          <button class="glass p-3 rounded-xl hover:bg-white/10 transition-all relative">
            <i data-lucide="bell" class="w-6 h-6 text-white/60"></i>
            <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div class="flex items-center gap-3 bg-white/5 p-2 pr-4 rounded-xl border border-white/5">
            <img src="${user.avatar}" class="w-10 h-10 rounded-lg" />
            <div class="text-sm">
              <p class="font-bold leading-tight">${user.name}</p>
              <p class="text-white/40 text-xs">Premium User</p>
            </div>
          </div>
        </div>
      </header>
      <div id="page-content"></div>
    </main>
    ${bottomNav}
    <div id="ai-container"></div>
  `;

  const pageContent = container.querySelector('#page-content')!;
  pageContent.appendChild(content);

  const aiContainer = container.querySelector('#ai-container')!;
  aiContainer.appendChild(AIAssistant());

  // Event Listeners for Navigation
  container.querySelectorAll('[data-link]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href')!;
      router.navigate(href);
    });
  });

  const logoutBtn = container.querySelector('#logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      Store.logout();
      router.navigate('/login');
    });
  }

  // Initialize Icons
  setTimeout(() => {
    createIcons({ icons });
  }, 0);

  return container;
}
