import { effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginRes } from '../../core/auth/config/services/auth.model';
import { IUserMeDto } from '../../modules/user/models/user.model';
import { UserService } from '../../modules/user/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  private readonly _router = inject(Router);
  private readonly _userService = inject(UserService);

  private tokenNameLs = 'accessToken';
  private userId = 'userId';

  private _token = signal<string>('');
  token = this._token.asReadonly();

  private _user = signal<number | null>(null);
  user = this._user.asReadonly();

  private _userPerfil = signal<IUserMeDto | null>(null);
  userPerfil = this._userPerfil.asReadonly();

  private _isAuthenticated = signal<boolean>(false);
  isAuthenticated = this._isAuthenticated.asReadonly();

  setPerfil() {
    if (this.isAuthenticated() === false) return
    this._userService.getUserMe().subscribe({
      next: (response) => {
        if (response.success) {
          this._userPerfil.set(response.data)
        }
      }
    })
  }

  constructor() {
    const token = localStorage.getItem(this.tokenNameLs);
    const userId = localStorage.getItem(this.userId);
    if (userId) {
      this._user.set(+userId);
    }
    if (token) {
      this._token.set(token);
    }

    effect(() => {
      this._token();
      this._user();
      this._userPerfil();
      this.isAuthenticatedF();
    })


    this.setPerfil()

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
    this._user.set(null);
    this._isAuthenticated.set(false);
    this._router.navigate(['/']);
    this._userPerfil.set(null);
  }

  isAuthenticatedF() {
    const token = localStorage.getItem(this.tokenNameLs);
    const userId = localStorage.getItem(this.userId);
    this._isAuthenticated.set(!!token && !!userId);
  }

  isAuthVerify(): boolean {
    const token = localStorage.getItem(this.tokenNameLs);
    const userId = localStorage.getItem(this.userId);
    return !!token && !!userId;
  }

}
