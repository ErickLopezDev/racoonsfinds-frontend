import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
  imports: [RouterOutlet]
})
export class AuthLayoutComponent {

  constructor(private router: Router) { }

  goHome() {
    this.router.navigate(['/']);
  }

}
