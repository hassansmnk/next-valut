import './index.css';
import { Store } from './store';
import { AuthPage } from './pages/Auth';
import { DashboardPage } from './pages/Dashboard';
import { WalletPage } from './pages/Wallet';
import { TransactionsPage } from './pages/Transactions';
import { ProfilePage } from './pages/Profile';
import { Layout } from './components/Layout';

// Simple Router
class Router {
  private app: HTMLElement;

  constructor() {
    this.app = document.getElementById('app')!;
    window.addEventListener('popstate', () => this.handleRoute());
  }

  async navigate(path: string) {
    window.history.pushState({}, '', path);
    await this.handleRoute();
  }

  async handleRoute() {
    const path = window.location.pathname;
    const isAuth = Store.isAuthenticated();

    // Clear notifications on navigate if needed
    // document.getElementById('notifications')!.innerHTML = '';

    if (!isAuth && path !== '/login' && path !== '/register') {
      window.history.replaceState({}, '', '/login');
      this.render(AuthPage('login'));
      return;
    }

    if (isAuth && (path === '/login' || path === '/register' || path === '/')) {
      window.history.replaceState({}, '', '/dashboard');
      this.render(Layout(DashboardPage()));
      return;
    }

    switch (path) {
      case '/login':
        this.render(AuthPage('login'));
        break;
      case '/register':
        this.render(AuthPage('register'));
        break;
      case '/dashboard':
        this.render(Layout(DashboardPage()));
        break;
      case '/wallet':
        this.render(Layout(WalletPage()));
        break;
      case '/transactions':
        this.render(Layout(TransactionsPage()));
        break;
      case '/profile':
        this.render(Layout(ProfilePage()));
        break;
      default:
        this.render(Layout(DashboardPage()));
    }
    
    // Smooth transition
    this.app.firstElementChild?.classList.add('animate-fade-in');
  }

  private render(content: HTMLElement) {
    this.app.innerHTML = '';
    this.app.appendChild(content);
  }
}

// Global App Instance
export const router = new Router();

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('app-loader');
  
  // Simulate heavy lifting
  setTimeout(() => {
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }
    router.handleRoute();
  }, 1000);
});
