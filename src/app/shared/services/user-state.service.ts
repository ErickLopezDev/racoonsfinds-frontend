import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginRes } from '../../core/auth/config/services/auth.model';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  private readonly _router = inject(Router);

  private tokenNameLs = 'accessToken';
  private userId = 'userId';

  private _token = signal<string>('');
  token = this._token.asReadonly();

  private _user = signal<number | null>(null);
  user = this._user.asReadonly();

  constructor() {
    const token = localStorage.getItem(this.tokenNameLs);
    if (token) {
      this._token.set(token);
    }

  }

  setUser(userId: number) {
    localStorage.setItem(this.userId, userId.toString());
    this._user.set(userId);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenNameLs, token);
    this._token.set(token);
  }

  logout(): void {
    localStorage.removeItem(this.tokenNameLs);
    localStorage.removeItem(this.userId);
    this._token.set('');
    this._router.navigate(['/auth']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenNameLs);
    const userId = localStorage.getItem(this.userId);
    return !!token && !!userId;
  }

}
