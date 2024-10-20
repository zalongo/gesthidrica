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
  
  medicionHuella: string = '';
  anioMedicion: string = '';
  unidadFuncional: string = '';
  nombreEmpresa: string = '';
  instalacionMedida: string = '';
  ubicacionMedidaR: string = '';
  ubicacionMedidaC: string = '';
  tipoProducto: string = '';
  nombreResponsable: string = '';
  cargoResponsable: string = '';
  correoResponsable: string = '';
  telefonoResponsable: string = '';

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
  // Aca hay que agregar mas datos, las hojas que corresponde con la celda que corresponde.
  // Hay que hacer que la autenticacion se haga al principio y no al enviar los datos.
  // Al enviar los datos el formulario, que quede en blanco para agregar datos nuevamente.
  // Trabaja Felipe 
  // Falta que se descargue la hoja de la hoja de huella hidrica en formato exel para imprimir.



  // Método para guardar el dato en la hoja de Google Sheets
  guardarEnGoogleSheets() {
    const rango = '3. INFORMACIÓN!B5:B18';  // El rango específico en la hoja
    const valores = [
      [this.medicionHuella],           // B5
      [this.anioMedicion],             // B6
      [this.unidadFuncional],
      [],          // B7
      [this.nombreEmpresa],             // B9
      [this.instalacionMedida],        // B10
      [this.ubicacionMedidaR],         // B11
      [this.ubicacionMedidaC],         // B12
      [this.tipoProducto],      
      [],        // B13
      [this.nombreResponsable],         // B15
      [this.cargoResponsable],          // B16
      [this.correoResponsable],         // B17
      [this.telefonoResponsable]        // B18
    ];
  
    this.googleSheetsService.addDataToSheet(rango, valores)
      .then((response: any) => {
        console.log('Datos guardados exitosamente:', response);
      })
      .catch((error: any) => {
        console.error('Error al guardar los datos:', error);
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
