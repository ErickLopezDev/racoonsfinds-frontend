import { Component, inject } from '@angular/core';
import { HeaderClientComponent } from "./components/header/header.component";
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-client-layout',
  imports: [HeaderClientComponent, RouterOutlet],
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.css'
})
export class ClientLayoutComponent {

 
}
