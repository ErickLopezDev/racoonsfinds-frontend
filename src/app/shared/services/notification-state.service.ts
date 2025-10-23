import { effect, inject, Injectable, signal } from '@angular/core';
import { INotification } from '../../modules/notifications/models/notifications.model';
import { NotifcationsService } from '../../modules/notifications/services/notifcations.service';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationStateService {
  private notificationService = inject(NotifcationsService);
  private userStateService = inject(UserStateService);

  private _notifications = signal<INotification[]>([]);
  notifications = this._notifications.asReadonly();

  constructor() {
    effect(() => {
      console.log(this.userStateService.isAuthenticated());
      if (!this.userStateService.isAuthenticated()) {
        this._notifications.set([]);
        return;
      }
      this.setNotifications();
    });
  }

  setNotifications() {
    if (!this.userStateService.isAuthenticated()) {
      this._notifications.set([]);
      return;
    }
    this.notificationService.getAll().subscribe({
      next: (response) => {
        this._notifications.set(response.data);
      },
      error: (error) => {
        console.error('Error fetching notifications:', error);
      },
    });
  }
}
