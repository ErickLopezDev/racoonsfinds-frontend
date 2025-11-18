import { Component} from '@angular/core';
import { HeaderClientComponent } from "./components/header/header.component";
import { RouterOutlet } from '@angular/router';
import { CategoryStateService } from '../../services/category.service';

@Component({
  selector: 'app-client-layout',
  imports: [HeaderClientComponent, RouterOutlet],
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.css',
  providers: [CategoryStateService]
})
export class ClientLayoutComponent {

 
}
