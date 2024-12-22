import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DatosMedicionComponent } from '../datos-medicion/datos-medicion.component';
import { ProduccionComponent } from '../produccion/produccion.component';
import { max } from 'rxjs';

interface EntradaAgua {
  categoria: string;
  fuente: string;
  total: string;
  promedio: string;
  porcentaje: number;
}

interface SalidaAgua {
  nombre: string;
  proceso: string;
  total: number;
  promedio: number;
  toxixidadHumana: number;
  toxixidadHumanaProcentaje: number;
  ecotoxixidad: number;
  ecotoxixidadPorcentaje: number;
  eutrofizacion: number;
  eutrofizacionPorcentage: number;
  enfermedadesPorToxicidad: number;
  enfermedadesPorToxicidadPorcentaje: number;
  ecosistemasAcuaticosAfectadosPorEcotoxicidad: number;
  ecosistemasAcuaticosAfectadosPorEcotoxicidadPorcentaje: number;
  ecosistemasAcuaticosAfectadosPorEutrofizacion: number;
  ecosistemasAcuaticosAfectadosPorEutrofizacionPorcentaje: number;
  porcentaje: number;
  availableWaterRemainingAwarePorcentaje: number;
  potencialesImpactosSaludPorcentaje: number;
  disminucionBiodiversidadTerrestreTotal: number;
}

interface Contaminante {
  nombre: string;
  info?: string;
  anreviacion: string;
  unidad: string;
  datosMensuales: DatosMensuales;
  total: number;
  min: number;
  max: number;
  promedio: number;
  toxixidadHumana: number;
  ecotoxixidad: number;
  eutrofizacion: number;
  toxixidadHumanaFinal: number;
  ecotoxixidadFinal: number;
  eutrofizacionFinal: number;
  enfermedadesPorToxicidad: number;
}

type DatosMensuales = {
  [mes: string]: number; // Permitir indexación dinámica
};

@Component({
  selector: 'app-calcular-huella',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatosMedicionComponent,
    ProduccionComponent,
  ],
  templateUrl: './calcular-huella.component.html',
  styleUrls: ['./calcular-huella.component.css'],
})
export class CalcularHuellaComponent {
  currentStep: number = 5;
  isLoggedIn: boolean = false;

