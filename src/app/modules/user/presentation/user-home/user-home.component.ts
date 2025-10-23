import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { UserService } from '../../services/user.service';
import { IUserMeDto } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { UserStateService } from '../../../../shared/services/user-state.service';

@Component({
  selector: 'app-user-home',
  imports: [CardModule, CommonModule],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {

  private _userService = inject(UserService)
  private _Router = inject(Router)
  private _userStateService = inject(UserStateService)
  user = this._userStateService.userPerfil;

  redirectToEdit() {
    this._Router.navigate(['/dash/user/edit'])
  }

  ngOnInit(): void {
    this._userStateService.setPerfil()
  }

}
