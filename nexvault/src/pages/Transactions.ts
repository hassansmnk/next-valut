import { Store, type Transaction } from '../store';
import { createIcons, icons } from 'lucide';

export function TransactionsPage(): HTMLElement {
  let allTransactions = Store.getTransactions();
  let filterType: 'all' | 'income' | 'expense' = 'all';
  let searchQuery = '';

  const container = document.createElement('div');
  container.className = 'animate-slide-up space-y-8';

  const renderContent = () => {
    let filtered = allTransactions.filter(t => {
      const matchesType = filterType === 'all' || t.type === filterType;
      const matchesSearch = t.merchant.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           t.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });

    return `
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 class="text-2xl font-display font-bold text-white tracking-tight">Transaction History</h2>
          <p class="text-white/40 text-sm mt-1">Detailed record of your recent activity</p>
        </div>
        <div class="flex items-center gap-3">
          <button class="btn-secondary flex items-center gap-2 text-xs py-2 px-4 h-10">
            <i data-lucide="download" class="w-4 h-4 text-brand"></i> Export Data
          </button>
          <button class="btn-primary flex items-center gap-2 text-xs py-2 px-6 h-10">
            <i data-lucide="filter" class="w-4 h-4"></i> Advanced Filter
          </button>
        </div>
      </div>

      <!-- Search & Filters -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="md:col-span-2 relative">
          <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20"></i>
          <input type="text" id="tx-search" class="input-field pl-12 h-11" placeholder="Search merchant, category or ID..." value="${searchQuery}">
        </div>
        <div class="flex bg-[#161B22] border border-white/5 p-1 rounded-xl h-11">
          <button class="flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${filterType === 'all' ? 'bg-brand text-white shadow-lg' : 'text-white/30 hover:text-white'}" data-filter="all">All</button>
          <button class="flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${filterType === 'income' ? 'bg-brand text-white shadow-lg' : 'text-white/30 hover:text-white'}" data-filter="income">Income</button>
          <button class="flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${filterType === 'expense' ? 'bg-brand text-white shadow-lg' : 'text-white/30 hover:text-white'}" data-filter="expense">Expense</button>
        </div>
        <div class="relative h-11">
          <select class="w-full h-full bg-[#161B22] border border-white/5 text-white/60 text-xs font-bold rounded-xl px-4 focus:ring-1 focus:ring-brand appearance-none">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>All Time</option>
          </select>
          <i data-lucide="chevron-down" class="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 pointer-events-none"></i>
        </div>
      </div>

      <!-- Transactions List -->
      <div class="glass-card p-0 overflow-hidden border-white/5 shadow-2xl">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-white/[0.02] border-b border-white/5">
                <th class="px-8 py-5 text-[10px] font-bold uppercase text-white/30 tracking-[0.15em]">Merchant & ID</th>
                <th class="px-6 py-5 text-[10px] font-bold uppercase text-white/30 tracking-[0.15em]">Type</th>
                <th class="px-6 py-5 text-[10px] font-bold uppercase text-white/30 tracking-[0.15em]">Date</th>
                <th class="px-6 py-5 text-[10px] font-bold uppercase text-white/30 tracking-[0.15em]">Status</th>
                <th class="px-8 py-5 text-[10px] font-bold uppercase text-white/30 tracking-[0.15em] text-right">Amount</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              ${filtered.length > 0 ? filtered.map(t => renderRow(t)).join('') : `
                <tr>
                  <td colspan="5" class="px-8 py-20 text-center">
                    <div class="flex flex-col items-center gap-3 opacity-30">
                      <i data-lucide="search" class="w-12 h-12"></i>
                      <p class="text-sm font-medium">No transactions found matching your criteria</p>
                    </div>
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  };

  const renderRow = (t: Transaction) => `
    <tr class="hover:bg-white/[0.03] transition-all group cursor-pointer">
      <td class="px-8 py-5">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-full bg-[#0B0E14] border border-white/5 flex items-center justify-center text-lg shadow-inner group-hover:border-brand/40 transition-all">
            ${getEmoji(t.category)}
          </div>
          <div>
            <p class="text-sm font-bold group-hover:text-brand transition-colors">${t.merchant}</p>
            <p class="text-[10px] text-white/20 font-bold tracking-widest mt-0.5">#TX-${t.id.slice(-6).toUpperCase()}</p>
          </div>
        </div>
      </td>
      <td class="px-6 py-5">
        <span class="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-white/60">${t.category}</span>
      </td>
      <td class="px-6 py-5">
        <p class="text-xs font-bold text-white/40">${new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
      </td>
      <td class="px-6 py-5">
        <div class="flex items-center gap-2">
          <div class="w-1.5 h-1.5 rounded-full ${t.status === 'completed' ? 'bg-blue-400' : 'bg-orange-400'} shadow-[0_0_8px_rgba(59,130,246,0.3)]"></div>
          <span class="text-[10px] font-bold uppercase tracking-wider ${t.status === 'completed' ? 'text-blue-400' : 'text-orange-400'}">${t.status}</span>
        </div>
      </td>
      <td class="px-8 py-5 text-right">
        <p class="text-sm font-bold ${t.type === 'income' ? 'text-blue-400' : 'text-white'}">
          ${t.type === 'income' ? '+' : '-'}$${t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
      </td>
    </tr>
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

  const update = () => {
    container.innerHTML = renderContent();
    
    // Re-attach listeners
    container.querySelector('#tx-search')?.addEventListener('input', (e) => {
      searchQuery = (e.target as HTMLInputElement).value;
      update();
    });

    container.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        filterType = btn.getAttribute('data-filter') as any;
        update();
      });
    });

    // Initialize Icons
    createIcons({
      icons: { Search, Filter, Download, ArrowUpRight, ArrowDownLeft, ChevronRight, ShoppingCart, DollarSign, Coffee, Car, MoreVertical }
    });
  };

  update();
  return container;
}
