import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginRes } from '../../core/auth/config/services/auth.model';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  private readonly _router = inject(Router);

  private tokenNameLs = 'token';

  private _token = signal<string>('');
  token = this._token.asReadonly();

  constructor() {
    const token = localStorage.getItem(this.tokenNameLs);

    if (token) {
      this._token.set(token);
    }

  }

  setToken(token: string) {
    localStorage.setItem(this.tokenNameLs, token);
    this._token.set(token);
  }

  logout(): void {
    localStorage.removeItem(this.tokenNameLs);

    this._token.set('');

    this._router.navigate(['/auth']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenNameLs);

    return !!token;
  }

}
