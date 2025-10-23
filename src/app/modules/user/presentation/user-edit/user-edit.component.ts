import { Component, effect, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Breadcrumb } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastStateService } from '../../../../shared/services/toast.service';
import { UserService } from '../../services/user.service';
import {
  IUserMeDto,
  IUserPutBodyReq,
  IUserPutQueryReq,
} from '../../models/user.model';
import { UserStateService } from '../../../../shared/services/user-state.service';

@Component({
  selector: 'app-user-edit',
  imports: [
    CardModule,
    Breadcrumb,
    InputTextModule,
    IftaLabelModule,
    ButtonModule,
    DatePicker,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
})
export class UserEditComponent implements OnInit {
  items: MenuItem[] | undefined;
  public srcImage: string = '../../../../../assets/userUnknow.jpg';
  public imageFileNew: any;
  public hasImage: boolean = false;
  private _fb: FormBuilder = inject(FormBuilder);
  private _toastService = inject(ToastStateService);
  private _userService = inject(UserService);
  private _userStateService = inject(UserStateService);
  user = this._userStateService.userPerfil;

  ngOnInit() {
    this.items = [
      { label: 'Perfil', icon: 'pi pi-user', routerLink: '/dash/user' },
      { label: 'Usuarios' },
    ];
    this.form.get('birthdate')?.valueChanges.subscribe((date) => {
      this.validDate(18, date);
    });
  }

  form!: FormGroup;

  constructor() {
    this.form = this._fb.group({
      username: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      email: [{ value: '', disabled: true }],
    });

    effect(() => {
      const userData = this.user();
      this.setPerfil();
    });
  }

  setPerfil() {
    const userData = this.user();
    if (!userData) return;
    this.form.patchValue({
      username: userData.username,
      birthdate: new Date(userData.birthDate + 'T00:00:01'),
      email: userData.email,
    });
    console.log(userData.birthDate + 'T00:00:01');
    if (userData.imageUrl) {
      this.srcImage = userData.imageUrl;
      this.hasImage = true;
    } else {
      this.hasImage = false;
    }
  }

  updateUser(): void {
    console.log(this.form.value);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const query: IUserPutQueryReq = {};

    if (this.form.get('username')?.value !== this.user()?.username) {
      query.username = this.form.get('username')?.value;
    }

    if (this.form.get('birthdate')?.value !== this.user()?.birthDate) {
      const birthDate: Date = new Date(this.form.get('birthdate')?.value);
      query.birthDate = birthDate.toISOString().split('T')[0];
    }
    const body: IUserPutBodyReq = {};

    if (this.imageFileNew) {
      body.file = this.imageFileNew;
    }

    this._userService.updateUserMe({ query, body }).subscribe({
      next: (response) => {
        if (response.success) {
          this._toastService.setToast({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Perfil actualizado correctamente.',
          });
        }
        this._userStateService.setPerfil();
      },
    });
  }

  deleteImage(): void {
    this.imageFileNew = '';
    this.hasImage = false;
  }

  protected validDate(minAge: number, date: string, maxAge: number = 0): void {
    if (date == '' || date == null) {
      return;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    const minAgeDate = new Date(
      today.getFullYear() - minAge,
      today.getMonth(),
      today.getDate()
    );
    const maxAgeDate = new Date(
      today.getFullYear() - maxAge,
      today.getMonth(),
      today.getDate()
    );

    if (maxAge > 0) {
      if (selectedDate > minAgeDate || selectedDate < maxAgeDate) {
        this.form.get('birthdate')?.setErrors({ invalid: true });
        return;
      }
    } else {
      if (selectedDate > minAgeDate) {
        this.form.get('birthdate')?.setErrors({ invalid: true });
        return;
      }
    }
    this.form.get('birthdate')?.setErrors(null);
  }

  uploadimage(e: any): void {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];

      // Tipos MIME permitidos
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
      ];

      // Tamaño máximo en bytes (2 MB = 2 * 1024 * 1024)
      const maxSize = 2 * 1024 * 1024;

      // Validar tipo de archivo
      if (!allowedTypes.includes(file.type)) {
        this._toastService.setToast({
          severity: 'error',
          summary: 'Error',
          detail:
            'Tipo de archivo no válido. Solo se permiten imágenes JPG, PNG, GIF y WebP.',
        });
        return;
      }

      // ✅ Validar tamaño del archivo
      if (file.size > maxSize) {
        this._toastService.setToast({
          severity: 'error',
          summary: 'Archivo demasiado grande',
          detail: 'La imagen no debe superar los 2 MB.',
        });
        return;
      }

      // Si pasa las validaciones, leer y mostrar la imagen
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.srcImage = event.target.result;
      };

      this.imageFileNew = file;
      this.hasImage = true;
    }
  }
}
