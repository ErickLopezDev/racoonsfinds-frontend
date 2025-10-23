import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserStateService } from '../../../../shared/services/user-state.service';
import { ToastStateService } from '../../../../shared/services/toast.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const _userStateService = inject(UserStateService);
  const router = inject(Router);
  const _toastService = inject(ToastStateService)

  if (_userStateService.isAuthVerify()) {
    _toastService.setToast({
      severity: 'info',
      summary: 'Ya has iniciado sesión',
      detail: 'No puedes acceder a la página de inicio de sesión si ya has iniciado sesión',
      life: 3000
    });
    router.navigate(['/dash/user']);
    return false;
  } else {
    return true;
  }

};
