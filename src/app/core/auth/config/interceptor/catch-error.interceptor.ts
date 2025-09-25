import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
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
          messageService.setToast({ severity: 'danger', summary: 'Acceso denegado', detail: 'No autorizado', life: 3000 });
          _userStateService.logout();
          break;

        case 403:
          messageService.setToast({ severity: 'danger', summary: 'Acceso denegado', detail: 'No autorizado', life: 3000 });
          _userStateService.logout();
          break;

        case 404:
          messageService.setToast({ severity: 'danger', summary: 'Recurso no encontrado', detail: 'El recurso solicitado no existe o no está disponible', life: 3000 });
          break;

        case 422:
          messageService.setToast({ severity: 'danger', summary: 'Error', detail: 'Error de validacion', life: 3000 });
          break;

        case 500:
        case 502:
        case 503:
        case 504:
          messageService.setToast({ severity: 'danger', summary: 'Error', detail: 'Error de servidor', life: 3000 });
          _userStateService.logout();
          break;

        case 0:
          messageService.setToast({ severity: 'danger', summary: 'Error', detail: 'Error de servidor', life: 3000 });
          _userStateService.logout();
          break;

        default:
          messageService.setToast({ severity: 'danger', summary: 'Error', detail: 'Error de servidor', life: 3000 });
          break;
      }

      // Re-lanzar el error para que los componentes puedan manejarlo si es necesario
      return throwError(() => error);
    })
  );
};