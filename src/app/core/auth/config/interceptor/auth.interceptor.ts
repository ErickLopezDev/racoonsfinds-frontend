import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserStateService } from '../../../../shared/services/user-state.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const _userStateService = inject(UserStateService);
  if (_userStateService.token() !== '') {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${_userStateService.token()}`
      }
    });
    return next(authReq);
  }
  return next(req);
};
