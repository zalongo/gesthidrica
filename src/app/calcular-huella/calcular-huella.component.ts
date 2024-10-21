import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleSheetsService } from '../services/google-sheets.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calcular-huella',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calcular-huella.component.html',
  styleUrls: ['./calcular-huella.component.css'],
})
export class CalcularHuellaComponent {
  currentStep: number = 1;

  // Datos de la medición de huella
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

  // Datos de producción mensual
  producto: string = '';
  descripcion: string = '';
  unidad: string = '';
  enero: number = 0;
  febrero: number = 0;
  marzo: number = 0;
  abril: number = 0;
  mayo: number = 0;
  junio: number = 0;
  julio: number = 0;
  agosto: number = 0;
  septiembre: number = 0;
  octubre: number = 0;
  noviembre: number = 0;
  diciembre: number = 0;
  // Datos de entrada de agua potable mensual
aguaPotableMensualUso: string = '';
aguaPotableMensualEnero: number = 0;
aguaPotableMensualFebrero: number = 0;
aguaPotableMensualMarzo: number = 0;
aguaPotableMensualAbril: number = 0;
aguaPotableMensualMayo: number = 0;
aguaPotableMensualJunio: number = 0;
aguaPotableMensualJulio: number = 0;
aguaPotableMensualAgosto: number = 0;
aguaPotableMensualSeptiembre: number = 0;
aguaPotableMensualOctubre: number = 0;
aguaPotableMensualNoviembre: number = 0;
aguaPotableMensualDiciembre: number = 0;


// Datos de entrada de agua de pozo mensual
aguaPozoFuenteUso: string = '';
aguaPozoEnero: number = 0;
aguaPozoFebrero: number = 0;
aguaPozoMarzo: number = 0;
aguaPozoAbril: number = 0;
aguaPozoMayo: number = 0;
aguaPozoJunio: number = 0;
aguaPozoJulio: number = 0;
aguaPozoAgosto: number = 0;
aguaPozoSeptiembre: number = 0;
aguaPozoOctubre: number = 0;
aguaPozoNoviembre: number = 0;
aguaPozoDiciembre: number = 0;


// Datos de entrada de agua dulce de fuentes superficiales mensual
aguaSuperficialFuenteUso: string = '';
aguaSuperficialEnero: number = 0;
aguaSuperficialFebrero: number = 0;
aguaSuperficialMarzo: number = 0;
aguaSuperficialAbril: number = 0;
aguaSuperficialMayo: number = 0;
aguaSuperficialJunio: number = 0;
aguaSuperficialJulio: number = 0;
aguaSuperficialAgosto: number = 0;
aguaSuperficialSeptiembre: number = 0;
aguaSuperficialOctubre: number = 0;
aguaSuperficialNoviembre: number = 0;
aguaSuperficialDiciembre: number = 0;
// Datos de salida de agua descargada mensual
salidaAguaDescargadaProceso: string = '';
salidaAguaDescargadaEnero: string = '';
salidaAguaDescargadaFebrero: number = 0;
salidaAguaDescargadaMarzo: number = 0;
salidaAguaDescargadaAbril: number = 0;
salidaAguaDescargadaMayo: number = 0;
salidaAguaDescargadaJunio: number = 0;
salidaAguaDescargadaJulio: number = 0;
salidaAguaDescargadaAgosto: number = 0;
salidaAguaDescargadaSeptiembre: number = 0;
salidaAguaDescargadaOctubre: number = 0;
salidaAguaDescargadaNoviembre: number = 0;
salidaAguaDescargadaDiciembre: number = 0;
//dATOS DER SALIDA DE AGUA INFILTRADA MENSUAL
salidaAguaInfiltradaProceso: string = '';
salidaAguaInfiltradaEnero: number = 0;
salidaAguaInfiltradaFebrero: number = 0;
salidaAguaInfiltradaMarzo: number = 0;
salidaAguaInfiltradaAbril: number = 0;
salidaAguaInfiltradaMayo: number = 0;
salidaAguaInfiltradaJunio: number = 0;
salidaAguaInfiltradaJulio: number = 0;
salidaAguaInfiltradaAgosto: number = 0;
salidaAguaInfiltradaSeptiembre: number = 0;
salidaAguaInfiltradaOctubre: number = 0;
salidaAguaInfiltradaNoviembre: number = 0;
salidaAguaInfiltradaDiciembre: number = 0;
// Datos de salida de agua consumida mensual
salidaAguaConsumidaProceso: string = '';
salidaAguaConsumidaEnero: number = 0;
salidaAguaConsumidaFebrero: number = 0;
salidaAguaConsumidaMarzo: number = 0;
salidaAguaConsumidaAbril: number = 0;
salidaAguaConsumidaMayo: number = 0;
salidaAguaConsumidaJunio: number = 0;
salidaAguaConsumidaJulio: number = 0;
salidaAguaConsumidaAgosto: number = 0;
salidaAguaConsumidaSeptiembre: number = 0;
salidaAguaConsumidaOctubre: number = 0;
salidaAguaConsumidaNoviembre: number = 0;
salidaAguaConsumidaDiciembre: number = 0;

