import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import MyPreset from './mypreset';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/auth/config/interceptor/auth.interceptor';
import { catchErrorInterceptor } from './core/auth/config/interceptor/catch-error.interceptor';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideHttpClient(
    withFetch(),
    withInterceptors([authInterceptor, catchErrorInterceptor])
  ), provideRouter(routes), provideAnimations(), providePrimeNG({
    theme: { preset: MyPreset, options: { darkModeSelector: '.app-dark' } },
    translation: {
      dayNames: [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
      ],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      monthNames: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
      monthNamesShort: [
        'ene',
        'feb',
        'mar',
        'abr',
        'may',
        'jun',
        'jul',
      ],
      today: 'Hoy',
      clear: 'Limpiar',
      dateFormat: 'dd/mm/yy',
      firstDayOfWeek: 1,
    }
  })]
};
