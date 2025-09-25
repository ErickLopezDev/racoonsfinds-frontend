import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ToastStateService } from './shared/services/toast.service';
import { UserStateService } from './shared/services/user-state.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService, ToastStateService]
})
export class AppComponent {

  private toastStateService: ToastStateService = inject(ToastStateService);
  toast = this.toastStateService.toast;

  private messageService: MessageService = inject(MessageService);

  constructor() {
    effect(() => {
      const toast = this.toast();
      if (toast) {
        this.messageService.add(toast!);
      }
    })
  }
}