  // Inyectar el servicio de Google Sheets en el constructor
  constructor(private googleSheetsService: GoogleSheetsService) {}

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

  // Método para guardar los datos en Google Sheets
  guardarDatos() {
    this.guardarDatosHoja3();
    this.guardarDatosHoja4();
    this.guardarDatosHoja5();
    this.guardarDatosSalidaAgua();
    

    // Reiniciar el formulario después de guardar los datos
    
  }

  // Método específico para guardar datos en Hoja 3
  private guardarDatosHoja3() {
    const rango = '3. INFORMACIÓN!B5:B18'; // El rango específico en la hoja 3
    const valores = [
      [this.medicionHuella], // B5
      [this.anioMedicion], // B6
      [this.unidadFuncional], // B7
      [""], // Saltar una fila
      [this.nombreEmpresa], // B9
      [this.instalacionMedida], // B10
      [this.ubicacionMedidaR], // B11
      [this.ubicacionMedidaC], // B12
      [this.tipoProducto], // B13
      [""], // Saltar otra fila
      [this.nombreResponsable], // B15
      [this.cargoResponsable], // B16
      [this.correoResponsable], // B17
      [this.telefonoResponsable], // B18
    ];

    this.googleSheetsService.addDataToSheet(rango, valores)
      .then((response: any) => {
        console.log('Datos guardados exitosamente en Hoja 3:', response);
      })
      .catch((error: any) => {
        console.error('Error al guardar los datos en Hoja 3:', error);
      });
  }

