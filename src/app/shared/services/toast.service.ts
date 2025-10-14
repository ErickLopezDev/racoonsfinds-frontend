import { Injectable, signal } from '@angular/core';
import { ToastMessageOptions } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class ToastStateService {

  toast = signal<ToastMessageOptions | null>(null);
  setToast(value: ToastMessageOptions) {
    this.toast.set(value);
  }


}
