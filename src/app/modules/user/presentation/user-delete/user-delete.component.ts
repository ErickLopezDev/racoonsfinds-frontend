import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastStateService } from '../../../../shared/services/toast.service';
import { UserService } from '../../services/user.service';
import { UserStateService } from '../../../../shared/services/user-state.service';

@Component({
  selector: 'app-user-delete',
  standalone: true,
  imports: [CommonModule, DialogModule, ButtonModule],
  templateUrl: './user-delete.component.html',
  styleUrl: './user-delete.component.css',
})
export class UserDeleteComponent {
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();

  private readonly _userService = inject(UserService);
  private readonly _toast = inject(ToastStateService);
  private readonly _userState = inject(UserStateService);

  deleting = false;

  hide(): void {
    this.close.emit();
  }

  confirmDelete(): void {
    if (this.deleting) return;
    this.deleting = true;
    this._userService.deleteUser().subscribe({
      next: (res) => {
        this.deleting = false;
        if (res.success) {
          this._toast.setToast({
            severity: 'success',
            summary: 'Cuenta eliminada',
            detail: 'Tu cuenta fue eliminada. Hasta pronto.',
            life: 3500,
          });
          this.hide();
          this._userState.logout();
        } else {
          this._toast.setToast({
            severity: 'error',
            summary: 'No se pudo eliminar',
            detail: res.message || 'Intenta nuevamente más tarde.',
            life: 3500,
          });
        }
      },
      error: () => {
        this.deleting = false;
        this._toast.setToast({
          severity: 'error',
          summary: 'No se pudo eliminar',
          detail: 'Ocurrió un problema. Intenta nuevamente.',
          life: 3500,
        });
      },
    });
  }
}
