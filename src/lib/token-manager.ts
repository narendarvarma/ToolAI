// Token Manager for AI Tools
// Tracks daily request usage per user using localStorage

const DAILY_REQUEST_LIMIT = 5; // 5 free requests per day
const STORAGE_KEY = 'toolhub_usage';
const LAST_RESET_KEY = 'toolhub_last_reset';
const DEVICE_ID_KEY = 'toolhub_device_id';

interface TokenUsage {
  date: string;
  requestsUsed: number;
}

export class TokenManager {
  private static instance: TokenManager;

  private constructor() {
    this.initializeDeviceID();
  }

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  private getDeviceID(): string {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id) {
      id = "dev_" + Math.random().toString(36).substr(2, 12) + "_" + Date.now();
      localStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
  }

  private initializeDeviceID(): void {
    if (typeof window !== 'undefined') {
      this.getDeviceID();
    }
  }

  private getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  private resetIfNeeded(): void {
    const lastReset = localStorage.getItem(LAST_RESET_KEY);
    const today = this.getToday();

    if (lastReset !== today) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        date: today,
        requestsUsed: 0
      }));
      localStorage.setItem(LAST_RESET_KEY, today);
    }
  }

  private cleanOldUsageKeys(): void {
    if (typeof window === 'undefined') return;
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('toolhub_usage_') && key !== STORAGE_KEY) {
        localStorage.removeItem(key);
      }
    });
  }

  private getUsage(): TokenUsage {
    this.resetIfNeeded();
    this.cleanOldUsageKeys();
    const usage = localStorage.getItem(STORAGE_KEY);
    return usage ? JSON.parse(usage) : { date: this.getToday(), requestsUsed: 0 };
  }

  private setUsage(usage: TokenUsage): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
  }

  getRemainingRequests(): number {
    const usage = this.getUsage();
    return Math.max(0, DAILY_REQUEST_LIMIT - usage.requestsUsed);
  }

  getRequestsUsed(): number {
    const usage = this.getUsage();
    return usage.requestsUsed;
  }

  getDailyLimit(): number {
    return DAILY_REQUEST_LIMIT;
  }

  canUseRequest(): boolean {
    return this.getRemainingRequests() > 0;
  }

  // Used by AI tool pages that pass an estimated token count.
  // Since we track by requests (not raw tokens), we just check if a slot is free.
  canUseTokens(_estimatedTokens: number): boolean {
    return this.canUseRequest();
  }

  useRequest(): boolean {
    if (!this.canUseRequest()) {
      return false;
    }

    const usage = this.getUsage();
    usage.requestsUsed += 1;
    this.setUsage(usage);
    return true;
  }

  getRequestUsagePercentage(): number {
    const used = this.getRequestsUsed();
    return Math.min(100, (used / DAILY_REQUEST_LIMIT) * 100);
  }

  resetDaily(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      date: this.getToday(),
      requestsUsed: 0
    }));
    localStorage.setItem(LAST_RESET_KEY, this.getToday());
  }

  getTimeUntilReset(): { hours: number; minutes: number; seconds: number } {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight.getTime() - now.getTime();

    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    return { hours, minutes, seconds };
  }
}

export const tokenManager = TokenManager.getInstance();