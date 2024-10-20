import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleSheetsService } from '../services/google-sheets.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calcular-huella',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calcular-huella.component.html',
  styleUrls: ['./calcular-huella.component.css']  // Cambié styleUrl a styleUrls
})
export class CalcularHuellaComponent {
  currentStep: number = 1;
  medicionHuella: string = '';  // La variable enlazada con ngModel

  // Inyectar el servicio de Google Sheets en el constructor
  constructor(private googleSheetsService: GoogleSheetsService) { }

  // Método para avanzar al siguiente paso
  nextStep() {
    if (this.currentStep < 5) {
      this.currentStep++;
    }
  }

  // Método para retroceder al paso anterior
  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Método para guardar el dato en la hoja de Google Sheets
  guardarEnGoogleSheets() {
    const rango = '3. INFORMACIÓN!B5';  // El rango específico en la hoja
    const valores = [[this.medicionHuella]];  // El valor ingresado en la celda B5

    this.googleSheetsService.addDataToSheet(rango, valores)
      .then((response: any) => {
        console.log('Dato guardado exitosamente:', response);
      })
      .catch((error: any) => {
        console.error('Error al guardar el dato:', error);
      });
  }

  // Método para cálculos adicionales si es necesario
  calcular() {
    // Primero, autentica al usuario
    this.googleSheetsService.handleAuthClick().then(() => {
      // Si la autenticación es exitosa, guarda en Google Sheets
      this.guardarEnGoogleSheets();
    }).catch((error) => {
      console.error('Error during authentication:', error);
    });
  }
  
}
