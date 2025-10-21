import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';
import { UserStateService } from '../../../../shared/services/user-state.service';
import { ToastStateService } from '../../../../shared/services/toast.service';
import { Router } from '@angular/router';

export const catchErrorInterceptor: HttpInterceptorFn = (req, next) => {

  const messageService = inject(ToastStateService);
  const _userStateService = inject(UserStateService);

  const router = inject(Router);

  return next(req).pipe(

    catchError((error: HttpErrorResponse) => {
      // Manejar diferentes tipos de errores
      switch (error.status) {
        case 401:
          messageService.setToast({ severity: 'error', summary: 'Acceso denegado', detail: 'No autorizado', life: 3000 });
          setTimeout(() => _userStateService.logout(), 150);
          break;

        case 404:
          messageService.setToast({ severity: 'error', summary: 'Recurso no encontrado', detail: 'El recurso solicitado no existe o no está disponible', life: 3000 });
          break;

        case 422:
          messageService.setToast({ severity: 'error', summary: 'Error', detail: 'Error de validacion', life: 3000 });
          break;

        case 500:
        case 502:
        case 503:
        case 504:
          messageService.setToast({ severity: 'error', summary: 'Error', detail: 'Error de servidor', life: 3000 });
          setTimeout(() => _userStateService.logout(), 150);
          break;

        case 0:
          messageService.setToast({ severity: 'error', summary: 'Error', detail: 'Error de servidor', life: 3000 });
          setTimeout(() => _userStateService.logout(), 150);
          break;

        default:
          messageService.setToast({ severity: 'error', summary: 'Error', detail: 'Error de servidor', life: 3000 });
          break;
      }

      // Re-lanzar el error para que los componentes puedan manejarlo si es necesario
      return throwError(() => error);
    })
  );
};