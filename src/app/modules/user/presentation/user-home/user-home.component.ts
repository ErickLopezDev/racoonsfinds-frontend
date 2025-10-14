import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-user-home',
  imports: [CardModule, Avatar],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {

  private _Router = inject(Router)

  redirectToEdit(){
    this._Router.navigate(['/dash/user/edit'])
  }

}
