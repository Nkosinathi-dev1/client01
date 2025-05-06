import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private accessKey = 'access_token';
  private refreshKey = 'refresh_token';

  saveTokens(tokens: { accessToken: string; refreshToken: string }): void {
    if (typeof window !== 'undefined') {
      console.log('Saving Access Token:', tokens.accessToken);
      console.log('Saving Refresh Token:', tokens.refreshToken);
      localStorage.setItem(this.accessKey, tokens.accessToken);
      localStorage.setItem(this.refreshKey, tokens.refreshToken);
    }
  }

  getAccessToken(): string | null {
    const token = typeof window !== 'undefined'
      ? localStorage.getItem(this.accessKey)
      : null;
    console.log('Retrieved Access Token:', token);
    return token;
  }

  getRefreshToken(): string | null {
    const token = typeof window !== 'undefined'
      ? localStorage.getItem(this.refreshKey)
      : null;
    console.log('Retrieved Refresh Token:', token);
    return token;
  }

  clearTokens(): void {
    if (typeof window !== 'undefined') {
      console.log('Clearing tokens from storage');
      localStorage.removeItem(this.accessKey);
      localStorage.removeItem(this.refreshKey);
    }
  }
}