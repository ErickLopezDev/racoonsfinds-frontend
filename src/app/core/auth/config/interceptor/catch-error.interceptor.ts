import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { UserStateService } from '../../../../shared/services/user-state.service';
import { ToastStateService } from '../../../../shared/services/toast.service';

export const catchErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const messageService = inject(ToastStateService);
  const _userStateService = inject(UserStateService);


  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {
      // Manejar diferentes tipos de errores
      switch (error.status) {
        case 401:
          messageService.setToast({ severity: 'error', summary: 'Acceso denegado', detail: error.error.message, life: 6000 });
          setTimeout(() => _userStateService.logout(), 150);
          break;

        case 404:

          if (error.error?.message) {
            messageService.setToast({ severity: 'error', summary: 'Recurso no encontrado', detail: error.error.message, life: 6000 });
            break;
          }

          messageService.setToast({ severity: 'error', summary: 'Recurso no encontrado', detail: 'El recurso solicitado no existe o no está disponible', life: 6000 });
          break;

        case 422:
          messageService.setToast({ severity: 'error', summary: 'Error', detail: 'Error de validacion', life: 6000 });
          break;

        case 0:
        case 500:
        case 502:
        case 503:
        case 504:
          messageService.setToast({ severity: 'error', summary: 'Error', detail: 'Error de servidor', life: 6000 });
          setTimeout(() => _userStateService.logout(), 150);
          break;

        default:
          messageService.setToast({ severity: 'error', summary: 'Error', detail: error.error.message, life: 6000 });
          break;
      }

      // Re-lanzar el error para que los componentes puedan manejarlo si es necesario
      return throwError(() => error);
    })
  );
};