  // Método específico para guardar datos en Hoja 4
  private guardarDatosHoja4() {
    const rango = '4. PRODUCCIÓN!A6:O6'; // Rango que cubre de A6 a N6 en una sola operación
    const valores = [
      [
        this.producto,
        this.descripcion,
        '',
        this.enero,
        this.febrero,
        this.marzo,
        this.abril,
        this.mayo,
        this.junio,
        this.julio,
        this.agosto,
        this.septiembre,
        this.octubre,
        this.noviembre,
        this.diciembre,
      ]
    ];

    this.googleSheetsService.addDataToSheet(rango, valores)
      .then((response: any) => {
        console.log('Datos guardados exitosamente en Hoja 4:', response);
      })
      .catch((error: any) => {
        console.error('Error al guardar los datos en Hoja 4:', error);
      });
  }
  private guardarDatosHoja5() {
    const rangoAguaPotable = '5. USO DIRECTO DE AGUA!A6:N6'; // Rango para la primera tabla
    const valoresAguaPotable = [
        [
            this.aguaPotableMensualUso, // C6
            0,  
            this.aguaPotableMensualEnero, // D6
            this.aguaPotableMensualFebrero, // E6
            this.aguaPotableMensualMarzo, // F6
            this.aguaPotableMensualAbril, // G6
            this.aguaPotableMensualMayo, // H6
            this.aguaPotableMensualJunio, // I6
            this.aguaPotableMensualJulio, // J6
            this.aguaPotableMensualAgosto, // K6
            this.aguaPotableMensualSeptiembre, // L6
            this.aguaPotableMensualOctubre, // M6
            this.aguaPotableMensualNoviembre, // N6
            this.aguaPotableMensualDiciembre, // O6
            
        ]
    ];

    // Segunda tabla: Entrada Mensual de Agua de Pozo
    const rangoAguaPozo = '5. USO DIRECTO DE AGUA!A:16:N16'; // Rango para la segunda tabla
    const valoresAguaPozo = [
        [
            this.aguaPozoFuenteUso, // A16
            0,                   //B16
            this.aguaPozoEnero, // C16
            this.aguaPozoFebrero, // D16
            this.aguaPozoMarzo, // E16
            this.aguaPozoAbril, // F16
            this.aguaPozoMayo, // G16
            this.aguaPozoJunio, // H16
            this.aguaPozoJulio, // I16
            this.aguaPozoAgosto, // J16
            this.aguaPozoSeptiembre, // K16
            this.aguaPozoOctubre, // L16
            this.aguaPozoNoviembre, // M16
            this.aguaPozoDiciembre, // N16
        ]
    ];

    // Tercera tabla: Entrada Mensual de Agua Dulce de Fuentes Superficiales
    const rangoAguaSuperficial = '5. USO DIRECTO DE AGUA!A26:N26'; // Rango para la tercera tabla
    const valoresAguaSuperficial = [
        [
            this.aguaSuperficialFuenteUso,
            0,   // C26
            this.aguaSuperficialEnero, // D26
            this.aguaSuperficialFebrero, // E26
            this.aguaSuperficialMarzo, // F26
            this.aguaSuperficialAbril, // G26
            this.aguaSuperficialMayo, // H26
            this.aguaSuperficialJunio, // I26
            this.aguaSuperficialJulio, // J26
            this.aguaSuperficialAgosto, // K26
            this.aguaSuperficialSeptiembre, // L26
            this.aguaSuperficialOctubre, // M26
            this.aguaSuperficialNoviembre, // N26
            this.aguaSuperficialDiciembre, // O26
           
        ]
    ];

    // Guardar en la Hoja 5 - Entrada Mensual de Agua Potable
    this.googleSheetsService.addDataToSheet(rangoAguaPotable, valoresAguaPotable)
        .then((response: any) => {
            console.log('Datos guardados exitosamente en Hoja 5 - Agua Potable:', response);
        })
        .catch((error: any) => {
            console.error('Error al guardar los datos en Hoja 5 - Agua Potable:', error);
        });

    // Guardar en la Hoja 5 - Entrada Mensual de Agua de Pozo
    this.googleSheetsService.addDataToSheet(rangoAguaPozo, valoresAguaPozo)
        .then((response: any) => {
            console.log('Datos guardados exitosamente en Hoja 5 - Agua de Pozo:', response);
        })
        .catch((error: any) => {
            console.error('Error al guardar los datos en Hoja 5 - Agua de Pozo:', error);
        });

    // Guardar en la Hoja 5 - Entrada Mensual de Agua Dulce de Fuentes Superficiales
    this.googleSheetsService.addDataToSheet(rangoAguaSuperficial, valoresAguaSuperficial)
        .then((response: any) => {
            console.log('Datos guardados exitosamente en Hoja 5 - Agua Superficial:', response);
        })
        .catch((error: any) => {
            console.error('Error al guardar los datos en Hoja 5 - Agua Superficial:', error);
        });
  }
  private guardarDatosSalidaAgua() {
    // Primer tabla: Salida Mensual de Agua Descargada
    const rangoSalidaAguaDescargada = '5. USO DIRECTO DE AGUA!A40:N40'; // Rango para la tabla de agua descargada
    const valoresSalidaAguaDescargada = [
        [
            this.salidaAguaDescargadaProceso, // A6
            0,  // B6 (puedes ajustar este valor según sea necesario)
            this.salidaAguaDescargadaEnero, // C6
            this.salidaAguaDescargadaFebrero, // D6
            this.salidaAguaDescargadaMarzo, // E6
            this.salidaAguaDescargadaAbril, // F6
            this.salidaAguaDescargadaMayo, // G6
            this.salidaAguaDescargadaJunio, // H6
            this.salidaAguaDescargadaJulio, // I6
            this.salidaAguaDescargadaAgosto, // J6
            this.salidaAguaDescargadaSeptiembre, // K6
            this.salidaAguaDescargadaOctubre, // L6
            this.salidaAguaDescargadaNoviembre, // M6
            this.salidaAguaDescargadaDiciembre // N6
        ]
    ];

    // Tercera tabla: Salida Mensual de Agua Dulce de Fuentes Superficiales
    const rangoSalidaAguaSuperficial = '5. USO DIRECTO DE AGUA!A54:N54'; // Rango para la tabla de agua superficial
    const valoresSalidaAguaSuperficial = [
        [
            this.salidaAguaConsumidaProceso, // A26
            0,  // B26 (ajustar según sea necesario)
            this.salidaAguaConsumidaEnero, // C26
            this.salidaAguaConsumidaFebrero, // D26
            this.salidaAguaConsumidaMarzo, // E26
            this.salidaAguaConsumidaAbril, // F26
            this.salidaAguaConsumidaMayo, // G26
            this.salidaAguaConsumidaJunio, // H26
            this.salidaAguaConsumidaJulio, // I26
            this.salidaAguaConsumidaAgosto, // J26
            this.salidaAguaConsumidaSeptiembre, // K26
            this.salidaAguaConsumidaOctubre, // L26
            this.salidaAguaConsumidaNoviembre, // M26
            this.salidaAguaConsumidaDiciembre // N26
        ]
    ];
    // Segunda tabla: Salida Mensual de Agua Infiltrada
    const rangoSalidaAguaInfiltrada = '5. USO DIRECTO DE AGUA!A47:N47'; // Rango para la tabla de agua infiltrada
    const valoresSalidaAguaInfiltrada = [
        [
            this.salidaAguaInfiltradaProceso, // A16
            0,  // B16 (ajustar según sea necesario)
            this.salidaAguaInfiltradaEnero, // C16
            this.salidaAguaInfiltradaFebrero, // D16
            this.salidaAguaInfiltradaMarzo, // E16
            this.salidaAguaInfiltradaAbril, // F16
            this.salidaAguaInfiltradaMayo, // G16
            this.salidaAguaInfiltradaJunio, // H16
            this.salidaAguaInfiltradaJulio, // I16
            this.salidaAguaInfiltradaAgosto, // J16
            this.salidaAguaInfiltradaSeptiembre, // K16
            this.salidaAguaInfiltradaOctubre, // L16
            this.salidaAguaInfiltradaNoviembre, // M16
            this.salidaAguaInfiltradaDiciembre // N16
        ]
    ];

    // Guardar en la Hoja 5 - Salida Mensual de Agua Descargada
    this.googleSheetsService.addDataToSheet(rangoSalidaAguaDescargada, valoresSalidaAguaDescargada)
        .then((response: any) => {
            console.log('Datos guardados exitosamente en Hoja 5 - Agua Descargada:', response);
        })
        .catch((error: any) => {
            console.error('Error al guardar los datos en Hoja 5 - Agua Descargada:', error);
        });

    // Guardar en la Hoja 5 - Salida Mensual de Agua Infiltrada
    this.googleSheetsService.addDataToSheet(rangoSalidaAguaInfiltrada, valoresSalidaAguaInfiltrada)
        .then((response: any) => {
            console.log('Datos guardados exitosamente en Hoja 5 - Agua Infiltrada:', response);
        })
        .catch((error: any) => {
            console.error('Error al guardar los datos en Hoja 5 - Agua Infiltrada:', error);
        });

    // Guardar en la Hoja 5 - Salida Mensual de Agua Dulce de Fuentes Superficiales
    this.googleSheetsService.addDataToSheet(rangoSalidaAguaSuperficial, valoresSalidaAguaSuperficial)
        .then((response: any) => {
            console.log('Datos guardados exitosamente en Hoja 5 - Agua Superficial:', response);
        })
        .catch((error: any) => {
            console.error('Error al guardar los datos en Hoja 5 - Agua Superficial:', error);
        });
}





  

