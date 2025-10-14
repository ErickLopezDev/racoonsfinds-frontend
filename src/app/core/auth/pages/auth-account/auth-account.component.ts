import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-auth-account',
  imports: [ButtonModule, CommonModule, RouterLink],
  templateUrl: './auth-account.component.html',
  styleUrl: './auth-account.component.css'
})
export class AuthAccountComponent {

  private router: Router = inject(Router)

  message: string = 'Verificando tu cuenta';
  messageState: number = 0;

  constructor() {
    this.auth();
  }

  auth() {

    setTimeout(() => {
      this.messageState = 1; // Simulando respuesta del servidor
      switch (this.messageState) {
        case 1:
          this.message = 'Tu cuenta ha sido verificada exitosamente. Ahora puedes iniciar sesión.';
          break;
        case 2:
          this.message = 'El enlace de verificación ha expirado. Por favor, solicita un nuevo enlace.';
          break;
        case 3:
          this.message = 'El enlace de verificación es inválido. Por favor, verifica el enlace o solicita uno nuevo.';
          break;
        default:
          this.message = 'Ha ocurrido un error desconocido. Por favor, intenta nuevamente más tarde.';
          break;
      }
    }, 5000)

  }

  regresar() {



  }
}

