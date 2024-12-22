import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component'; // Asegúrate de que la ruta es correcta
import { FooterComponent } from './footer/footer.component'; // Asegúrate de que la ruta es correcta

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'GestionHidrica';
  constructor(public router: Router) {
    console.log(router.url);
  }
}
