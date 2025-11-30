import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { UserStateService } from '../../../../shared/services/user-state.service';

@Component({
  selector: 'app-user-home',
  imports: [CardModule, CommonModule],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {

  private readonly _userService = inject(UserService)
  private readonly _Router = inject(Router)
  private readonly _userStateService = inject(UserStateService)
  user = this._userStateService.userPerfil;

  redirectToEdit() {
    this._Router.navigate(['/dash/user/edit'])
  }

  redirectToChangePassword() {
    this._Router.navigate(['/dash/user/change-password'])
  }

  ngOnInit(): void {
    this._userStateService.setPerfil()
  }

}
