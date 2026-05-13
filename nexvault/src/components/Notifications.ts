import { createIcons, icons } from "lucide";

export class Toast {
  static show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const container = document.getElementById('notifications')!;
    const toast = document.createElement('div');
    
    // Using inline styles for quick animation or tailwind classes
    toast.className = `glass-card p-4 pr-6 rounded-2xl flex items-center gap-4 animate-slide-up shadow-[0_20px_40px_rgba(0,0,0,0.4)] border-white/5 relative overflow-hidden group`;
    
    toast.innerHTML = `
      <div class="absolute left-0 top-0 bottom-0 w-1.5 ${
        type === 'success' ? 'bg-brand' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
      }"></div>
      <div class="w-10 h-10 rounded-xl flex items-center justify-center ${
        type === 'success' ? 'bg-brand/10 text-brand' : type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
      } border border-white/5">
        <i data-lucide="${type === 'success' ? 'check' : type === 'error' ? 'alert-circle' : 'info'}" class="w-5 h-5"></i>
      </div>
      <div>
        <p class="text-xs font-bold text-white/30 uppercase tracking-widest leading-none mb-1">${type}</p>
        <p class="text-sm font-bold text-white tracking-tight">${message}</p>
      </div>
    `;
    
    container.appendChild(toast);
    createIcons({ icons });
    
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-x-full');
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  }
}
