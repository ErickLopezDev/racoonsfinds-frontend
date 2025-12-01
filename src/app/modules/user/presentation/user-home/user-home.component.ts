import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { UserStateService } from '../../../../shared/services/user-state.service';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

@Component({
  selector: 'app-user-home',
  imports: [CardModule, CommonModule, UserDeleteComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {

  private readonly _userService = inject(UserService)
  private readonly _Router = inject(Router)
  private readonly _userStateService = inject(UserStateService)
  user = this._userStateService.userPerfil;
  showDelete = false;

  redirectToEdit() {
    this._Router.navigate(['/dash/user/edit'])
  }

  redirectToChangePassword() {
    this._Router.navigate(['/dash/user/change-password'])
  }

  openDeleteModal() {
    this.showDelete = true;
  }

  closeDeleteModal() {
    this.showDelete = false;
  }

  ngOnInit(): void {
    this._userStateService.setPerfil()
  }

}
