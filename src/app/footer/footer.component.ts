import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer bg-light text-center text-lg-start mt-auto py-3">
    <div class="container">
      <span class="text-muted">&copy; 2024 Gestion Hidrica. Todos los derechos reservados.</span>
      <p><a href="#" class="text-black">Política de privacidad</a> | 
      <a href="#" class="text-black">Términos de servicio</a>
  </p>
    </div>
  </footer>
  `,
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {}
