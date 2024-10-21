import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GoogleSheetsService } from '../services/google-sheets.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calcular-huella',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calcular-huella.component.html',
  styleUrls: ['./calcular-huella.component.css']
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

  // Datos para la producción mensual
  produccionMensual = {
    producto: '',
    descripcion: '',
    unidad: '',
    meses: {
      enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0,
      julio: 0, agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0
    },
    total: 0,
    promedio: 0
  };

  // Datos para el agua potable mensual
  aguaPotableMensual = this.inicializarAguaMensual();

  // Entrada Mensual de Agua de Pozo
  aguaPozoMensual = this.inicializarAguaMensual();

  // Entrada Mensual de Agua Dulce de Fuentes Superficiales
  aguaSuperficialMensual = this.inicializarAguaMensual();

  constructor(private googleSheetsService: GoogleSheetsService) { }

  nextStep() {
    if (this.currentStep < 5) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  guardarEnGoogleSheets() {
    const rango = '3. INFORMACIÓN!B5:B18';
    const valores = [
      [this.medicionHuella],
      [this.anioMedicion],
      [this.unidadFuncional],
      [],
      [this.nombreEmpresa],
      [this.instalacionMedida],
      [this.ubicacionMedidaR],
      [this.ubicacionMedidaC],
      [this.tipoProducto],
      [],
      [this.nombreResponsable],
      [this.cargoResponsable],
      [this.correoResponsable],
      [this.telefonoResponsable]
    ];

    this.googleSheetsService.addDataToSheet(rango, valores)
      .then((response: any) => {
        console.log('Datos guardados exitosamente:', response);
      })
      .catch((error: any) => {
        console.error('Error al guardar los datos:', error);
      });
  }

  calcular() {
    this.googleSheetsService.handleAuthClick().then(() => {
      this.guardarEnGoogleSheets();
    }).catch((error) => {
      console.error('Error during authentication:', error);
    });
  }

  calcularProduccionMensual() {
    const valores = Object.values(this.produccionMensual.meses);
    this.produccionMensual.total = valores.reduce((a, b) => a + b, 0);
    this.produccionMensual.promedio = this.produccionMensual.total / valores.length;
  }

  inicializarAguaMensual() {
    return {
      uso: '',
      unidad: 'cm3',
      meses: {
        enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0, junio: 0,
        julio: 0, agosto: 0, septiembre: 0, octubre: 0, noviembre: 0, diciembre: 0
      },
      total: 0,
      promedio: 0
    };
  }

  calcularTotalesYPromedios(entrada: AguaMensual) {
    let total = 0;
    let meses = Object.values(entrada.meses) as number[];
    meses.forEach(mes => total += mes);

    entrada.total = total;
    entrada.promedio = total / meses.length;
  }

  aguaDescargada = {
    proceso: '',
    unidad: '',
    meses: {
      enero: 0,
      febrero: 0,
      marzo: 0,
      abril: 0,
      mayo: 0,
      junio: 0,
      julio: 0,
      agosto: 0,
      septiembre: 0,
      octubre: 0,
      noviembre: 0,
      diciembre: 0
    },
    get total() {
      return Object.values(this.meses).reduce((a, b) => a + b, 0);
    },
    get promedio() {
      const totalMeses = Object.keys(this.meses).length;
      return totalMeses > 0 ? this.total / totalMeses : 0;
    }
  };

  // Propiedades para Salida Mensual de Agua Infiltrada
  aguaInfiltrada = {
    proceso: '',
    unidad: '',
    meses: {
      enero: 0,
      febrero: 0,
      marzo: 0,
      abril: 0,
      mayo: 0,
      junio: 0,
      julio: 0,
      agosto: 0,
      septiembre: 0,
      octubre: 0,
      noviembre: 0,
      diciembre: 0
    },
    get total() {
      return Object.values(this.meses).reduce((a, b) => a + b, 0);
    },
    get promedio() {
      const totalMeses = Object.keys(this.meses).length;
      return totalMeses > 0 ? this.total / totalMeses : 0;
    }
  };

  // Propiedades para Salida Mensual de Agua Consumida
  aguaConsumida = {
    proceso: '',
    unidad: '',
    meses: {
      enero: 0,
      febrero: 0,
      marzo: 0,
      abril: 0,
      mayo: 0,
      junio: 0,
      julio: 0,
      agosto: 0,
      septiembre: 0,
      octubre: 0,
      noviembre: 0,
      diciembre: 0
    },
    get total() {
      return Object.values(this.meses).reduce((a, b) => a + b, 0);
    },
    get promedio() {
      const totalMeses = Object.keys(this.meses).length;
      return totalMeses > 0 ? this.total / totalMeses : 0;
    }
  };
}

interface AguaMensual {
  meses: {
    enero: number;
    febrero: number;
    marzo: number;
    abril: number;
    mayo: number;
    junio: number;
    julio: number;
    agosto: number;
    septiembre: number;
    octubre: number;
    noviembre: number;
    diciembre: number;
  };
  total: number;
  promedio: number;
}
