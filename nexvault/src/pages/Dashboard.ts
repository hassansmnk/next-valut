import { Store } from '../store';
import { createIcons, icons } from 'lucide';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export function DashboardPage(): HTMLElement {
  const user = Store.getUser();
  const transactions = Store.getTransactions().slice(0, 4);
  const container = document.createElement('div');
  container.className = 'animate-slide-up space-y-8';

  const formatCurrency = (amt: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: user.currency }).format(amt);

  container.innerHTML = `
    <!-- Hero Balance Cards -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 glass-card bg-gradient-to-br from-brand/10 to-transparent flex flex-col justify-between overflow-hidden relative border-brand/20">
        <div class="absolute -right-10 -top-10 w-40 h-40 bg-brand/10 blur-[100px] rounded-full"></div>
        <div>
          <p class="text-white/40 text-sm font-medium mb-1">Total Wallet Balance</p>
          <h3 class="text-5xl font-display font-bold tracking-tight text-white" id="dashboard-balance">
            ${formatCurrency(user.balance)}
          </h3>
          <p class="text-brand text-xs font-semibold mt-2 flex items-center gap-1">
            <i data-lucide="trending-up" class="w-3 h-3"></i> +12.5% from last month
          </p>
        </div>
        <div class="mt-8 flex items-end justify-between relative z-10 transition-all">
          <div class="space-y-4 flex-1 pr-10">
            <div class="flex justify-between text-[11px] uppercase tracking-wider font-bold text-white/30">
              <span>Monthly Spending Limit</span>
              <span class="text-white/60">$12,00.00</span>
            </div>
            <div class="balance-progress h-2 bg-white/5">
              <div class="balance-progress-inner bg-brand shadow-[0_0_15px_rgba(59,130,246,0.5)]" style="width: 65%"></div>
            </div>
          </div>
          <div class="flex gap-3">
            <button class="btn-primary py-2.5 px-6 text-sm flex items-center gap-2">
              <i data-lucide="plus" class="w-4 h-4"></i> Add Money
            </button>
          </div>
        </div>
      </div>

      <div class="glass-card flex flex-col justify-between border-white/5">
        <div>
          <p class="text-white/40 text-sm font-medium mb-1">Available to Spend</p>
          <h3 class="text-4xl font-display font-bold text-white tracking-tight">${formatCurrency(user.availableBalance)}</h3>
        </div>
        <div class="space-y-3 mt-6">
          <div class="flex items-center justify-between p-3.5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-blue-500/10 text-brand flex items-center justify-center">
                <i data-lucide="trending-up" class="w-4 h-4"></i>
              </div>
              <span class="text-sm font-medium text-white/60">Income</span>
            </div>
            <span class="font-bold text-blue-400">+$4,500.00</span>
          </div>
          <div class="flex items-center justify-between p-3.5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
                <i data-lucide="trending-down" class="w-4 h-4"></i>
              </div>
              <span class="text-sm font-medium text-white/60">Expenses</span>
            </div>
            <span class="font-bold text-red-500">-$2,120.40</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Analytics & Activity -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div class="xl:col-span-2 glass-card">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h3 class="text-lg font-bold">Revenue Analytics</h3>
            <p class="text-xs text-white/40 mt-1">Daily overview of your financial flows</p>
          </div>
          <div class="flex bg-white/5 p-1 rounded-xl">
            <button class="px-4 py-1.5 text-xs font-bold rounded-lg bg-brand text-white">Income</button>
            <button class="px-4 py-1.5 text-xs font-bold text-white/40 hover:text-white">Expenses</button>
          </div>
        </div>
        <div class="h-64 relative">
          <canvas id="balanceChart"></canvas>
        </div>
      </div>

      <div class="glass-card flex flex-col">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold">Recent Activities</h3>
          <button class="text-brand text-xs font-bold hover:underline uppercase tracking-wider" id="view-all-transactions">View All</button>
        </div>
        <div class="space-y-6 flex-1">
          ${transactions.map(t => `
            <div class="flex items-center justify-between group cursor-pointer">
              <div class="flex items-center gap-4">
                <div class="w-11 h-11 rounded-full bg-[#0B0E14] border border-white/5 flex items-center justify-center text-lg shadow-inner group-hover:border-brand/40 transition-all">
                  ${getEmoji(t.category)}
                </div>
                <div>
                  <p class="text-sm font-bold group-hover:text-brand transition-colors">${t.merchant}</p>
                  <p class="text-[11px] text-white/30 font-medium">${t.category} • ${new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-bold ${t.type === 'income' ? 'text-blue-400' : 'text-white'}">
                  ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
                </p>
              </div>
            </div>
          `).join('')}
        </div>
        <button class="mt-8 w-full py-4 glass rounded-2xl border-dashed border-white/10 text-white/30 hover:text-white hover:border-brand/40 transition-all flex items-center justify-center gap-2 text-sm font-semibold">
          <i data-lucide="more-horizontal" class="w-4 h-4"></i>
          Explore Insights
        </button>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="glass-card flex flex-col items-center gap-3 text-center cursor-pointer hover:bg-white/10">
        <div class="w-12 h-12 rounded-2xl bg-brand/20 text-brand flex items-center justify-center">
          <i data-lucide="arrow-up-right" class="w-6 h-6"></i>
        </div>
        <p class="text-sm font-semibold">Send Money</p>
      </div>
      <div class="glass-card flex flex-col items-center gap-3 text-center cursor-pointer hover:bg-white/10">
        <div class="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-500 flex items-center justify-center">
          <i data-lucide="arrow-down-left" class="w-6 h-6"></i>
        </div>
        <p class="text-sm font-semibold">Receive</p>
      </div>
      <div class="glass-card flex flex-col items-center gap-3 text-center cursor-pointer hover:bg-white/10">
        <div class="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-500 flex items-center justify-center">
          <i data-lucide="dollar-sign" class="w-6 h-6"></i>
        </div>
        <p class="text-sm font-semibold">Pay Bills</p>
      </div>
      <div class="glass-card flex flex-col items-center gap-3 text-center cursor-pointer hover:bg-white/10">
        <div class="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-500 flex items-center justify-center">
          <i data-lucide="chevron-right" class="w-6 h-6"></i>
        </div>
        <p class="text-sm font-semibold">More</p>
      </div>
    </div>
  `;

  function getEmoji(cat: string) {
    switch (cat.toLowerCase()) {
      case 'shopping': return '🛍️';
      case 'food': return '☕';
      case 'transport': return '🚗';
      case 'salary': return '💰';
      default: return '💵';
    }
  }

  function getCategoryIcon(cat: string) {
    switch (cat.toLowerCase()) {
      case 'shopping': return 'shopping-cart';
      case 'food': return 'coffee';
      case 'transport': return 'car';
      case 'salary': return 'trending-up';
      default: return 'dollar-sign';
    }
  }

  // Initialize Chart
  setTimeout(() => {
    const ctx = (container.querySelector('#balanceChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Spending',
            data: [450, 600, 300, 800, 500, 900, 400],
            borderColor: '#3B82F6',
            backgroundColor: (context) => {
              const chart = context.chart;
              const {ctx, chartArea} = chart;
              if (!chartArea) return;
              const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
              gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
              gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
              return gradient;
            },
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 0,
            pointHoverRadius: 6,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { 
              grid: { display: false },
              ticks: { color: 'rgba(255,255,255,0.3)', font: { size: 10 } }
            },
            y: { 
              grid: { color: 'rgba(255,255,255,0.05)' },
              ticks: { color: 'rgba(255,255,255,0.3)', font: { size: 10 } }
            }
          }
        }
      });
    }

    createIcons({ icons });
  }, 0);

  return container;
}
