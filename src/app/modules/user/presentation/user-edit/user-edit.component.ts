import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Breadcrumb } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'app-user-edit',
  imports: [CardModule, Breadcrumb, InputTextModule, IftaLabelModule, ButtonModule, DatePicker],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
  items: MenuItem[] | undefined;
  public srcImage: string = "../../../../../assets/userUnknow.jpg"
  public imageFileNew: any
  public hasImage: boolean = false

  ngOnInit() {
    this.items = [
      { label: 'Perfil', icon: 'pi pi-user', routerLink: '/dash' },
      { label: 'Usuarios' }
    ];

  }

  deleteImage(): void {
    this.imageFileNew = ""
  }

  uploadimage(e: any): void {
    if (e.target.files.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      reader.onload = (event: any) => {
        this.imageFileNew = event.target.result
      }
      this.imageFileNew = e.target.files[0];
    }
  }
}
