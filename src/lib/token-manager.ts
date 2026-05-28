// Token Manager for AI Tools
// Tracks daily token usage per user using localStorage

const DAILY_TOKEN_LIMIT = 10000; // 10,000 tokens per day
const STORAGE_KEY = 'token_usage';
const LAST_RESET_KEY = 'token_last_reset';

interface TokenUsage {
  date: string;
  tokensUsed: number;
}

export class TokenManager {
  private static instance: TokenManager;

  private constructor() {}

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
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
        tokensUsed: 0
      }));
      localStorage.setItem(LAST_RESET_KEY, today);
    }
  }

  private getUsage(): TokenUsage {
    this.resetIfNeeded();
    const usage = localStorage.getItem(STORAGE_KEY);
    return usage ? JSON.parse(usage) : { date: this.getToday(), tokensUsed: 0 };
  }

  private setUsage(usage: TokenUsage): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
  }

  getRemainingTokens(): number {
    const usage = this.getUsage();
    return Math.max(0, DAILY_TOKEN_LIMIT - usage.tokensUsed);
  }

  getTokensUsed(): number {
    const usage = this.getUsage();
    return usage.tokensUsed;
  }

  getDailyLimit(): number {
    return DAILY_TOKEN_LIMIT;
  }

  canUseTokens(tokensNeeded: number): boolean {
    return this.getRemainingTokens() >= tokensNeeded;
  }

  useTokens(tokensUsed: number): boolean {
    if (!this.canUseTokens(tokensUsed)) {
      return false;
    }

    const usage = this.getUsage();
    usage.tokensUsed += tokensUsed;
    this.setUsage(usage);
    return true;
  }

  getTokenUsagePercentage(): number {
    const used = this.getTokensUsed();
    return Math.min(100, (used / DAILY_TOKEN_LIMIT) * 100);
  }

  resetDaily(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      date: this.getToday(),
      tokensUsed: 0
    }));
    localStorage.setItem(LAST_RESET_KEY, this.getToday());
  }
}

export const tokenManager = TokenManager.getInstance();
