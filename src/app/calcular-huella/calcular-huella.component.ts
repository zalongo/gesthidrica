import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-calcular-huella',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calcular-huella.component.html',
  styleUrl: './calcular-huella.component.css'
})
export class CalcularHuellaComponent {
  currentStep: number = 1;

  // Avanza al siguiente paso
  nextStep() {
    if (this.currentStep < 5) {
      this.currentStep++;
    }
  }

  // Retrocede al paso anterior
  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  calcular(){
    
  }
}
