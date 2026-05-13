import { Store } from '../store';
import { router } from '../main';
import { createIcons, icons } from 'lucide';

export function AuthPage(type: 'login' | 'register'): HTMLElement {
  const container = document.createElement('div');
  container.className = 'min-h-screen flex items-center justify-center p-6 bg-surface-900 overflow-hidden relative';
  
  // Background Blobs
  container.innerHTML = `
    <div class="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-brand/10 blur-[150px] rounded-full"></div>
    <div class="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-indigo-500/10 blur-[150px] rounded-full"></div>
    <div class="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-blue-500/5 blur-[100px] rounded-full"></div>

    <div class="w-full max-w-md animate-slide-up relative z-10">
      <div class="text-center mb-12">
        <div class="w-20 h-20 bg-gradient-to-tr from-brand to-blue-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.4)] mx-auto mb-8 relative group">
          <div class="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
          <span class="text-white font-black text-4xl relative z-10">N</span>
        </div>
        <h1 class="text-4xl font-display font-bold mb-3 text-white tracking-tight">
          ${type === 'login' ? 'Secure Log In' : 'Join NexVault'}
        </h1>
        <p class="text-white/30 text-sm font-medium">
          ${type === 'login' ? 'Verify your identity to access your treasury' : 'Begin your elite financial management today'}
        </p>
      </div>

      <div class="glass-card p-10 space-y-8 border-white/5 relative bg-[#161B22]/80 backdrop-blur-2xl">
        <div class="space-y-6">
          <div class="space-y-2">
            <label class="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Email Terminal</label>
            <div class="relative">
              <i data-lucide="mail" class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20"></i>
              <input type="email" id="auth-email" class="input-field pl-12 h-14 bg-white/[0.03] border-white/5" placeholder="identity@nexvault.io" value="hassan.smnk@gmail.com">
            </div>
          </div>
          
          <div class="space-y-2">
            <div class="flex justify-between items-center ml-1">
              <label class="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">${type === 'login' ? 'Access PIN' : 'Create Access PIN'}</label>
              ${type === 'login' ? '<a href="#" class="text-[10px] font-bold text-brand uppercase tracking-tighter hover:underline">Revive Access</a>' : ''}
            </div>
            <div class="relative">
              <i data-lucide="shield-check" class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20"></i>
              <input type="password" id="auth-pin" class="input-field pl-12 h-14 bg-white/[0.03] border-white/5" placeholder="••••" value="1234">
              <button class="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors">
                <i data-lucide="eye" class="w-5 h-5"></i>
              </button>
            </div>
          </div>
        </div>

        <button id="auth-submit" class="btn-primary w-full py-4.5 text-sm font-bold uppercase tracking-[0.15em] shadow-blue-500/20">
          ${type === 'login' ? 'Authorize Session' : 'Establish Account'}
        </button>

        <div class="relative py-4">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-white/5"></div></div>
          <div class="relative flex justify-center text-[10px] uppercase font-bold tracking-widest"><span class="bg-[#161B22] px-4 text-white/20">Biometric Interlink</span></div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <button class="btn-secondary py-3.5 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-wider relative overflow-hidden group">
            <div class="absolute inset-x-0 bottom-0 h-0.5 bg-brand scale-x-0 group-hover:scale-x-100 transition-transform"></div>
            <i data-lucide="chrome" class="w-4 h-4 text-white/60"></i> Google
          </button>
          <button class="btn-secondary py-3.5 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-wider relative overflow-hidden group">
             <div class="absolute inset-x-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform"></div>
            <i data-lucide="github" class="w-4 h-4 text-white/60"></i> GitHub
          </button>
        </div>
      </div>

      <p class="text-center mt-10 text-[11px] font-bold text-white/20 uppercase tracking-widest">
        ${type === 'login' 
          ? 'New Operative? <a href="/register" class="text-brand font-black hover:underline ml-1" data-link="/register">Sync Identity</a>' 
          : 'Already Registered? <a href="/login" class="text-brand font-black hover:underline ml-1" data-link="/login">Verify Creds</a>'
        }
      </p>
    </div>
  `;

  // Interaction logic
  const submitBtn = container.querySelector('#auth-submit')!;
  submitBtn.addEventListener('click', () => {
    const email = (container.querySelector('#auth-email') as HTMLInputElement).value;
    const pin = (container.querySelector('#auth-pin') as HTMLInputElement).value;

    if (Store.login(email, pin)) {
      router.navigate('/dashboard');
    } else {
      alert('Invalid credentials. (Hint: hassan.smnk@gmail.com / 1234)');
    }
  });

  container.querySelectorAll('[data-link]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      router.navigate((e.currentTarget as HTMLAnchorElement).getAttribute('href')!);
    });
  });

  // Initialize Icons
  setTimeout(() => {
    createIcons({ icons });
  }, 0);

  return container;
}
