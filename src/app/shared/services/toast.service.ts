import { Injectable, signal } from '@angular/core';

interface IToast { severity: 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast', summary: string, detail: string, life: number }

@Injectable({
  providedIn: 'root'
})
export class ToastStateService {

  toast = signal<IToast | null>(null);
  setToast(value: IToast) {
    this.toast.set(value);
  }


}
