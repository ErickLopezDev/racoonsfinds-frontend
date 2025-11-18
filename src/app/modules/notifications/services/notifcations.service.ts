import { Injectable } from '@angular/core';
import { ApiUtilService } from '@utils/api-util.service';
import { Observable } from 'rxjs';
import {
  INotificationResponse,
} from '../models/notifications.model';
import { NOTIFICATIONS_API_ROUTES } from './notifications.routing';

@Injectable({
  providedIn: 'root',
})
export class NotifcationsService extends ApiUtilService {
  getAll(): Observable<INotificationResponse> {
    const URL = this.buildApiUrl({
      endpoint: NOTIFICATIONS_API_ROUTES.GET_ALL,
    });
    return this.http.get<INotificationResponse>(URL);
  }
}
