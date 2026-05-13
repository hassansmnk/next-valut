import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// UI Utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Data Types
export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  merchant: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface VirtualCard {
  id: string;
  number: string;
  expiry: string;
  cvv: string;
  type: 'visa' | 'mastercard';
  color: string;
  balance: number;
  status: 'active' | 'frozen';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  balance: number;
  availableBalance: number;
  currency: string;
  pin: string;
  isVerified: boolean;
}

// Initial Mock Data
const MOCK_USER: User = {
  id: 'u1',
  name: 'Hassan Mohamednur',
  email: 'hassan.smnk@gmail.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hassan',
  balance: 24560.80,
  availableBalance: 24000.00,
  currency: 'USD',
  pin: '1234',
  isVerified: true
};

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', type: 'expense', category: 'Shopping', amount: 89.99, date: new Date().toISOString(), merchant: 'Amazon', status: 'completed' },
  { id: 't2', type: 'income', category: 'Salary', amount: 4500.00, date: new Date(Date.now() - 86400000).toISOString(), merchant: 'TechCorp Inc', status: 'completed' },
  { id: 't3', type: 'expense', category: 'Food', amount: 45.50, date: new Date(Date.now() - 172800000).toISOString(), merchant: 'Whole Foods', status: 'completed' },
  { id: 't4', type: 'expense', category: 'Transport', amount: 15.00, date: new Date(Date.now() - 259200000).toISOString(), merchant: 'Uber', status: 'pending' },
  { id: 't5', type: 'income', category: 'Transfer', amount: 200.00, date: new Date(Date.now() - 345600000).toISOString(), merchant: 'Sarah J.', status: 'completed' },
];

const MOCK_CARDS: VirtualCard[] = [
  { id: 'c1', number: '**** **** **** 8829', expiry: '09/27', cvv: '231', type: 'visa', color: 'from-brand to-brand-dark', balance: 5240.00, status: 'active' },
  { id: 'c2', number: '**** **** **** 4412', expiry: '12/26', cvv: '998', type: 'mastercard', color: 'from-purple-600 to-indigo-600', balance: 1200.50, status: 'active' },
];

// Data Store Class
export class Store {
  private static STORAGE_KEY = 'nexvault_data';

  static getData() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) {
      const initialData = {
        user: MOCK_USER,
        transactions: MOCK_TRANSACTIONS,
        cards: MOCK_CARDS,
        isAuthenticated: false
      };
      this.saveData(initialData);
      return initialData;
    }
    const parsedData = JSON.parse(data);
    
    // Check if the mock user in code has changed (e.g. from developer update)
    // If so, update the stored user to match the new mock user
    if (parsedData.user.email !== MOCK_USER.email) {
      parsedData.user = MOCK_USER;
      this.saveData(parsedData);
    }
    
    return parsedData;
  }

  static saveData(data: any) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  static getUser(): User {
    return this.getData().user;
  }

  static getTransactions(): Transaction[] {
    return this.getData().transactions;
  }

  static getCards(): VirtualCard[] {
    return this.getData().cards;
  }

  static isAuthenticated(): boolean {
    return this.getData().isAuthenticated;
  }

  static logout() {
    const data = this.getData();
    data.isAuthenticated = false;
    this.saveData(data);
  }

  static login(email: string, pin: string): boolean {
    const data = this.getData();
    if (data.user.email === email && data.user.pin === pin) {
      data.isAuthenticated = true;
      this.saveData(data);
      return true;
    }
    return false;
  }

  static addTransaction(transaction: Omit<Transaction, 'id' | 'status'>) {
    const data = this.getData();
    const newTransaction: Transaction = {
      ...transaction,
      id: `t${Date.now()}`,
      status: 'completed'
    };
    
    data.transactions.unshift(newTransaction);
    
    // Update balance
    if (transaction.type === 'income') {
      data.user.balance += transaction.amount;
      data.user.availableBalance += transaction.amount;
    } else {
      data.user.balance -= transaction.amount;
      data.user.availableBalance -= transaction.amount;
    }
    
    this.saveData(data);
    return newTransaction;
  }
}