  meses = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];

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
  unidad: string = 'ton';
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
  produccionTotal: number = 0;
  produccionPromedio: number = 0;

  // Datos de entrada de agua potable mensual
  aguaPotableMensualTotal: number = 0;
  aguaPotableMensualPromedio: number = 0;

  // Datos de entrada de agua de pozo mensual
  aguaPozoTotal: number = 0;
  aguaPozoPromedio: number = 0;

  // Datos de entrada de agua dulce de fuentes superficiales mensual
  aguaSuperficialTotal: number = 0;
  aguaSuperficialPromedio: number = 0;

  // Datos de salida de agua descargada mensual
  salidaAguaDescargadaTotal: number = 0;
  salidaAguaDescargadaPromedio: number = 0;

  //dATOS DER SALIDA DE AGUA INFILTRADA MENSUAL
  salidaAguaInfiltradaTotal: number = 0;
  salidaAguaInfiltradaPromedio: number = 0;

  // Datos de salida de agua consumida mensual

  salidaAguaConsumidaTotal: number = 0;
  salidaAguaConsumidaPromedio: number = 0;

  datosMensuales: { [key: string]: number } = {
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
    diciembre: 0,
  };

  toxixidadHumana: { [key: string]: number } = {
    As: 0.027669,
    Cd: 0.000429,
    Cr: 0.005332,
    Cu: 0.000001,
    Hg: 0.00012,
    Ni: 0.000038,
    Pb: 0.0,
    Zn: 0.0,
    C6OHCL5: 0.000021,
  };

  ecotoxixidad: { [key: string]: number } = {
    As: 40400.0,
    Cd: 9710.0,
    Cr: 53000.0,
    Cu: 55200.0,
    Hg: 22100.0,
    Ni: 14900.0,
    Pb: 375.0,
    Zn: 38600.0,
    C6OHCL5: 78700.0,
  };

  eutrofizacion: { [key: string]: number } = {
    FOSFORO: 1.0,
    FOSFATO: 0.326797,
    DQO: 0.00719,
  };

  toxixidadHumanaFinal: { [key: string]: number } = {
    As: 0.077954,
    Cd: 0.001171,
    Cr: 0.061212,
    Cu: 0.000002,
    Hg: 0.00138,
    Ni: 0.00044,
    Pb: 0.000004,
    Zn: 0.0,
    C6OHCL5: 0.000238,
  };

  ecotoxixidadFinal: { [key: string]: number } = {
    As: 22.22,
    Cd: 5.3405,
    Cr: 29.15,
    Cu: 30.36,
    Hg: 12.155,
    Ni: 8.195,
    Pb: 0.20625,
    Zn: 21.23,
    C6OHCL5: 43.285,
  };

  eutrofizacionFinal: { [key: string]: number } = {
    FOSFORO: 34.958282,
    FOSFATO: 11.424275,
    DQO: 0.251334,
  };

  contaminantes: Array<Contaminante> = [
    {
      nombre: 'Nitrógeno Total',
      anreviacion: 'N',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      toxixidadHumana: 0,
      ecotoxixidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxixidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'Nitrógeno Total Kjeldahl',
      anreviacion: 'NTK',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      toxixidadHumana: 0,
      ecotoxixidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxixidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'Fósforo Total',
      anreviacion: 'P',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      toxixidadHumana: 0,
      ecotoxixidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxixidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'Fosfato',
      anreviacion: 'PO4',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      toxixidadHumana: 0,
      ecotoxixidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxixidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'DQO',
      info: 'DEMANDA QUÍMICA DE Oxígeno',
      anreviacion: 'DQO',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      toxixidadHumana: 0,
      ecotoxixidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxixidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'DBO',
      info: 'Demanda Biológica De Oxígeno',
      anreviacion: 'DBO',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      toxixidadHumana: 0,
      ecotoxixidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxixidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'Arsénico',
      anreviacion: 'As',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      toxixidadHumana: 0,
      ecotoxixidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxixidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'Cadmio',
      anreviacion: 'Cd',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      toxixidadHumana: 0,
      ecotoxixidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxixidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'Cromo',
      anreviacion: 'Cr',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      toxixidadHumana: 0,
      ecotoxixidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxixidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'Cobre',
      anreviacion: 'Cu',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      toxixidadHumana: 0,
      ecotoxixidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxixidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'Mercurio',
      anreviacion: 'Hg',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      toxixidadHumana: 0,
      ecotoxixidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxixidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'Niquel',
      anreviacion: 'Ni',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      toxixidadHumana: 0,
      ecotoxixidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxixidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'Plomo',
      anreviacion: 'Pb',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      toxixidadHumana: 0,
      ecotoxixidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxixidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'Zinc',
      anreviacion: 'Zn',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      toxixidadHumana: 0,
      ecotoxixidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxixidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'Pentaclorofenol',
      anreviacion: 'C6OHCL5',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      toxixidadHumana: 0,
      ecotoxixidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxixidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
  ];

  fuentesDeAgua = [
    {
      nombre: 'Agua Potable',
      uso: 'Sistemas Sanitarios',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      promedio: 0,
    },
    {
      nombre: 'Agua de Pozo',
      uso: 'Producción',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      promedio: 0,
    },

    {
      nombre: 'Agua Dulce de Fuentes Superficiales',
      uso: 'Producción',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      promedio: 0,
    },
  ];

  salidasDeAgua = [
    {
      nombre: 'Agua Descargada',
      proceso: 'Producción',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      promedio: 0,
      consumida: false,
      contaminantes: this.cloneContaminantes(),
      toxixidadHumana: 0,
      ecotoxixidad: 0,
      eutrofizacion: 0,
      contaminantesTotales: 0,
      enfermedadesPorToxicidad: 0,
      ecosistemasAcuaticosAfectadosPorEcotoxicidad: 0,
      ecosistemasAcuaticosAfectadosPorEutrofizacion: 0,
      availableWaterRemainingAware: 0,
      potencialesImpactosSalud: 0,
      disminucionBiodiversidadTerrestre: 0,
    },
    {
      nombre: 'Agua Infiltrada',
      proceso: 'Producción',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      promedio: 0,
      consumida: false,
      contaminantes: this.cloneContaminantes(),
      toxixidadHumana: 0,
      ecotoxixidad: 0,
      eutrofizacion: 0,
      contaminantesTotales: 0,
      enfermedadesPorToxicidad: 0,
      ecosistemasAcuaticosAfectadosPorEcotoxicidad: 0,
      ecosistemasAcuaticosAfectadosPorEutrofizacion: 0,
      availableWaterRemainingAware: 0,
      potencialesImpactosSalud: 0,
      disminucionBiodiversidadTerrestre: 0,
    },
    {
      nombre: 'Agua Consumida',
      proceso: 'Producción',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      promedio: 0,
      consumida: true,
      contaminantes: [],
      toxixidadHumana: 0,
      ecotoxixidad: 0,
      eutrofizacion: 0,
      contaminantesTotales: 0,
      enfermedadesPorToxicidad: 0,
      ecosistemasAcuaticosAfectadosPorEcotoxicidad: 0,
      ecosistemasAcuaticosAfectadosPorEutrofizacion: 0,
      availableWaterRemainingAware: 0,
      potencialesImpactosSalud: 0,
      disminucionBiodiversidadTerrestre: 0,
    },
  ];

  cloneContaminantes() {
    return this.contaminantes.map((contaminante) => ({
      ...contaminante,
      datosMensuales: { ...contaminante.datosMensuales },
    }));
  }

  // Inyectar el servicio de Google Sheets en el constructor
  constructor(private router: Router) {
    // this.calcularTotalesProduccion();
    // this.calculaEntradaAgua();
    // this.calculaSalidasAgua();
    // this.calculaContaminantes();
  }

  // Método para avanzar al siguiente paso
  nextStep() {
    this.currentStep++;
  }

  // Método para retroceder al paso anterior
  previousStep() {
    this.currentStep--;
  }

  actualizarDatoMensualFuente(nombreFuente: string, mes: string, event: Event) {
    const fuente = this.fuentesDeAgua.find((f) => f.nombre === nombreFuente);

    if (fuente) {
      const valor = parseFloat((event.target as HTMLInputElement).value);
      fuente.datosMensuales[mes] = valor || 0;
      this.calculaEntradaAgua();
    }
  }

  actualizarDatoMensualSalida(nombreSalida: string, mes: string, event: Event) {
    const salida = this.salidasDeAgua.find((s) => s.nombre === nombreSalida);
    if (salida) {
      const valor = parseFloat((event.target as HTMLInputElement).value);
      salida.datosMensuales[mes] = valor;
      this.calculaSalidasAgua();
    }
  }

  actualizarDatoContaminante(
    nombreSalida: string,
    nombreContaminante: string,
    mes: string,
    event: Event
  ) {
    const salida = this.salidasDeAgua.find((s) => s.nombre === nombreSalida);
    if (salida) {
      const contaminante = salida.contaminantes.find(
        (c) => c.nombre === nombreContaminante
      );
      if (contaminante) {
        const valor = parseFloat((event.target as HTMLInputElement).value);
        contaminante.datosMensuales[mes] = valor;
        this.calculaContaminantes();
      }
    }
  }

  // Método para cálculos adicionales si es necesario
  calcular() {
    this.calculaEntradaAgua();
    this.calculaSalidasAgua();
    this.calculaContaminantes();

    let totales: { [key: string]: number } = {
      toxixidadHumana: 0,
      ecotoxixidad: 0,
      eutrofizacion: 0,
      enfermedadesPorToxicidad: 0,
      ecosistemasAcuaticosAfectadosPorEcotoxicidad: 0,
      ecosistemasAcuaticosAfectadosPorEutrofizacion: 0,
    };
    this.salidasDeAgua.forEach((salida) => {
      salida.contaminantes.forEach((contaminante) => {
        contaminante.toxixidadHumana =
          (this.toxixidadHumana[contaminante.anreviacion] *
            (salida.total * contaminante.promedio)) /
          1000;
        contaminante.ecotoxixidad =
          (this.ecotoxixidad[contaminante.anreviacion] *
            (salida.total * contaminante.promedio)) /
          1000;
        contaminante.eutrofizacion =
          (this.eutrofizacion[contaminante.anreviacion] *
            (salida.total * contaminante.promedio)) /
          1000;

        contaminante.enfermedadesPorToxicidad =
          (this.toxixidadHumanaFinal[contaminante.anreviacion] *
            (salida.total * contaminante.promedio)) /
          1000;

        salida.toxixidadHumana += parseFloat(
          contaminante.toxixidadHumana.toFixed(6)
        );
        salida.ecotoxixidad += parseFloat(contaminante.ecotoxixidad.toFixed(6));
        salida.eutrofizacion += parseFloat(
          contaminante.eutrofizacion.toFixed(6)
        );
        salida.enfermedadesPorToxicidad += parseFloat(
          contaminante.enfermedadesPorToxicidad.toFixed(6)
        );
        salida.ecosistemasAcuaticosAfectadosPorEcotoxicidad += parseFloat(
          (contaminante.ecotoxixidad * 0.00055).toFixed(6)
        );
        salida.ecosistemasAcuaticosAfectadosPorEutrofizacion += parseFloat(
          (contaminante.eutrofizacion * 34.958282).toFixed(6)
        );
        salida.availableWaterRemainingAware += parseFloat(
          (salida.total * 80.095291).toFixed(6)
        );
        salida.potencialesImpactosSalud = parseFloat(
          (salida.total * 0.000017256729214146).toFixed(6)
        );
        salida.disminucionBiodiversidadTerrestre = parseFloat(
          (salida.total * 0.266051).toFixed(6)
        );

        totales['toxixidadHumana'] += salida.toxixidadHumana;
        totales['ecotoxixidad'] += salida.ecotoxixidad;
        totales['eutrofizacion'] += salida.eutrofizacion;
        totales['enfermedadesPorToxicidad'] += salida.enfermedadesPorToxicidad;
        totales['ecosistemasAcuaticosAfectadosPorEcotoxicidad'] +=
          salida.ecosistemasAcuaticosAfectadosPorEcotoxicidad;
        totales['ecosistemasAcuaticosAfectadosPorEutrofizacion'] +=
          salida.ecosistemasAcuaticosAfectadosPorEutrofizacion;

        /* contaminantesTotales[`${contaminante.anreviacion}Total`] += Number(
          ((salida.total * contaminante.promedio) / 1000).toFixed(6)
        ); */
      });
    });

    /*
    const totalesPorcentaje = {
      entradaAguaPotableTotal: 100,
      entradaAguaPozoTotal: 100,
      entradaAguaSuperficialTotal: 100,
      salidaAguaDescargada: 100,
      salidaAguaInfiltrada: 100,
      aguaDulceConsumida: 100,

      nitrogenoTotal: 0,
      nitrgenoTotalKjeldahl: (
        (((this.salidaAguaDescargadaTotal * this.nitrogenoKjeldahl1Promedio) /
          1000 +
          (this.salidaAguaInfiltradaTotal * this.nitrogenoKjeldahl2Promedio) /
            1000) /
          totales.nitrgenoTotalKjeldahl) *
        100
      ).toFixed(1),

      fosforoTotalTotal: (
        ((this.salidaAguaDescargadaTotal * this.fosforoTotal1Promedio) /
          1000 /
          totales.fosforoTotalTotal) *
        100
      ).toFixed(1),

      fosfatoTotal: isNaN(
        (((this.salidaAguaDescargadaTotal * this.fosfato1Promedio) / 1000 +
          (this.salidaAguaInfiltradaTotal * this.fosfato2Promedio) / 1000 +
          (this.salidaAguaConsumidaTotal * this.fosfato3Promedio) / 1000) /
          totales.fosfatoTotal) *
          100
      )
        ? 0
        : (
            (((this.salidaAguaDescargadaTotal * this.fosfato1Promedio) / 1000 +
              (this.salidaAguaInfiltradaTotal * this.fosfato2Promedio) / 1000 +
              (this.salidaAguaConsumidaTotal * this.fosfato3Promedio) / 1000) /
              totales.fosfatoTotal) *
            100
          ).toFixed(1),
      demandaBioOxgTotal: (
        ((this.salidaAguaDescargadaTotal * this.dbo1Promedio) /
          1000 /
          totales.demandaBioOxgTotal) *
        100
      ).toFixed(1),

      arsenicoTotal: (
        (((this.salidaAguaDescargadaTotal * this.arsenico1Promedio) / 1000 +
          (this.salidaAguaInfiltradaTotal * this.arsenico2Promedio) / 1000) /
          totales.arsenicoTotal) *
        100
      ).toFixed(1),

      cadminioTotal: (
        (((this.salidaAguaDescargadaTotal * this.cadmio1Promedio) / 1000 +
          (this.salidaAguaInfiltradaTotal * this.cadmio2Promedio) / 1000) /
          totales.cadminioTotal) *
        100
      ).toFixed(1),

      cromoTotal: (
        (((this.salidaAguaDescargadaTotal * this.cromo1Promedio) / 1000 +
          (this.salidaAguaInfiltradaTotal * this.cromo2Promedio) / 1000) /
          totales.cromoTotal) *
        100
      ).toFixed(1),

      cobreTotal: (
        (((this.salidaAguaDescargadaTotal * this.cobre1Promedio) / 1000 +
          (this.salidaAguaInfiltradaTotal * this.cobre2Promedio) / 1000 +
          (this.salidaAguaConsumidaTotal * this.cobre3Promedio) / 1000) /
          totales.cobreTotal) *
        100
      ).toFixed(1),

      mercurioTotal: (
        (((this.salidaAguaDescargadaTotal * this.mercurio1Promedio) / 1000 +
          (this.salidaAguaInfiltradaTotal * this.mercurio2Promedio) / 1000) /
          totales.mercurioTotal) *
        100
      ).toFixed(1),

      niquelTotal: (
        (((this.salidaAguaDescargadaTotal * this.niquel1Promedio) / 1000 +
          (this.salidaAguaInfiltradaTotal * this.niquel2Promedio) / 1000) /
          totales.niquelTotal) *
        100
      ).toFixed(1),

      plomoTotal: (
        (((this.salidaAguaDescargadaTotal * this.plomo1Promedio) / 1000 +
          (this.salidaAguaInfiltradaTotal * this.plomo2Promedio) / 1000) /
          totales.plomoTotal) *
        100
      ).toFixed(1),

      zincTotal: (
        (((this.salidaAguaDescargadaTotal * this.zinc1Promedio) / 1000 +
          (this.salidaAguaInfiltradaTotal * this.zinc2Promedio) / 1000) /
          totales.zincTotal) *
        100
      ).toFixed(1),

      pentaclorofenolTotal: (
        (((this.salidaAguaDescargadaTotal * this.pentaclorofenol1Promedio) /
          1000 +
          (this.salidaAguaInfiltradaTotal * this.pentaclorofenol2Promedio) /
            1000) /
          totales.pentaclorofenolTotal) *
        100
      ).toFixed(1),

      availableWaterRemainingAwareTotal: (
        ((this.salidaAguaConsumidaTotal * 80.095291) /
          totales.availableWaterRemainingAwareTotal) *
        100
      ).toFixed(1),

      toxixidadHumanaTotal: (
        ((toxixidadHumana1 + toxixidadHumana2) / totales.toxixidadHumanaTotal) *
        100
      ).toFixed(1),

      ecotoxicidadTotal: (
        ((ecotoxixidad1 + ecotoxixidad2) / totales.ecotoxixidadTotal) *
        100
      ).toFixed(1),

      eutrofizacionTotal: (
        ((eutrofizacion1 + eutrofizacion2) / totales.eutrofizacionTotal) *
        100
      ).toFixed(1),

      potencialesImpactosSaludTotal: (
        ((this.salidaAguaConsumidaTotal * 0.000017256729214146) /
          totales.potencialesImpactosSaludTotal) *
        100
      ).toFixed(1),

      enfermedadesPorToxicidadTotal: (
        ((enfermedadesPorToxicidad1 + enfermedadesPorToxicidad2) /
          totales.enfermedadesPorToxicidadTotal) *
        100
      ).toFixed(1),

      disminucionBiodiversidadTerrestreTotal: (
        ((this.salidaAguaConsumidaTotal * 0.266051) /
          totales.disminucionBiodiversidadTerrestreTotal) *
        100
      ).toFixed(1),

      ecosistemasAcuaticosAfectadosPorEcotoxicidadTotal: (
        ((ecosistemasAcuaticosAfectadosPorEcotoxicidad1 +
          ecosistemasAcuaticosAfectadosPorEcotoxicidad2) /
          totales.ecosistemasAcuaticosAfectadosPorEcotoxicidadTotal) *
        100
      ).toFixed(1),

      ecosistemasAcuaticosAfectadosPorEutrofizacionTotal: (
        ((ecosistemasAcuaticosAfectadosPorEutrofizacion1 +
          ecosistemasAcuaticosAfectadosPorEutrofizacion2) /
          totales.ecosistemasAcuaticosAfectadosPorEutrofizacionTotal) *
        100
      ).toFixed(1),
    }; */

    const entradasAgua: EntradaAgua[] = [];
    this.fuentesDeAgua.forEach((fuente) => {
      entradasAgua.push({
        categoria: 'ENTRADA AGUA POTABLE',
        fuente: fuente.nombre,
        total: fuente.total.toFixed(6),
        promedio: fuente.promedio.toFixed(6),
        porcentaje:
          (this.aguaPotableMensualTotal / this.aguaPotableMensualTotal) * 100,
      });
    });

    const salidasAgua: SalidaAgua[] = [];
    this.salidasDeAgua.forEach((salida) => {
      const estaSalida: SalidaAgua = {
        nombre: salida.nombre,
        proceso: salida.proceso,
        total: parseFloat(salida.total.toFixed(6)),
        promedio: parseFloat(salida.promedio.toFixed(6)),
        toxixidadHumana: parseFloat(salida.toxixidadHumana.toFixed(6)),
        toxixidadHumanaProcentaje: parseFloat(
          ((salida.toxixidadHumana / totales['toxixidadHumana']) * 100).toFixed(
            1
          )
        ),
        ecotoxixidad: parseFloat(salida.ecotoxixidad.toFixed(6)),
        ecotoxixidadPorcentaje: parseFloat(
          ((salida.ecotoxixidad / totales['ecotoxixidad']) * 100).toFixed(1)
        ),
        eutrofizacion: parseFloat(salida.eutrofizacion.toFixed(6)),
        eutrofizacionPorcentage: parseFloat(
          ((salida.eutrofizacion / totales['eutrofizacion']) * 100).toFixed(1)
        ),
        enfermedadesPorToxicidad: parseFloat(
          salida.enfermedadesPorToxicidad.toFixed(6)
        ),
        enfermedadesPorToxicidadPorcentaje: parseFloat(
          (
            (salida.enfermedadesPorToxicidad /
              totales['enfermedadesPorToxicidad']) *
            100
          ).toFixed(1)
        ),
        ecosistemasAcuaticosAfectadosPorEcotoxicidad: parseFloat(
          salida.ecosistemasAcuaticosAfectadosPorEcotoxicidad.toFixed(6)
        ),
        ecosistemasAcuaticosAfectadosPorEcotoxicidadPorcentaje: parseFloat(
          (
            (salida.ecosistemasAcuaticosAfectadosPorEcotoxicidad /
              totales['ecosistemasAcuaticosAfectadosPorEcotoxicidad']) *
            100
          ).toFixed(1)
        ),
        ecosistemasAcuaticosAfectadosPorEutrofizacion: parseFloat(
          salida.ecosistemasAcuaticosAfectadosPorEutrofizacion.toFixed(6)
        ),
        ecosistemasAcuaticosAfectadosPorEutrofizacionPorcentaje: parseFloat(
          (
            (salida.ecosistemasAcuaticosAfectadosPorEutrofizacion /
              totales['ecosistemasAcuaticosAfectadosPorEutrofizacion']) *
            100
          ).toFixed(1)
        ),
        porcentaje:
          (this.salidaAguaDescargadaTotal / this.salidaAguaDescargadaTotal) *
          100,
        availableWaterRemainingAwarePorcentaje: 0,
        potencialesImpactosSaludPorcentaje: 0,
        disminucionBiodiversidadTerrestreTotal: 0,
        /* calidad: [
          {
            parametro: 'Nitrógeno Total',
            abreviacion: 'N',
            unidad: '[mg/L]',
            min: this.nitrogeno1Min.toFixed(6),
            max: this.nitrogeno1Max.toFixed(6),
            promedio: this.nitrogeno1Promedio.toFixed(6),
            emisionContaminantes: (
              (this.salidaAguaDescargadaTotal * this.nitrogeno1Promedio) /
              1000
            ).toFixed(6),
            porcentaje: totales.nitrogenoTatal
              ? (
                  ((this.salidaAguaDescargadaTotal * this.nitrogeno1Promedio) /
                    1000 /
                    totales.nitrogenoTatal) *
                  100
                ).toFixed(1)
              : '0.0',
          },
          {
            parametro: 'Nitrógeno Total Kjeldahl',
            abreviacion: 'NTK',
            unidad: '[mg/L]',
            min: this.nitrogenoKjeldahl1Min.toFixed(6),
            max: this.nitrogenoKjeldahl1Max.toFixed(6),
            promedio: this.nitrogenoKjeldahl1Promedio.toFixed(6),
            emisionContaminantes: (
              (this.salidaAguaDescargadaTotal *
                this.nitrogenoKjeldahl1Promedio) /
              1000
            ).toFixed(6),
            porcentaje: totales.nitrgenoTotalKjeldahl
              ? (
                  ((this.salidaAguaDescargadaTotal *
                    this.nitrogenoKjeldahl1Promedio) /
                    1000 /
                    totales.nitrgenoTotalKjeldahl) *
                  100
                ).toFixed(1)
              : '0.0',
          },
          {
            parametro: 'Fósforo Total',
            abreviacion: 'P',
            unidad: '[mg/L]',
            min: this.fosforoTotal1Min.toFixed(6),
            max: this.fosforoTotal1Max.toFixed(6),
            promedio: this.fosforoTotal1Promedio.toFixed(6),
            emisionContaminantes: (
              (this.salidaAguaDescargadaTotal * this.fosforoTotal1Promedio) /
              1000
            ).toFixed(6),
            porcentaje: totales.fosforoTotalTotal
              ? (
                  ((this.salidaAguaDescargadaTotal *
                    this.fosforoTotal1Promedio) /
                    1000 /
                    totales.fosforoTotalTotal) *
                  100
                ).toFixed(1)
              : '0.0',
          },
          {
            parametro: 'Fosfato',
            abreviacion: 'PO4',
            unidad: '[mg/L]',
            min: this.fosfato1Min.toFixed(6),
            max: this.fosfato1Max.toFixed(6),
            promedio: this.fosfato1Promedio.toFixed(6),
            emisionContaminantes: (
              (this.salidaAguaDescargadaTotal * this.fosfato1Promedio) /
              1000
            ).toFixed(6),
            porcentaje: totales.fosfatoTotal
              ? (
                  ((this.salidaAguaDescargadaTotal * this.fosfato1Promedio) /
                    1000 /
                    totales.fosfatoTotal) *
                  100
                ).toFixed(1)
              : '0.0',
          },
          {
            parametro: 'Demanda Química De Oxígeno',
            abreviacion: 'DQO',
            unidad: '[mg/L]',
            min: this.dqo1Min.toFixed(6),
            max: this.dqo1Max.toFixed(6),
            promedio: this.dqo1Promedio.toFixed(6),
            emisionContaminantes: (
              (this.salidaAguaDescargadaTotal * this.dqo1Promedio) /
              1000
            ).toFixed(6),
            porcentaje: totales.demandaBioOxgTotal
              ? (
                  ((this.salidaAguaDescargadaTotal * this.dqo1Promedio) /
                    1000 /
                    totales.demandaBioOxgTotal) *
                  100
                ).toFixed(1)
              : '0.0',
          },
          {
            parametro: 'Demanda Biológica De Oxígeno',
            abreviacion: 'DBO',
            unidad: '[mg/L]',
            min: this.dbo1Min.toFixed(6),
            max: this.dbo1Max.toFixed(6),
            promedio: this.dbo1Promedio.toFixed(6),
            emisionContaminantes: (
              (this.salidaAguaDescargadaTotal * this.dbo1Promedio) /
              1000
            ).toFixed(6),
            porcentaje: totales.demandaBioOxgTotal
              ? (
                  ((this.salidaAguaDescargadaTotal * this.dbo1Promedio) /
                    1000 /
                    totales.demandaBioOxgTotal) *
                  100
                ).toFixed(1)
              : '0.0',
          },
          {
            parametro: 'Arsénico',
            abreviacion: 'As',
            unidad: '[mg/L]',
            min: this.arsenico1Min.toFixed(6),
            max: this.arsenico1Max.toFixed(6),
            promedio: this.arsenico1Promedio.toFixed(6),
            emisionContaminantes: (
              (this.salidaAguaDescargadaTotal * this.arsenico1Promedio) /
              1000
            ).toFixed(6),
            porcentaje: totales.arsenicoTotal
              ? (
                  ((this.salidaAguaDescargadaTotal * this.arsenico1Promedio) /
                    1000 /
                    totales.arsenicoTotal) *
                  100
                ).toFixed(1)
              : '0.0',
          },
          {
            parametro: 'Cadmio',
            abreviacion: 'Cd',
            unidad: '[mg/L]',
            min: this.cadmio1Min.toFixed(6),
            max: this.cadmio1Max.toFixed(6),
            promedio: this.cadmio1Promedio.toFixed(6),
            emisionContaminantes: (
              (this.salidaAguaDescargadaTotal * this.cadmio1Promedio) /
              1000
            ).toFixed(6),
            porcentaje: totales.cadminioTotal
              ? (
                  ((this.salidaAguaDescargadaTotal * this.cadmio1Promedio) /
                    1000 /
                    totales.cadminioTotal) *
                  100
                ).toFixed(1)
              : '0.0',
          },
          {
            parametro: 'Cromo',
            abreviacion: 'Cr',
            unidad: '[mg/L]',
            min: this.cromo1Min.toFixed(6),
            max: this.cromo1Max.toFixed(6),
            promedio: this.cromo1Promedio.toFixed(6),
            emisionContaminantes: (
              (this.salidaAguaDescargadaTotal * this.cromo1Promedio) /
              1000
            ).toFixed(6),
            porcentaje: totales.cromoTotal
              ? (
                  ((this.salidaAguaDescargadaTotal * this.cromo1Promedio) /
                    1000 /
                    totales.cromoTotal) *
                  100
                ).toFixed(1)
              : '0.0',
          },
          {
            parametro: 'Cobre',
            abreviacion: 'Cu',
            unidad: '[mg/L]',
            min: this.cobre1Min.toFixed(6),
            max: this.cobre1Max.toFixed(6),
            promedio: this.cobre1Promedio.toFixed(6),
            emisionContaminantes: (
              (this.salidaAguaDescargadaTotal * this.cobre1Promedio) /
              1000
            ).toFixed(6),
            porcentaje: totales.cobreTotal
              ? (
                  ((this.salidaAguaDescargadaTotal * this.cobre1Promedio) /
                    1000 /
                    totales.cobreTotal) *
                  100
                ).toFixed(1)
              : '0.0',
          },
          {
            parametro: 'Mercurio',
            abreviacion: 'Hg',
            unidad: '[mg/L]',
            min: this.mercurio1Min.toFixed(6),
            max: this.mercurio1Max.toFixed(6),
            promedio: this.mercurio1Promedio.toFixed(6),
            emisionContaminantes: (
              (this.salidaAguaDescargadaTotal * this.mercurio1Promedio) /
              1000
            ).toFixed(6),
            porcentaje: totales.mercurioTotal
              ? (
                  ((this.salidaAguaDescargadaTotal * this.mercurio1Promedio) /
                    1000 /
                    totales.mercurioTotal) *
                  100
                ).toFixed(1)
              : '0.0',
          },
          {
            parametro: 'Niquel',
            abreviacion: 'Ni',
            unidad: '[mg/L]',
            min: this.niquel1Min.toFixed(6),
            max: this.niquel1Max.toFixed(6),
            promedio: this.niquel1Promedio.toFixed(6),
            emisionContaminantes: (
              (this.salidaAguaDescargadaTotal * this.niquel1Promedio) /
              1000
            ).toFixed(6),
            porcentaje: totales.niquelTotal
              ? (
                  ((this.salidaAguaDescargadaTotal * this.niquel1Promedio) /
                    1000 /
                    totales.niquelTotal) *
                  100
                ).toFixed(1)
              : '0.0',
          },
          {
            parametro: 'Plomo',
            abreviacion: 'Pb',
            unidad: '[mg/L]',
            min: this.plomo1Min.toFixed(6),
            max: this.plomo1Max.toFixed(6),
            promedio: this.plomo1Promedio.toFixed(6),
            emisionContaminantes: (
              (this.salidaAguaDescargadaTotal * this.plomo1Promedio) /
              1000
            ).toFixed(6),
            porcentaje: totales.plomoTotal
              ? (
                  ((this.salidaAguaDescargadaTotal * this.plomo1Promedio) /
                    1000 /
                    totales.plomoTotal) *
                  100
                ).toFixed(1)
              : '0.0',
          },
          {
            parametro: 'Zinc',
            abreviacion: 'Zn',
            unidad: '[mg/L]',
            min: this.zinc1Min.toFixed(6),
            max: this.zinc1Max.toFixed(6),
            promedio: this.zinc1Promedio.toFixed(6),
            emisionContaminantes: (
              (this.salidaAguaDescargadaTotal * this.zinc1Promedio) /
              1000
            ).toFixed(6),
            porcentaje: totales.zincTotal
              ? (
                  ((this.salidaAguaDescargadaTotal * this.zinc1Promedio) /
                    1000 /
                    totales.zincTotal) *
                  100
                ).toFixed(1)
              : '0.0',
          },
          {
            parametro: 'Pentaclorofenol',
            abreviacion: 'C6OHCL5',
            unidad: '[mg/L]',
            min: this.pentaclorofenol1Min.toFixed(6),
            max: this.pentaclorofenol1Max.toFixed(6),
            promedio: this.pentaclorofenol1Promedio.toFixed(6),
            emisionContaminantes: (
              (this.salidaAguaDescargadaTotal * this.pentaclorofenol1Promedio) /
              1000
            ).toFixed(6),
            porcentaje: totales.pentaclorofenolTotal
              ? (
                  ((this.salidaAguaDescargadaTotal *
                    this.pentaclorofenol1Promedio) /
                    1000 /
                    totales.pentaclorofenolTotal) *
                  100
                ).toFixed(1)
              : '0.0',
          },
        ], */
      };
      salidasAgua.push(estaSalida);
    });

    const dataLista = {
      datosEmpresa: {
        nombreEmpresa: this.nombreEmpresa,
        instalacionMedida: this.instalacionMedida,
        ubicacionMedidaR: this.ubicacionMedidaR,
        ubicacionMedidaC: this.ubicacionMedidaC,
        tipoProducto: this.tipoProducto,
      },
      entrasdaDeAgua: entradasAgua,

      salidasDeAgua: salidasAgua,
      totales,
      // totalesPorcentaje,
    };

    this.router.navigate(['/resumen'], { state: { data: dataLista } });
  }

  calculaEntradaAgua() {
    this.fuentesDeAgua.forEach((fuente) => {
      const valoresMensuales = Object.values(fuente.datosMensuales);
      fuente.total = valoresMensuales.reduce((acc, val) => acc + val, 0); // Suma de todos los meses
      fuente.promedio = fuente.total / 12; // Promedio mensual
    });
  }

  calculaSalidasAgua() {
    this.salidasDeAgua.forEach((salida) => {
      const valoresMensuales = Object.values(salida.datosMensuales);
      salida.total = valoresMensuales.reduce((acc, val) => acc + val, 0); // Suma de todos los meses
      salida.promedio = salida.total / 12; // Promedio mensual
    });
  }

  calculaContaminantes() {
    this.salidasDeAgua.forEach((salida) => {
      salida.contaminantes.forEach((contaminante) => {
        const valoresMensuales = Object.values(contaminante.datosMensuales);
        contaminante.min = Math.min(...valoresMensuales);
        contaminante.max = Math.max(...valoresMensuales);
        const suma = valoresMensuales.reduce((acc, val) => acc + val, 0);
        contaminante.total = suma;
        contaminante.promedio = suma / 12;
      });
    });
  }
}