  // Método para reiniciar todos los campos del formulario
  reiniciarFormulario() {
    this.medicionHuella = '';
    this.anioMedicion = '';
    this.unidadFuncional = '';
    this.nombreEmpresa = '';
    this.instalacionMedida = '';
    this.ubicacionMedidaR = '';
    this.ubicacionMedidaC = '';
    this.tipoProducto = '';
    this.nombreResponsable = '';
    this.cargoResponsable = '';
    this.correoResponsable = '';
    this.telefonoResponsable = '';
    this.producto = '';
    this.descripcion = '';
    this.unidad = '';
    this.enero = 0;
    this.febrero = 0;
    this.marzo = 0;
    this.abril = 0;
    this.mayo = 0;
    this.junio = 0;
    this.julio = 0;
    this.agosto = 0;
    this.septiembre = 0;
    this.octubre = 0;
    this.noviembre = 0;
    this.diciembre = 0;
    
  }

  // Método para cálculos adicionales si es necesario
  calcular() {
    // Primero, autentica al usuario
    this.googleSheetsService.handleAuthClick()
      .then(() => {
        // Si la autenticación es exitosa, guarda en Google Sheets
        this.guardarDatos();
      })
      .catch((error) => {
        console.error('Error durante la autenticación:', error);
      });
  }
}
