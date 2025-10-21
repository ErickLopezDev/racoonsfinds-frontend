import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserStateService } from '../../../../shared/services/user-state.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _userStateService = inject(UserStateService);
  const router = inject(Router);
  if (_userStateService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }

};
