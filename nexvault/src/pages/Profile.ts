import { Store } from '../store';
import { createIcons, icons } from 'lucide';

export function ProfilePage(): HTMLElement {
  const user = Store.getUser();
  const container = document.createElement('div');
  container.className = 'animate-slide-up space-y-10';

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <!-- Profile Sidebar -->
      <div class="space-y-8">
        <div class="glass-card text-center relative overflow-hidden border-white/5">
          <div class="absolute inset-0 bg-gradient-to-b from-brand/10 to-transparent"></div>
          <div class="relative z-10 p-4">
            <div class="relative inline-block mb-6">
              <div class="absolute -inset-4 bg-brand/20 blur-2xl rounded-full"></div>
              <img src="${user.avatar}" class="w-28 h-28 rounded-[2rem] border-2 border-brand/50 relative z-10 shadow-2xl p-1 bg-[#161B22]" />
              <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-brand rounded-xl flex items-center justify-center border-4 border-[#0B0E14] z-20 shadow-lg">
                <i data-lucide="check-circle" class="w-4 h-4 text-white"></i>
              </div>
            </div>
            <h3 class="text-2xl font-display font-bold text-white tracking-tight">${user.name}</h3>
            <p class="text-white/30 text-xs font-bold uppercase tracking-widest mt-1">${user.email}</p>
            <div class="mt-8">
              <button class="btn-primary w-full py-3 text-sm font-bold flex items-center justify-center gap-2">
                <i data-lucide="edit-3" class="w-4 h-4"></i> Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div class="glass-card space-y-5 border-white/5">
          <h4 class="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Security Tier</h4>
          <div class="flex items-center justify-between p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
                <i data-lucide="shield-check" class="w-6 h-6"></i>
              </div>
              <div>
                <p class="font-bold text-brand text-xs uppercase tracking-wider">Level 3 Account</p>
                <p class="text-[10px] text-white/40 font-medium">Enhanced Protection Active</p>
              </div>
            </div>
          </div>
          <p class="text-[11px] text-center text-white/20 px-4 leading-relaxed italic line-clamp-2">Your identity is successfully verified by NexVault systems.</p>
        </div>
      </div>

      <!-- Settings Sections -->
      <div class="lg:col-span-2 space-y-8">
        <div class="glass-card space-y-10 border-white/5 bg-[#161B22]/50">
          <div>
            <div class="flex items-center gap-2 mb-8">
               <div class="w-1.5 h-6 bg-brand rounded-full"></div>
               <h3 class="text-lg font-bold text-white tracking-tight">Personal Workspace</h3>
            </div>
            <div class="grid grid-cols-1 gap-4">
              ${renderSettingItem('user', 'Identity Vault', 'Master identification records', 'bg-blue-500/10 text-blue-400')}
              ${renderSettingItem('credit-card', 'Funding Matrix', 'Manage connected ledger accounts', 'bg-indigo-500/10 text-indigo-400')}
              ${renderSettingItem('bell', 'Alert Configuration', 'Push protocol and security signals', 'bg-orange-500/10 text-orange-400')}
            </div>
          </div>

          <div>
            <div class="flex items-center gap-2 mb-8">
               <div class="w-1.5 h-6 bg-purple-500 rounded-full"></div>
               <h3 class="text-lg font-bold text-white tracking-tight">Privacy Logic</h3>
            </div>
            <div class="grid grid-cols-1 gap-4">
              ${renderSettingItem('fingerprint', 'Biometric Access', 'Face ID and Fingerprint gateways', 'bg-purple-500/10 text-purple-400')}
              ${renderSettingItem('shield', 'Security Perimeter', 'Login telemetry and device trust', 'bg-green-500/10 text-green-400')}
              ${renderSettingItem('smartphone', 'Sync Verification', 'External hardware authenticators', 'bg-brand/10 text-brand')}
            </div>
          </div>
        </div>

        <!-- Logout for desktop -->
        <button id="profile-logout" class="md:hidden btn-secondary w-full border-red-500/20 text-red-400 hover:bg-red-500/10 mb-10 h-14 font-bold text-sm uppercase tracking-widest">
          Terminate Session
        </button>
      </div>
    </div>
  `;

  function renderSettingItem(icon: string, title: string, desc: string, iconClass: string) {
    return `
      <div class="flex items-center justify-between p-5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 rounded-2xl transition-all cursor-pointer group shadow-sm">
        <div class="flex items-center gap-6">
          <div class="w-12 h-12 rounded-2xl ${iconClass} flex items-center justify-center transition-all border border-white/5 group-hover:scale-110">
            <i data-lucide="${icon}" class="w-6 h-6"></i>
          </div>
          <div>
            <p class="text-sm font-bold text-white group-hover:text-brand transition-colors">${title}</p>
            <p class="text-[11px] font-medium text-white/30 uppercase tracking-wide mt-0.5">${desc}</p>
          </div>
        </div>
        <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
          <i data-lucide="chevron-right" class="w-4 h-4 text-white/40"></i>
        </div>
      </div>
    `;
  }

  // Initialize Icons
  setTimeout(() => {
    createIcons({ icons });
  }, 0);

  return container;
}
