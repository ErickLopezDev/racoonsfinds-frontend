import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  imports: [CommonModule, DialogModule, ButtonModule, ReactiveFormsModule, InputTextModule, MessageModule, TextareaModule]
})

export class DialogComponent {

  @Output() accepted: EventEmitter<void> = new EventEmitter<void>();
  @Output() closed: EventEmitter<void> = new EventEmitter<void>();


  // Usar signals para el estado del dialog
  display = signal<boolean>(false);
  tipo = signal<'default' | 'info' | 'success' | 'warning' | 'error'>('default');
  title = signal<string>('');
  message = signal<string | null>(null);
  textCancelButton = signal<string | null>(null);
  textAcceptButton = signal<string | null>(null);
  validateWord = signal<string | null>(null);

  form: FormGroup

  // Agregar propiedades para almacenar las funciones callback
  private onAcceptCallback?: (data?: any) => void;
  private onCloseCallback?: (data?: any) => void;

  constructor(_fb: FormBuilder) {
    this.form = _fb.group({
      validateWord: ['', Validators.required]
    });
  }

  closeDialog() {
    // Ejecutar callback con datos si existe
    this.display.set(false);
    if (this.onCloseCallback) {
      this.onCloseCallback();
    }
    this.closed.emit();
    this.onCloseCallback = () => { }
  }

  onSubmit() {
    this.display.set(false);
    if (this.onAcceptCallback) {
      this.onAcceptCallback();
    }
    this.accepted.emit();
    this.onAcceptCallback = () => { }
    this.form.reset();


  }

  openDialog(value: {
    tipo?: 'default' | 'info' | 'success' | 'warning' | 'error',
    title?: string,
    message?: string | null,
    textCancelButton?: string | null,
    textAcceptButton?: string | null,
    validateWord?: string | null,
    onAccept?: (data: any) => void,
    onClose?: (data: any) => void,
  }) {

    this.form.reset();
    this.form.controls['validateWord'].setValidators([Validators.required, Validators.pattern(`^${value.validateWord}$`)]);
    // Actualizar todos los signals
    this.tipo.set(value.tipo || 'default');
    this.title.set(value.title || '');
    this.message.set(value.message || null);
    this.textCancelButton.set(value.textCancelButton || null);
    this.textAcceptButton.set(value.textAcceptButton || null);
    this.validateWord.set(value.validateWord || null);
    // Asignar las funciones callback si existen
    this.onAcceptCallback = value.onAccept;
    this.onCloseCallback = value.onClose;
    // Diferir el cambio de display al siguiente ciclo
    this.display.set(true);

  }

}
