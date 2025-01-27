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
  total: number;
  promedio: string;
  porcentaje: number;
  disminucionBiodiversidadPlantas: number;
  disminucionBiodiversidadPlantasPorcentaje: number;
}

interface SalidaAgua {
  nombre: string;
  proceso: string;
  categoria: string;
  total: number;
  promedio: number;
  contaminantes: Array<Contaminante>;
  availableWaterRemainingAware: number;
  toxixidadHumana: number;
  toxixidadHumanaPorcentaje: number;
  ecotoxicidad: number;
  ecotoxicidadPorcentaje: number;
  eutrofizacion: number;
  eutrofizacionPorcentaje: number;
  potencialesImpactosSalud: number;
  enfermedadesPorToxicidad: number;
  enfermedadesPorToxicidadPorcentaje: number;
  ecosistemasAcuaticosAfectadosPorEcotoxicidad: number;
  disminucionBiodiversidadTerrestrePorcentaje: number;
  ecosistemasAcuaticosAfectadosPorEcotoxicidadPorcentaje: number;
  ecosistemasAcuaticosAfectadosPorEutrofizacion: number;
  ecosistemasAcuaticosAfectadosPorEutrofizacionPorcentaje: number;
  porcentaje: number;
  availableWaterRemainingAwarePorcentaje: number;
  potencialesImpactosSaludPorcentaje: number;
  disminucionBiodiversidadTerrestre: number;
}

interface Contaminante {
  nombre: string;
  info?: string;
  abreviacion: string;
  unidad: string;
  datosMensuales: DatosMensuales;
  total: number;
  min: number;
  max: number;
  promedio: number;
  valor: number;
  porcentaje?: number;
  availableWaterRemainingAware: number;
  toxixidadHumana: number;
  ecotoxicidad: number;
  eutrofizacion: number;
  toxixidadHumanaFinal: number;
  ecotoxicidadFinal: number;
  eutrofizacionFinal: number;
  enfermedadesPorToxicidad: number;
}

type DatosMensuales = {
  [mes: string]: number;
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
  currentStep: number = 1;
  prevStep: number = 0;
  nexStep: number = 2;
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

  ecotoxicidad: { [key: string]: number } = {
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
    P: 1.0,
    // PO4: 0.326797,
    DQO: 0.00718954248366013,
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

  ecotoxicidadFinal: { [key: string]: number } = {
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
    P: 34.958282,
    // PO4: 11.424275,
    DQO: 0.251334,
  };

  aware100: number = 80.0952912410541;
  UNEP_SETAC_2017: number = 0.000017256729214146;
  Pfister_et_al_2009: number = 0.266051;
  ecotoxicidadMedioFinal: number = 0.00055;
  desconocidoFinal: number = 34.958282;

  contaminantes: Array<Contaminante> = [
    {
      nombre: 'Nitrógeno Total',
      abreviacion: 'N',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      valor: 0,
      promedio: 0,
      toxixidadHumana: 0,
      ecotoxicidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxicidadFinal: 0,
      eutrofizacionFinal: 0,
      availableWaterRemainingAware: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'Nitrógeno Total Kjeldahl',
      abreviacion: 'NTK',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      valor: 0,
      promedio: 0,
      availableWaterRemainingAware: 0,

      toxixidadHumana: 0,
      ecotoxicidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxicidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'Fósforo Total',
      abreviacion: 'P',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      valor: 0,
      promedio: 0,
      availableWaterRemainingAware: 0,

      toxixidadHumana: 0,
      ecotoxicidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxicidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'Fosfato',
      abreviacion: 'PO4',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      availableWaterRemainingAware: 0,
      valor: 0,

      toxixidadHumana: 0,
      ecotoxicidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxicidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'DQO',
      info: 'DEMANDA QUÍMICA DE Oxígeno',
      abreviacion: 'DQO',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      availableWaterRemainingAware: 0,
      valor: 0,

      toxixidadHumana: 0,
      ecotoxicidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxicidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'DBO',
      info: 'Demanda Biológica De Oxígeno',
      abreviacion: 'DBO',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      availableWaterRemainingAware: 0,

      valor: 0,
      toxixidadHumana: 0,
      ecotoxicidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxicidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'Arsénico',
      abreviacion: 'As',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      availableWaterRemainingAware: 0,

      valor: 0,
      toxixidadHumana: 0,
      ecotoxicidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxicidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'Cadmio',
      abreviacion: 'Cd',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      availableWaterRemainingAware: 0,
      valor: 0,

      toxixidadHumana: 0,
      ecotoxicidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxicidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'Cromo',
      abreviacion: 'Cr',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      availableWaterRemainingAware: 0,
      valor: 0,

      toxixidadHumana: 0,
      ecotoxicidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxicidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'Cobre',
      abreviacion: 'Cu',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      availableWaterRemainingAware: 0,
      valor: 0,

      toxixidadHumana: 0,
      ecotoxicidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxicidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'Mercurio',
      abreviacion: 'Hg',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      availableWaterRemainingAware: 0,
      valor: 0,

      toxixidadHumana: 0,
      ecotoxicidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxicidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'Niquel',
      abreviacion: 'Ni',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      availableWaterRemainingAware: 0,
      valor: 0,

      toxixidadHumana: 0,
      ecotoxicidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxicidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'Plomo',
      abreviacion: 'Pb',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      availableWaterRemainingAware: 0,
      valor: 0,
      toxixidadHumana: 0,
      ecotoxicidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxicidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'Zinc',
      abreviacion: 'Zn',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      availableWaterRemainingAware: 0,
      valor: 0,
      toxixidadHumana: 0,
      ecotoxicidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxicidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
    {
      nombre: 'Pentaclorofenol',
      abreviacion: 'C6OHCL5',
      unidad: '[mg/L]',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      min: 0,
      max: 0,
      promedio: 0,
      availableWaterRemainingAware: 0,
      valor: 0,
      toxixidadHumana: 0,
      ecotoxicidad: 0,
      eutrofizacion: 0,
      toxixidadHumanaFinal: 0,
      ecotoxicidadFinal: 0,
      eutrofizacionFinal: 0,
      enfermedadesPorToxicidad: 0,
    },
  ];

  fuentesDeAgua = [
    {
      nombre: 'Agua Potable',
      uso: 'Sistemas Sanitarios',
      categoria: 'ENTRADA AGUA POTABLE',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      promedio: 0,
      valor: 0,
      disminucionBiodiversidadPlantas: 0,
      disminucionBiodiversidadPlantasPorcentaje: 0,
    },
    {
      nombre: 'Agua de Pozo',
      uso: 'Producción',
      categoria: 'ENTRADA AGUA POZO',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      promedio: 0,
      valor: 0,
      disminucionBiodiversidadPlantas: 0,
      disminucionBiodiversidadPlantasPorcentaje: 0,
    },

    {
      nombre: 'Agua Dulce de Fuentes Superficiales',
      uso: 'Producción',
      categoria: 'ENTRADA AGUA SUPERFICIAL',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      promedio: 0,
      valor: 0,
      disminucionBiodiversidadPlantas: 0,
      disminucionBiodiversidadPlantasPorcentaje: 0,
    },
  ];

  salidasDeAgua = [
    {
      nombre: 'Agua Descargada',
      proceso: 'Producción',
      categoria: 'SALIDA AGUA DESCARGADA',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      promedio: 0,
      valor: 0,
      consumida: false,
      contaminantes: this.cloneContaminantes(),

      toxixidadHumana: 0,
      ecotoxicidad: 0,
      eutrofizacion: 0,
      availableWaterRemainingAware: 0,
      potencialesImpactosSalud: 0,
      enfermedadesPorToxicidad: 0,
      disminucionBiodiversidadTerrestre: 0,
      ecosistemasAcuaticosAfectadosPorEcotoxicidad: 0,
      ecosistemasAcuaticosAfectadosPorEutrofizacion: 0,

      toxixidadHumanaPrcentaje: 0,
      ecotoxicidadPrcentaje: 0,
      eutrofizacionPrcentaje: 0,
      availableWaterRemainingAwarePrcentaje: 0,
      potencialesImpactosSaludPrcentaje: 0,
      enfermedadesPorToxicidadPrcentaje: 0,
      disminucionBiodiversidadTerrestrePrcentaje: 0,
      ecosistemasAcuaticosAfectadosPorEcotoxicidadPrcentaje: 0,
      ecosistemasAcuaticosAfectadosPorEutrofizacionPrcentaje: 0,
    },
    {
      nombre: 'Agua Infiltrada',
      proceso: 'Producción',
      categoria: 'SALIDA AGUA INFILTRADA',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      promedio: 0,
      valor: 0,
      consumida: false,
      contaminantes: this.cloneContaminantes(),

      toxixidadHumana: 0,
      ecotoxicidad: 0,
      eutrofizacion: 0,
      availableWaterRemainingAware: 0,
      potencialesImpactosSalud: 0,
      enfermedadesPorToxicidad: 0,
      disminucionBiodiversidadTerrestre: 0,
      ecosistemasAcuaticosAfectadosPorEcotoxicidad: 0,
      ecosistemasAcuaticosAfectadosPorEutrofizacion: 0,

      toxixidadHumanaPrcentaje: 0,
      ecotoxicidadPrcentaje: 0,
      eutrofizacionPrcentaje: 0,
      availableWaterRemainingAwarePrcentaje: 0,
      potencialesImpactosSaludPrcentaje: 0,
      enfermedadesPorToxicidadPrcentaje: 0,
      disminucionBiodiversidadTerrestrePrcentaje: 0,
      ecosistemasAcuaticosAfectadosPorEcotoxicidadPrcentaje: 0,
      ecosistemasAcuaticosAfectadosPorEutrofizacionPrcentaje: 0,
    },
    {
      nombre: 'Agua Consumida',
      proceso: 'Producción',
      categoria: 'AGUA DULCE CONSUMIDA (HUELLA AZUL - WFN)',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      promedio: 0,
      valor: 0,
      consumida: true,
      contaminantes: [],

      toxixidadHumana: 0,
      ecotoxicidad: 0,
      eutrofizacion: 0,
      availableWaterRemainingAware: 0,
      potencialesImpactosSalud: 0,
      enfermedadesPorToxicidad: 0,
      disminucionBiodiversidadTerrestre: 0,
      ecosistemasAcuaticosAfectadosPorEcotoxicidad: 0,
      ecosistemasAcuaticosAfectadosPorEutrofizacion: 0,

      toxixidadHumanaPrcentaje: 0,
      ecotoxicidadPrcentaje: 0,
      eutrofizacionPrcentaje: 0,
      availableWaterRemainingAwarePrcentaje: 0,
      potencialesImpactosSaludPrcentaje: 0,
      enfermedadesPorToxicidadPrcentaje: 0,
      disminucionBiodiversidadTerrestrePrcentaje: 0,
      ecosistemasAcuaticosAfectadosPorEcotoxicidadPrcentaje: 0,
      ecosistemasAcuaticosAfectadosPorEutrofizacionPrcentaje: 0,
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
    window.scrollTo(0, 0);
    this.cargarDatos();
    // this.llenaDatos();
    // this.calcularTotalesProduccion();
    this.calculaEntradaAgua();
    this.calculaSalidasAgua();
    this.calculaContaminantes();
  }

  // Método para guardar datos en el localStorage
  guardarDatos() {
    const datosGenerales = {
      anioMedicion: this.anioMedicion,
      nombreEmpresa: this.nombreEmpresa,
      nombreResponsable: this.nombreResponsable,
      ubicacionMedidaR: this.ubicacionMedidaR,
      ubicacionMedidaC: this.ubicacionMedidaC,
      cargoResponsable: this.cargoResponsable,
      correoResponsable: this.correoResponsable,
      telefonoResponsable: this.telefonoResponsable,
    };

    const datosPorAnio = {
      contaminantes: this.contaminantes,
      fuentesDeAgua: this.fuentesDeAgua,
      salidasDeAgua: this.salidasDeAgua,
      producto: this.producto,
      descripcion: this.descripcion,
      unidad: this.unidad,
      enero: this.enero,
      febrero: this.febrero,
      marzo: this.marzo,
      abril: this.abril,
      mayo: this.mayo,
      junio: this.junio,
      julio: this.julio,
      agosto: this.agosto,
      septiembre: this.septiembre,
      octubre: this.octubre,
      noviembre: this.noviembre,
      diciembre: this.diciembre,
    };

    localStorage.setItem(
      'calcularHuellaDatosGenerales',
      JSON.stringify(datosGenerales)
    );

    const allData = JSON.parse(
      localStorage.getItem('calcularHuellaDatosPorAnio') || '{}'
    );

    if (!allData[this.anioMedicion] && this.currentStep == 1) {
      return;
    }
    allData[this.anioMedicion] = datosPorAnio;
    localStorage.setItem('calcularHuellaDatosPorAnio', JSON.stringify(allData));
  }

  // Método para cargar datos desde el localStorage
  cargarDatos(ignoreAnio: boolean = false) {
    const datosGenerales = JSON.parse(
      localStorage.getItem('calcularHuellaDatosGenerales') || '{}'
    );

    if (!ignoreAnio) {
      this.anioMedicion = datosGenerales.anioMedicion || '';
    }
    this.nombreEmpresa = datosGenerales.nombreEmpresa || '';
    this.nombreResponsable = datosGenerales.nombreResponsable || '';
    this.ubicacionMedidaR = datosGenerales.ubicacionMedidaR || '';
    this.ubicacionMedidaC = datosGenerales.ubicacionMedidaC || '';
    this.cargoResponsable = datosGenerales.cargoResponsable || '';
    this.correoResponsable = datosGenerales.correoResponsable || '';
    this.telefonoResponsable = datosGenerales.telefonoResponsable || '';

    const allData = JSON.parse(
      localStorage.getItem('calcularHuellaDatosPorAnio') || '{}'
    );

    const datosPorAnio = allData[this.anioMedicion];
    console.log(this.anioMedicion, datosPorAnio);

    if (datosPorAnio) {
      this.contaminantes = datosPorAnio.contaminantes || this.contaminantes;
      this.fuentesDeAgua = datosPorAnio.fuentesDeAgua || this.fuentesDeAgua;
      this.salidasDeAgua = datosPorAnio.salidasDeAgua || this.salidasDeAgua;
      this.producto = datosPorAnio.producto || '';
      this.descripcion = datosPorAnio.descripcion || '';
      this.unidad = datosPorAnio.unidad || 'ton';
      this.enero = datosPorAnio.enero || 0;
      this.febrero = datosPorAnio.febrero || 0;
      this.marzo = datosPorAnio.marzo || 0;
      this.abril = datosPorAnio.abril || 0;
      this.mayo = datosPorAnio.mayo || 0;
      this.junio = datosPorAnio.junio || 0;
      this.julio = datosPorAnio.julio || 0;
      this.agosto = datosPorAnio.agosto || 0;
      this.septiembre = datosPorAnio.septiembre || 0;
      this.octubre = datosPorAnio.octubre || 0;
      this.noviembre = datosPorAnio.noviembre || 0;
      this.diciembre = datosPorAnio.diciembre || 0;
    } else {
      this.contaminantes = this.contaminantes;
      this.fuentesDeAgua = this.fuentesDeAgua;
      this.salidasDeAgua = this.salidasDeAgua;
      this.producto = '';
      this.descripcion = '';
      this.unidad = 'ton';
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
  }

  limpiaDatosAnioInView() {
    const allData = JSON.parse(
      localStorage.getItem('calcularHuellaDatosPorAnio') || '{}'
    );

    const datosPorAnio = allData[this.anioMedicion];
    console.log(this.anioMedicion, datosPorAnio);

    if (!datosPorAnio) {
      this.contaminantes = this.contaminantes;
      this.fuentesDeAgua = this.fuentesDeAgua;
      this.salidasDeAgua = this.salidasDeAgua;
      this.producto = '';
      this.descripcion = '';
      this.unidad = 'ton';
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
  }

  llenaDatos() {
    this.anioMedicion = '2024';
    this.nombreEmpresa = 'Mi empresa';
    this.nombreResponsable = 'Juan';
    this.ubicacionMedidaR = 'Región de la Araucanía';
    this.ubicacionMedidaC = 'Quepe';
    this.cargoResponsable = 'Empleado';
    this.correoResponsable = 'micorreo@email.com';
    this.telefonoResponsable = '+56 9 1234 5678';

    this.producto = 'Avellanas';
    this.descripcion = 'Corylus avellana L';
    this.unidad = 'ton';
    this.enero = 773.97;
    this.febrero = 905.9;
    this.marzo = 709.02;
    this.abril = 669.3;
    this.mayo = 502.43;
    this.junio = 979.19;
    this.julio = 713.72;
    this.agosto = 818.12;
    this.septiembre = 872.26;
    this.octubre = 506.78;
    this.noviembre = 648.4;
    this.diciembre = 875.56;
    /*

    this.fuentesDeAgua[0].datosMensuales['enero'] = 12.96;
    this.fuentesDeAgua[0].datosMensuales['febrero'] = 11.85;
    this.fuentesDeAgua[0].datosMensuales['marzo'] = 14.96;
    this.fuentesDeAgua[0].datosMensuales['abril'] = 12.73;
    this.fuentesDeAgua[0].datosMensuales['mayo'] = 14.48;
    this.fuentesDeAgua[0].datosMensuales['junio'] = 10.22;
    this.fuentesDeAgua[0].datosMensuales['julio'] = 12.22;
    this.fuentesDeAgua[0].datosMensuales['agosto'] = 12.08;
    this.fuentesDeAgua[0].datosMensuales['septiembre'] = 12.31;
    this.fuentesDeAgua[0].datosMensuales['octubre'] = 10.15;
    this.fuentesDeAgua[0].datosMensuales['noviembre'] = 14.96;
    this.fuentesDeAgua[0].datosMensuales['diciembre'] = 14.19;

    this.fuentesDeAgua[1].datosMensuales['enero'] = 58.13;
    this.fuentesDeAgua[1].datosMensuales['febrero'] = 51.51;
    this.fuentesDeAgua[1].datosMensuales['marzo'] = 65.71;
    this.fuentesDeAgua[1].datosMensuales['abril'] = 66.82;
    this.fuentesDeAgua[1].datosMensuales['mayo'] = 68.22;
    this.fuentesDeAgua[1].datosMensuales['junio'] = 67.24;
    this.fuentesDeAgua[1].datosMensuales['julio'] = 55.75;
    this.fuentesDeAgua[1].datosMensuales['agosto'] = 68.5;
    this.fuentesDeAgua[1].datosMensuales['septiembre'] = 68.06;
    this.fuentesDeAgua[1].datosMensuales['octubre'] = 50.62;
    this.fuentesDeAgua[1].datosMensuales['noviembre'] = 65.17;
    this.fuentesDeAgua[1].datosMensuales['diciembre'] = 53.84;

    this.fuentesDeAgua[2].datosMensuales['enero'] = 69.62;
    this.fuentesDeAgua[2].datosMensuales['febrero'] = 56.23;
    this.fuentesDeAgua[2].datosMensuales['marzo'] = 66.82;
    this.fuentesDeAgua[2].datosMensuales['abril'] = 63.58;
    this.fuentesDeAgua[2].datosMensuales['mayo'] = 62.59;
    this.fuentesDeAgua[2].datosMensuales['junio'] = 66.97;
    this.fuentesDeAgua[2].datosMensuales['julio'] = 65.16;
    this.fuentesDeAgua[2].datosMensuales['agosto'] = 56.27;
    this.fuentesDeAgua[2].datosMensuales['septiembre'] = 59.1;
    this.fuentesDeAgua[2].datosMensuales['octubre'] = 59.71;
    this.fuentesDeAgua[2].datosMensuales['noviembre'] = 55.18;
    this.fuentesDeAgua[2].datosMensuales['diciembre'] = 58.04;

    this.salidasDeAgua[0].datosMensuales['enero'] = 11.82;
    this.salidasDeAgua[0].datosMensuales['febrero'] = 13.53;
    this.salidasDeAgua[0].datosMensuales['marzo'] = 11.11;
    this.salidasDeAgua[0].datosMensuales['abril'] = 14.72;
    this.salidasDeAgua[0].datosMensuales['mayo'] = 14.33;
    this.salidasDeAgua[0].datosMensuales['junio'] = 14.42;
    this.salidasDeAgua[0].datosMensuales['julio'] = 12.91;
    this.salidasDeAgua[0].datosMensuales['agosto'] = 12.29;
    this.salidasDeAgua[0].datosMensuales['septiembre'] = 10.47;
    this.salidasDeAgua[0].datosMensuales['octubre'] = 10.01;
    this.salidasDeAgua[0].datosMensuales['noviembre'] = 13.59;
    this.salidasDeAgua[0].datosMensuales['diciembre'] = 14.32;

    this.salidasDeAgua[1].datosMensuales['enero'] = 9.76;
    this.salidasDeAgua[1].datosMensuales['febrero'] = 7.27;
    this.salidasDeAgua[1].datosMensuales['marzo'] = 7.66;
    this.salidasDeAgua[1].datosMensuales['abril'] = 6.27;
    this.salidasDeAgua[1].datosMensuales['mayo'] = 8.35;
    this.salidasDeAgua[1].datosMensuales['junio'] = 6.29;
    this.salidasDeAgua[1].datosMensuales['julio'] = 7.17;
    this.salidasDeAgua[1].datosMensuales['agosto'] = 5.78;
    this.salidasDeAgua[1].datosMensuales['septiembre'] = 7.63;
    this.salidasDeAgua[1].datosMensuales['octubre'] = 7.01;
    this.salidasDeAgua[1].datosMensuales['noviembre'] = 6.74;
    this.salidasDeAgua[1].datosMensuales['diciembre'] = 5.41;

    this.salidasDeAgua[2].datosMensuales['enero'] = 106.17;
    this.salidasDeAgua[2].datosMensuales['febrero'] = 86.94;
    this.salidasDeAgua[2].datosMensuales['marzo'] = 113.76;
    this.salidasDeAgua[2].datosMensuales['abril'] = 109.41;
    this.salidasDeAgua[2].datosMensuales['mayo'] = 108.13;
    this.salidasDeAgua[2].datosMensuales['junio'] = 113.5;
    this.salidasDeAgua[2].datosMensuales['julio'] = 100.83;
    this.salidasDeAgua[2].datosMensuales['agosto'] = 106.7;
    this.salidasDeAgua[2].datosMensuales['septiembre'] = 109.06;
    this.salidasDeAgua[2].datosMensuales['octubre'] = 93.31;
    this.salidasDeAgua[2].datosMensuales['noviembre'] = 100.02;
    this.salidasDeAgua[2].datosMensuales['diciembre'] = 92.15;

    this.salidasDeAgua[0].contaminantes[0].datosMensuales['enero'] = 0;
    this.salidasDeAgua[0].contaminantes[0].datosMensuales['febrero'] = 0;
    this.salidasDeAgua[0].contaminantes[0].datosMensuales['marzo'] = 0;
    this.salidasDeAgua[0].contaminantes[0].datosMensuales['abril'] = 0;
    this.salidasDeAgua[0].contaminantes[0].datosMensuales['mayo'] = 0;
    this.salidasDeAgua[0].contaminantes[0].datosMensuales['junio'] = 0;
    this.salidasDeAgua[0].contaminantes[0].datosMensuales['julio'] = 0;
    this.salidasDeAgua[0].contaminantes[0].datosMensuales['agosto'] = 0;
    this.salidasDeAgua[0].contaminantes[0].datosMensuales['septiembre'] = 0;
    this.salidasDeAgua[0].contaminantes[0].datosMensuales['octubre'] = 0;
    this.salidasDeAgua[0].contaminantes[0].datosMensuales['noviembre'] = 0;
    this.salidasDeAgua[0].contaminantes[0].datosMensuales['diciembre'] = 0;

    this.salidasDeAgua[0].contaminantes[1].datosMensuales['enero'] = 8.3;
    this.salidasDeAgua[0].contaminantes[1].datosMensuales['febrero'] = 10.4;
    this.salidasDeAgua[0].contaminantes[1].datosMensuales['marzo'] = 31.4;
    this.salidasDeAgua[0].contaminantes[1].datosMensuales['abril'] = 26.3;
    this.salidasDeAgua[0].contaminantes[1].datosMensuales['mayo'] = 36.2;
    this.salidasDeAgua[0].contaminantes[1].datosMensuales['junio'] = 47;
    this.salidasDeAgua[0].contaminantes[1].datosMensuales['julio'] = 43.2;
    this.salidasDeAgua[0].contaminantes[1].datosMensuales['agosto'] = 45.7;
    this.salidasDeAgua[0].contaminantes[1].datosMensuales['septiembre'] = 1.6;
    this.salidasDeAgua[0].contaminantes[1].datosMensuales['octubre'] = 22;
    this.salidasDeAgua[0].contaminantes[1].datosMensuales['noviembre'] = 4.4;
    this.salidasDeAgua[0].contaminantes[1].datosMensuales['diciembre'] = 31.2;

    this.salidasDeAgua[0].contaminantes[2].datosMensuales['enero'] = 4.5;
    this.salidasDeAgua[0].contaminantes[2].datosMensuales['febrero'] = 5.6;
    this.salidasDeAgua[0].contaminantes[2].datosMensuales['marzo'] = 9.4;
    this.salidasDeAgua[0].contaminantes[2].datosMensuales['abril'] = 2.1;
    this.salidasDeAgua[0].contaminantes[2].datosMensuales['mayo'] = 3;
    this.salidasDeAgua[0].contaminantes[2].datosMensuales['junio'] = 0.9;
    this.salidasDeAgua[0].contaminantes[2].datosMensuales['julio'] = 6.1;
    this.salidasDeAgua[0].contaminantes[2].datosMensuales['agosto'] = 3.5;
    this.salidasDeAgua[0].contaminantes[2].datosMensuales['septiembre'] = 0.8;
    this.salidasDeAgua[0].contaminantes[2].datosMensuales['octubre'] = 2.6;
    this.salidasDeAgua[0].contaminantes[2].datosMensuales['noviembre'] = 3.5;
    this.salidasDeAgua[0].contaminantes[2].datosMensuales['diciembre'] = 0.3;

    this.salidasDeAgua[0].contaminantes[3].datosMensuales['enero'] = 0;
    this.salidasDeAgua[0].contaminantes[3].datosMensuales['febrero'] = 0;
    this.salidasDeAgua[0].contaminantes[3].datosMensuales['marzo'] = 0;
    this.salidasDeAgua[0].contaminantes[3].datosMensuales['abril'] = 0;
    this.salidasDeAgua[0].contaminantes[3].datosMensuales['mayo'] = 0;
    this.salidasDeAgua[0].contaminantes[3].datosMensuales['junio'] = 0;
    this.salidasDeAgua[0].contaminantes[3].datosMensuales['julio'] = 0;
    this.salidasDeAgua[0].contaminantes[3].datosMensuales['agosto'] = 0;
    this.salidasDeAgua[0].contaminantes[3].datosMensuales['septiembre'] = 0;
    this.salidasDeAgua[0].contaminantes[3].datosMensuales['octubre'] = 0;
    this.salidasDeAgua[0].contaminantes[3].datosMensuales['noviembre'] = 0;
    this.salidasDeAgua[0].contaminantes[3].datosMensuales['diciembre'] = 0;

    this.salidasDeAgua[0].contaminantes[4].datosMensuales['enero'] = 0;
    this.salidasDeAgua[0].contaminantes[4].datosMensuales['febrero'] = 0;
    this.salidasDeAgua[0].contaminantes[4].datosMensuales['marzo'] = 0;
    this.salidasDeAgua[0].contaminantes[4].datosMensuales['abril'] = 0;
    this.salidasDeAgua[0].contaminantes[4].datosMensuales['mayo'] = 0;
    this.salidasDeAgua[0].contaminantes[4].datosMensuales['junio'] = 0;
    this.salidasDeAgua[0].contaminantes[4].datosMensuales['julio'] = 0;
    this.salidasDeAgua[0].contaminantes[4].datosMensuales['agosto'] = 0;
    this.salidasDeAgua[0].contaminantes[4].datosMensuales['septiembre'] = 0;
    this.salidasDeAgua[0].contaminantes[4].datosMensuales['octubre'] = 0;
    this.salidasDeAgua[0].contaminantes[4].datosMensuales['noviembre'] = 0;
    this.salidasDeAgua[0].contaminantes[4].datosMensuales['diciembre'] = 0;

    this.salidasDeAgua[0].contaminantes[5].datosMensuales['enero'] = 21.5;
    this.salidasDeAgua[0].contaminantes[5].datosMensuales['febrero'] = 20.2;
    this.salidasDeAgua[0].contaminantes[5].datosMensuales['marzo'] = 0.7;
    this.salidasDeAgua[0].contaminantes[5].datosMensuales['abril'] = 10;
    this.salidasDeAgua[0].contaminantes[5].datosMensuales['mayo'] = 8;
    this.salidasDeAgua[0].contaminantes[5].datosMensuales['junio'] = 26.3;
    this.salidasDeAgua[0].contaminantes[5].datosMensuales['julio'] = 21;
    this.salidasDeAgua[0].contaminantes[5].datosMensuales['agosto'] = 4.5;
    this.salidasDeAgua[0].contaminantes[5].datosMensuales['septiembre'] = 7.8;
    this.salidasDeAgua[0].contaminantes[5].datosMensuales['octubre'] = 23.4;
    this.salidasDeAgua[0].contaminantes[5].datosMensuales['noviembre'] = 5.7;
    this.salidasDeAgua[0].contaminantes[5].datosMensuales['diciembre'] = 7;

    this.salidasDeAgua[0].contaminantes[6].datosMensuales['enero'] = 0.25;
    this.salidasDeAgua[0].contaminantes[6].datosMensuales['febrero'] = 0.29;
    this.salidasDeAgua[0].contaminantes[6].datosMensuales['marzo'] = 0.28;
    this.salidasDeAgua[0].contaminantes[6].datosMensuales['abril'] = 0.45;
    this.salidasDeAgua[0].contaminantes[6].datosMensuales['mayo'] = 0.47;
    this.salidasDeAgua[0].contaminantes[6].datosMensuales['junio'] = 0.04;
    this.salidasDeAgua[0].contaminantes[6].datosMensuales['julio'] = 0;
    this.salidasDeAgua[0].contaminantes[6].datosMensuales['agosto'] = 0.15;
    this.salidasDeAgua[0].contaminantes[6].datosMensuales['septiembre'] = 0.03;
    this.salidasDeAgua[0].contaminantes[6].datosMensuales['octubre'] = 0.1;
    this.salidasDeAgua[0].contaminantes[6].datosMensuales['noviembre'] = 0.04;
    this.salidasDeAgua[0].contaminantes[6].datosMensuales['diciembre'] = 0.17;

    this.salidasDeAgua[0].contaminantes[7].datosMensuales['enero'] = 0.0046;
    this.salidasDeAgua[0].contaminantes[7].datosMensuales['febrero'] = 0.0099;
    this.salidasDeAgua[0].contaminantes[7].datosMensuales['marzo'] = 0.0033;
    this.salidasDeAgua[0].contaminantes[7].datosMensuales['abril'] = 0.0029;
    this.salidasDeAgua[0].contaminantes[7].datosMensuales['mayo'] = 0.0041;
    this.salidasDeAgua[0].contaminantes[7].datosMensuales['junio'] = 0.0063;
    this.salidasDeAgua[0].contaminantes[7].datosMensuales['julio'] = 0.0095;
    this.salidasDeAgua[0].contaminantes[7].datosMensuales['agosto'] = 0.0024;
    this.salidasDeAgua[0].contaminantes[7].datosMensuales[
      'septiembre'
    ] = 0.0079;
    this.salidasDeAgua[0].contaminantes[7].datosMensuales['octubre'] = 0.008;
    this.salidasDeAgua[0].contaminantes[7].datosMensuales['noviembre'] = 0.0055;
    this.salidasDeAgua[0].contaminantes[7].datosMensuales['diciembre'] = 0.003;

    this.salidasDeAgua[0].contaminantes[8].datosMensuales['enero'] = 0.0496;
    this.salidasDeAgua[0].contaminantes[8].datosMensuales['febrero'] = 0.0012;
    this.salidasDeAgua[0].contaminantes[8].datosMensuales['marzo'] = 0.0163;
    this.salidasDeAgua[0].contaminantes[8].datosMensuales['abril'] = 0.0339;
    this.salidasDeAgua[0].contaminantes[8].datosMensuales['mayo'] = 0.0205;
    this.salidasDeAgua[0].contaminantes[8].datosMensuales['junio'] = 0.0245;
    this.salidasDeAgua[0].contaminantes[8].datosMensuales['julio'] = 0.0315;
    this.salidasDeAgua[0].contaminantes[8].datosMensuales['agosto'] = 0.0009;
    this.salidasDeAgua[0].contaminantes[8].datosMensuales[
      'septiembre'
    ] = 0.0343;
    this.salidasDeAgua[0].contaminantes[8].datosMensuales['octubre'] = 0.036;
    this.salidasDeAgua[0].contaminantes[8].datosMensuales['noviembre'] = 0.0012;
    this.salidasDeAgua[0].contaminantes[8].datosMensuales['diciembre'] = 0.0425;

    this.salidasDeAgua[0].contaminantes[9].datosMensuales['enero'] = 0;
    this.salidasDeAgua[0].contaminantes[9].datosMensuales['febrero'] = 0;
    this.salidasDeAgua[0].contaminantes[9].datosMensuales['marzo'] = 0;
    this.salidasDeAgua[0].contaminantes[9].datosMensuales['abril'] = 0;
    this.salidasDeAgua[0].contaminantes[9].datosMensuales['mayo'] = 0;
    this.salidasDeAgua[0].contaminantes[9].datosMensuales['junio'] = 0;
    this.salidasDeAgua[0].contaminantes[9].datosMensuales['julio'] = 0;
    this.salidasDeAgua[0].contaminantes[9].datosMensuales['agosto'] = 0;
    this.salidasDeAgua[0].contaminantes[9].datosMensuales['septiembre'] = 0;
    this.salidasDeAgua[0].contaminantes[9].datosMensuales['octubre'] = 0;
    this.salidasDeAgua[0].contaminantes[9].datosMensuales['noviembre'] = 0;
    this.salidasDeAgua[0].contaminantes[9].datosMensuales['diciembre'] = 0;

    this.salidasDeAgua[0].contaminantes[10].datosMensuales['enero'] = 0.00041;
    this.salidasDeAgua[0].contaminantes[10].datosMensuales['febrero'] = 0.00053;
    this.salidasDeAgua[0].contaminantes[10].datosMensuales['marzo'] = 0.00038;
    this.salidasDeAgua[0].contaminantes[10].datosMensuales['abril'] = 0.00086;
    this.salidasDeAgua[0].contaminantes[10].datosMensuales['mayo'] = 0.00025;
    this.salidasDeAgua[0].contaminantes[10].datosMensuales['junio'] = 0.00078;
    this.salidasDeAgua[0].contaminantes[10].datosMensuales['julio'] = 0.00077;
    this.salidasDeAgua[0].contaminantes[10].datosMensuales['agosto'] = 0.00004;
    this.salidasDeAgua[0].contaminantes[10].datosMensuales[
      'septiembre'
    ] = 0.00081;
    this.salidasDeAgua[0].contaminantes[10].datosMensuales['octubre'] = 0.00035;
    this.salidasDeAgua[0].contaminantes[10].datosMensuales[
      'noviembre'
    ] = 0.0004;
    this.salidasDeAgua[0].contaminantes[10].datosMensuales[
      'diciembre'
    ] = 0.00046;

    this.salidasDeAgua[0].contaminantes[11].datosMensuales['enero'] = 0.014;
    this.salidasDeAgua[0].contaminantes[11].datosMensuales['febrero'] = 0.158;
    this.salidasDeAgua[0].contaminantes[11].datosMensuales['marzo'] = 0.076;
    this.salidasDeAgua[0].contaminantes[11].datosMensuales['abril'] = 0.039;
    this.salidasDeAgua[0].contaminantes[11].datosMensuales['mayo'] = 0.074;
    this.salidasDeAgua[0].contaminantes[11].datosMensuales['junio'] = 0.039;
    this.salidasDeAgua[0].contaminantes[11].datosMensuales['julio'] = 0.095;
    this.salidasDeAgua[0].contaminantes[11].datosMensuales['agosto'] = 0.125;
    this.salidasDeAgua[0].contaminantes[11].datosMensuales[
      'septiembre'
    ] = 0.139;
    this.salidasDeAgua[0].contaminantes[11].datosMensuales['octubre'] = 0.085;
    this.salidasDeAgua[0].contaminantes[11].datosMensuales['noviembre'] = 0.087;
    this.salidasDeAgua[0].contaminantes[11].datosMensuales['diciembre'] = 0.031;

    this.salidasDeAgua[0].contaminantes[12].datosMensuales['enero'] = 0.04;
    this.salidasDeAgua[0].contaminantes[12].datosMensuales['febrero'] = 0.026;
    this.salidasDeAgua[0].contaminantes[12].datosMensuales['marzo'] = 0.007;
    this.salidasDeAgua[0].contaminantes[12].datosMensuales['abril'] = 0.017;
    this.salidasDeAgua[0].contaminantes[12].datosMensuales['mayo'] = 0.019;
    this.salidasDeAgua[0].contaminantes[12].datosMensuales['junio'] = 0.047;
    this.salidasDeAgua[0].contaminantes[12].datosMensuales['julio'] = 0.007;
    this.salidasDeAgua[0].contaminantes[12].datosMensuales['agosto'] = 0.003;
    this.salidasDeAgua[0].contaminantes[12].datosMensuales[
      'septiembre'
    ] = 0.034;
    this.salidasDeAgua[0].contaminantes[12].datosMensuales['octubre'] = 0.046;
    this.salidasDeAgua[0].contaminantes[12].datosMensuales['noviembre'] = 0.022;
    this.salidasDeAgua[0].contaminantes[12].datosMensuales['diciembre'] = 0.05;

    this.salidasDeAgua[0].contaminantes[13].datosMensuales['enero'] = 0.04;
    this.salidasDeAgua[0].contaminantes[13].datosMensuales['febrero'] = 1;
    this.salidasDeAgua[0].contaminantes[13].datosMensuales['marzo'] = 2.58;
    this.salidasDeAgua[0].contaminantes[13].datosMensuales['abril'] = 0.04;
    this.salidasDeAgua[0].contaminantes[13].datosMensuales['mayo'] = 1;
    this.salidasDeAgua[0].contaminantes[13].datosMensuales['junio'] = 1.19;
    this.salidasDeAgua[0].contaminantes[13].datosMensuales['julio'] = 2.41;
    this.salidasDeAgua[0].contaminantes[13].datosMensuales['agosto'] = 1.46;
    this.salidasDeAgua[0].contaminantes[13].datosMensuales['septiembre'] = 1.73;
    this.salidasDeAgua[0].contaminantes[13].datosMensuales['octubre'] = 2.58;
    this.salidasDeAgua[0].contaminantes[13].datosMensuales['noviembre'] = 0.93;
    this.salidasDeAgua[0].contaminantes[13].datosMensuales['diciembre'] = 2.21;

    this.salidasDeAgua[0].contaminantes[14].datosMensuales['enero'] = 0.00818;
    this.salidasDeAgua[0].contaminantes[14].datosMensuales['febrero'] = 0.00546;
    this.salidasDeAgua[0].contaminantes[14].datosMensuales['marzo'] = 0.00114;
    this.salidasDeAgua[0].contaminantes[14].datosMensuales['abril'] = 0.00512;
    this.salidasDeAgua[0].contaminantes[14].datosMensuales['mayo'] = 0.00534;
    this.salidasDeAgua[0].contaminantes[14].datosMensuales['junio'] = 0.00067;
    this.salidasDeAgua[0].contaminantes[14].datosMensuales['julio'] = 0.00091;
    this.salidasDeAgua[0].contaminantes[14].datosMensuales['agosto'] = 0.00442;
    this.salidasDeAgua[0].contaminantes[14].datosMensuales[
      'septiembre'
    ] = 0.00204;
    this.salidasDeAgua[0].contaminantes[14].datosMensuales['octubre'] = 0.00559;
    this.salidasDeAgua[0].contaminantes[14].datosMensuales[
      'noviembre'
    ] = 0.00583;
    this.salidasDeAgua[0].contaminantes[14].datosMensuales[
      'diciembre'
    ] = 0.00552;

    this.salidasDeAgua[1].contaminantes[0].datosMensuales['enero'] = 0;
    this.salidasDeAgua[1].contaminantes[0].datosMensuales['febrero'] = 0;
    this.salidasDeAgua[1].contaminantes[0].datosMensuales['marzo'] = 0;
    this.salidasDeAgua[1].contaminantes[0].datosMensuales['abril'] = 0;
    this.salidasDeAgua[1].contaminantes[0].datosMensuales['mayo'] = 0;
    this.salidasDeAgua[1].contaminantes[0].datosMensuales['junio'] = 0;
    this.salidasDeAgua[1].contaminantes[0].datosMensuales['julio'] = 0;
    this.salidasDeAgua[1].contaminantes[0].datosMensuales['agosto'] = 0;
    this.salidasDeAgua[1].contaminantes[0].datosMensuales['septiembre'] = 0;
    this.salidasDeAgua[1].contaminantes[0].datosMensuales['octubre'] = 0;
    this.salidasDeAgua[1].contaminantes[0].datosMensuales['noviembre'] = 0;
    this.salidasDeAgua[1].contaminantes[0].datosMensuales['diciembre'] = 0;

    this.salidasDeAgua[1].contaminantes[1].datosMensuales['enero'] = 9.2;
    this.salidasDeAgua[1].contaminantes[1].datosMensuales['febrero'] = 41;
    this.salidasDeAgua[1].contaminantes[1].datosMensuales['marzo'] = 12.8;
    this.salidasDeAgua[1].contaminantes[1].datosMensuales['abril'] = 15.5;
    this.salidasDeAgua[1].contaminantes[1].datosMensuales['mayo'] = 4.1;
    this.salidasDeAgua[1].contaminantes[1].datosMensuales['junio'] = 24.7;
    this.salidasDeAgua[1].contaminantes[1].datosMensuales['julio'] = 23;
    this.salidasDeAgua[1].contaminantes[1].datosMensuales['agosto'] = 26.6;
    this.salidasDeAgua[1].contaminantes[1].datosMensuales['septiembre'] = 33.8;
    this.salidasDeAgua[1].contaminantes[1].datosMensuales['octubre'] = 16;
    this.salidasDeAgua[1].contaminantes[1].datosMensuales['noviembre'] = 40.6;
    this.salidasDeAgua[1].contaminantes[1].datosMensuales['diciembre'] = 10.9;

    this.salidasDeAgua[1].contaminantes[2].datosMensuales['enero'] = 0;
    this.salidasDeAgua[1].contaminantes[2].datosMensuales['febrero'] = 0;
    this.salidasDeAgua[1].contaminantes[2].datosMensuales['marzo'] = 0;
    this.salidasDeAgua[1].contaminantes[2].datosMensuales['abril'] = 0;
    this.salidasDeAgua[1].contaminantes[2].datosMensuales['mayo'] = 0;
    this.salidasDeAgua[1].contaminantes[2].datosMensuales['junio'] = 0;
    this.salidasDeAgua[1].contaminantes[2].datosMensuales['julio'] = 0;
    this.salidasDeAgua[1].contaminantes[2].datosMensuales['agosto'] = 0;
    this.salidasDeAgua[1].contaminantes[2].datosMensuales['septiembre'] = 0;
    this.salidasDeAgua[1].contaminantes[2].datosMensuales['octubre'] = 0;
    this.salidasDeAgua[1].contaminantes[2].datosMensuales['noviembre'] = 0;
    this.salidasDeAgua[1].contaminantes[2].datosMensuales['diciembre'] = 0;

    this.salidasDeAgua[1].contaminantes[3].datosMensuales['enero'] = 0;
    this.salidasDeAgua[1].contaminantes[3].datosMensuales['febrero'] = 0;
    this.salidasDeAgua[1].contaminantes[3].datosMensuales['marzo'] = 0;
    this.salidasDeAgua[1].contaminantes[3].datosMensuales['abril'] = 0;
    this.salidasDeAgua[1].contaminantes[3].datosMensuales['mayo'] = 0;
    this.salidasDeAgua[1].contaminantes[3].datosMensuales['junio'] = 0;
    this.salidasDeAgua[1].contaminantes[3].datosMensuales['julio'] = 0;
    this.salidasDeAgua[1].contaminantes[3].datosMensuales['agosto'] = 0;
    this.salidasDeAgua[1].contaminantes[3].datosMensuales['septiembre'] = 0;
    this.salidasDeAgua[1].contaminantes[3].datosMensuales['octubre'] = 0;
    this.salidasDeAgua[1].contaminantes[3].datosMensuales['noviembre'] = 0;
    this.salidasDeAgua[1].contaminantes[3].datosMensuales['diciembre'] = 0;

    this.salidasDeAgua[1].contaminantes[4].datosMensuales['enero'] = 0;
    this.salidasDeAgua[1].contaminantes[4].datosMensuales['febrero'] = 0;
    this.salidasDeAgua[1].contaminantes[4].datosMensuales['marzo'] = 0;
    this.salidasDeAgua[1].contaminantes[4].datosMensuales['abril'] = 0;
    this.salidasDeAgua[1].contaminantes[4].datosMensuales['mayo'] = 0;
    this.salidasDeAgua[1].contaminantes[4].datosMensuales['junio'] = 0;
    this.salidasDeAgua[1].contaminantes[4].datosMensuales['julio'] = 0;
    this.salidasDeAgua[1].contaminantes[4].datosMensuales['agosto'] = 0;
    this.salidasDeAgua[1].contaminantes[4].datosMensuales['septiembre'] = 0;
    this.salidasDeAgua[1].contaminantes[4].datosMensuales['octubre'] = 0;
    this.salidasDeAgua[1].contaminantes[4].datosMensuales['noviembre'] = 0;
    this.salidasDeAgua[1].contaminantes[4].datosMensuales['diciembre'] = 0;

    this.salidasDeAgua[1].contaminantes[5].datosMensuales['enero'] = 0;
    this.salidasDeAgua[1].contaminantes[5].datosMensuales['febrero'] = 0;
    this.salidasDeAgua[1].contaminantes[5].datosMensuales['marzo'] = 0;
    this.salidasDeAgua[1].contaminantes[5].datosMensuales['abril'] = 0;
    this.salidasDeAgua[1].contaminantes[5].datosMensuales['mayo'] = 0;
    this.salidasDeAgua[1].contaminantes[5].datosMensuales['junio'] = 0;
    this.salidasDeAgua[1].contaminantes[5].datosMensuales['julio'] = 0;
    this.salidasDeAgua[1].contaminantes[5].datosMensuales['agosto'] = 0;
    this.salidasDeAgua[1].contaminantes[5].datosMensuales['septiembre'] = 0;
    this.salidasDeAgua[1].contaminantes[5].datosMensuales['octubre'] = 0;
    this.salidasDeAgua[1].contaminantes[5].datosMensuales['noviembre'] = 0;
    this.salidasDeAgua[1].contaminantes[5].datosMensuales['diciembre'] = 0;

    this.salidasDeAgua[1].contaminantes[6].datosMensuales['enero'] = 0.13;
    this.salidasDeAgua[1].contaminantes[6].datosMensuales['febrero'] = 0.29;
    this.salidasDeAgua[1].contaminantes[6].datosMensuales['marzo'] = 0.23;
    this.salidasDeAgua[1].contaminantes[6].datosMensuales['abril'] = 0.28;
    this.salidasDeAgua[1].contaminantes[6].datosMensuales['mayo'] = 0.42;
    this.salidasDeAgua[1].contaminantes[6].datosMensuales['junio'] = 0.34;
    this.salidasDeAgua[1].contaminantes[6].datosMensuales['julio'] = 0.12;
    this.salidasDeAgua[1].contaminantes[6].datosMensuales['agosto'] = 0.49;
    this.salidasDeAgua[1].contaminantes[6].datosMensuales['septiembre'] = 0.44;
    this.salidasDeAgua[1].contaminantes[6].datosMensuales['octubre'] = 0.48;
    this.salidasDeAgua[1].contaminantes[6].datosMensuales['noviembre'] = 0.17;
    this.salidasDeAgua[1].contaminantes[6].datosMensuales['diciembre'] = 0.39;

    this.salidasDeAgua[1].contaminantes[7].datosMensuales['enero'] = 0.004;
    this.salidasDeAgua[1].contaminantes[7].datosMensuales['febrero'] = 0.0041;
    this.salidasDeAgua[1].contaminantes[7].datosMensuales['marzo'] = 0.0017;
    this.salidasDeAgua[1].contaminantes[7].datosMensuales['abril'] = 0.006;
    this.salidasDeAgua[1].contaminantes[7].datosMensuales['mayo'] = 0.0069;
    this.salidasDeAgua[1].contaminantes[7].datosMensuales['junio'] = 0.0084;
    this.salidasDeAgua[1].contaminantes[7].datosMensuales['julio'] = 0.0061;
    this.salidasDeAgua[1].contaminantes[7].datosMensuales['agosto'] = 0.004;
    this.salidasDeAgua[1].contaminantes[7].datosMensuales['septiembre'] = 0;
    this.salidasDeAgua[1].contaminantes[7].datosMensuales['octubre'] = 0.0023;
    this.salidasDeAgua[1].contaminantes[7].datosMensuales['noviembre'] = 0.0028;
    this.salidasDeAgua[1].contaminantes[7].datosMensuales['diciembre'] = 0.0028;

    this.salidasDeAgua[1].contaminantes[8].datosMensuales['enero'] = 0.0306;
    this.salidasDeAgua[1].contaminantes[8].datosMensuales['febrero'] = 0.0107;
    this.salidasDeAgua[1].contaminantes[8].datosMensuales['marzo'] = 0.0297;
    this.salidasDeAgua[1].contaminantes[8].datosMensuales['abril'] = 0.023;
    this.salidasDeAgua[1].contaminantes[8].datosMensuales['mayo'] = 0.0159;
    this.salidasDeAgua[1].contaminantes[8].datosMensuales['junio'] = 0.0101;
    this.salidasDeAgua[1].contaminantes[8].datosMensuales['julio'] = 0.0309;
    this.salidasDeAgua[1].contaminantes[8].datosMensuales['agosto'] = 0.0356;
    this.salidasDeAgua[1].contaminantes[8].datosMensuales[
      'septiembre'
    ] = 0.0428;
    this.salidasDeAgua[1].contaminantes[8].datosMensuales['octubre'] = 0.0422;
    this.salidasDeAgua[1].contaminantes[8].datosMensuales['noviembre'] = 0.0172;
    this.salidasDeAgua[1].contaminantes[8].datosMensuales['diciembre'] = 0.0174;

    this.salidasDeAgua[1].contaminantes[9].datosMensuales['enero'] = 0.5;
    this.salidasDeAgua[1].contaminantes[9].datosMensuales['febrero'] = 0.64;
    this.salidasDeAgua[1].contaminantes[9].datosMensuales['marzo'] = 0.28;
    this.salidasDeAgua[1].contaminantes[9].datosMensuales['abril'] = 0.34;
    this.salidasDeAgua[1].contaminantes[9].datosMensuales['mayo'] = 0.79;
    this.salidasDeAgua[1].contaminantes[9].datosMensuales['junio'] = 0.56;
    this.salidasDeAgua[1].contaminantes[9].datosMensuales['julio'] = 0.54;
    this.salidasDeAgua[1].contaminantes[9].datosMensuales['agosto'] = 0.6;
    this.salidasDeAgua[1].contaminantes[9].datosMensuales['septiembre'] = 0.7;
    this.salidasDeAgua[1].contaminantes[9].datosMensuales['octubre'] = 0.54;
    this.salidasDeAgua[1].contaminantes[9].datosMensuales['noviembre'] = 0.14;
    this.salidasDeAgua[1].contaminantes[9].datosMensuales['diciembre'] = 0.42;

    this.salidasDeAgua[1].contaminantes[10].datosMensuales['enero'] = 0.00018;
    this.salidasDeAgua[1].contaminantes[10].datosMensuales['febrero'] = 0.00095;
    this.salidasDeAgua[1].contaminantes[10].datosMensuales['marzo'] = 0.0005;
    this.salidasDeAgua[1].contaminantes[10].datosMensuales['abril'] = 0.00093;
    this.salidasDeAgua[1].contaminantes[10].datosMensuales['mayo'] = 0.00056;
    this.salidasDeAgua[1].contaminantes[10].datosMensuales['junio'] = 0.00054;
    this.salidasDeAgua[1].contaminantes[10].datosMensuales['julio'] = 0.00097;
    this.salidasDeAgua[1].contaminantes[10].datosMensuales['agosto'] = 0.00037;
    this.salidasDeAgua[1].contaminantes[10].datosMensuales[
      'septiembre'
    ] = 0.00013;
    this.salidasDeAgua[1].contaminantes[10].datosMensuales['octubre'] = 0.00012;
    this.salidasDeAgua[1].contaminantes[10].datosMensuales[
      'noviembre'
    ] = 0.00081;
    this.salidasDeAgua[1].contaminantes[10].datosMensuales[
      'diciembre'
    ] = 0.00096;

    this.salidasDeAgua[1].contaminantes[11].datosMensuales['enero'] = 0.036;
    this.salidasDeAgua[1].contaminantes[11].datosMensuales['febrero'] = 0.013;
    this.salidasDeAgua[1].contaminantes[11].datosMensuales['marzo'] = 0.1;
    this.salidasDeAgua[1].contaminantes[11].datosMensuales['abril'] = 0.006;
    this.salidasDeAgua[1].contaminantes[11].datosMensuales['mayo'] = 0.08;
    this.salidasDeAgua[1].contaminantes[11].datosMensuales['junio'] = 0.097;
    this.salidasDeAgua[1].contaminantes[11].datosMensuales['julio'] = 0.058;
    this.salidasDeAgua[1].contaminantes[11].datosMensuales['agosto'] = 0.059;
    this.salidasDeAgua[1].contaminantes[11].datosMensuales[
      'septiembre'
    ] = 0.1;
    this.salidasDeAgua[1].contaminantes[11].datosMensuales['octubre'] = 0.042;
    this.salidasDeAgua[1].contaminantes[11].datosMensuales['noviembre'] = 0.076;
    this.salidasDeAgua[1].contaminantes[11].datosMensuales['diciembre'] = 0.048;

    this.salidasDeAgua[1].contaminantes[12].datosMensuales['enero'] = 0.008;
    this.salidasDeAgua[1].contaminantes[12].datosMensuales['febrero'] = 0.12;
    this.salidasDeAgua[1].contaminantes[12].datosMensuales['marzo'] = 0.087;
    this.salidasDeAgua[1].contaminantes[12].datosMensuales['abril'] = 0.002;
    this.salidasDeAgua[1].contaminantes[12].datosMensuales['mayo'] = 0.14;
    this.salidasDeAgua[1].contaminantes[12].datosMensuales['junio'] = 0.181;
    this.salidasDeAgua[1].contaminantes[12].datosMensuales['julio'] = 0.093;
    this.salidasDeAgua[1].contaminantes[12].datosMensuales['agosto'] = 0.064;
    this.salidasDeAgua[1].contaminantes[12].datosMensuales[
      'septiembre'
    ] = 0.036;
    this.salidasDeAgua[1].contaminantes[12].datosMensuales['octubre'] = 0.091;
    this.salidasDeAgua[1].contaminantes[12].datosMensuales['noviembre'] = 0.041;
    this.salidasDeAgua[1].contaminantes[12].datosMensuales['diciembre'] = 0.006;

    this.salidasDeAgua[1].contaminantes[13].datosMensuales['enero'] = 0.77;
    this.salidasDeAgua[1].contaminantes[13].datosMensuales['febrero'] = 0.78;
    this.salidasDeAgua[1].contaminantes[13].datosMensuales['marzo'] = 0.3;
    this.salidasDeAgua[1].contaminantes[13].datosMensuales['abril'] = 0.02;
    this.salidasDeAgua[1].contaminantes[13].datosMensuales['mayo'] = 0.53;
    this.salidasDeAgua[1].contaminantes[13].datosMensuales['junio'] = 0.35;
    this.salidasDeAgua[1].contaminantes[13].datosMensuales['julio'] = 0.9;
    this.salidasDeAgua[1].contaminantes[13].datosMensuales['agosto'] = 0.32;
    this.salidasDeAgua[1].contaminantes[13].datosMensuales['septiembre'] = 0.47;
    this.salidasDeAgua[1].contaminantes[13].datosMensuales['octubre'] = 0.07;
    this.salidasDeAgua[1].contaminantes[13].datosMensuales['noviembre'] = 0.61;
    this.salidasDeAgua[1].contaminantes[13].datosMensuales['diciembre'] = 0.06;

    this.salidasDeAgua[1].contaminantes[14].datosMensuales['enero'] = 0.00818;
    this.salidasDeAgua[1].contaminantes[14].datosMensuales['febrero'] = 0.00546;
    this.salidasDeAgua[1].contaminantes[14].datosMensuales['marzo'] = 0.00114;
    this.salidasDeAgua[1].contaminantes[14].datosMensuales['abril'] = 0.00512;
    this.salidasDeAgua[1].contaminantes[14].datosMensuales['mayo'] = 0.00534;
    this.salidasDeAgua[1].contaminantes[14].datosMensuales['junio'] = 0.00067;
    this.salidasDeAgua[1].contaminantes[14].datosMensuales['julio'] = 0.00091;
    this.salidasDeAgua[1].contaminantes[14].datosMensuales['agosto'] = 0.00442;
    this.salidasDeAgua[1].contaminantes[14].datosMensuales[
      'septiembre'
    ] = 0.00204;
    this.salidasDeAgua[1].contaminantes[14].datosMensuales['octubre'] = 0.00559;
    this.salidasDeAgua[1].contaminantes[14].datosMensuales[
      'noviembre'
    ] = 0.00583;
    this.salidasDeAgua[1].contaminantes[14].datosMensuales[
      'diciembre'
    ] = 0.00552;

 */
  }

  // Método para avanzar al siguiente paso
  nextStep() {
    this.guardarDatos();
    this.prevStep = this.currentStep;
    this.nexStep = this.currentStep + 1;
    this.currentStep = this.nexStep;
    this.cargarDatos();
    window.scrollTo(0, 0);
  }

  // Método para retroceder al paso anterior
  previousStep() {
    // this.guardarDatos();
    this.prevStep = this.currentStep;
    this.nexStep = this.currentStep - 1;
    this.currentStep = this.nexStep;
    this.cargarDatos();
    window.scrollTo(0, 0);
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

    let totalEntradas: { [key: string]: number } = {};
    let totalsalidas: { [key: string]: number } = {};
    let totalContaminantes: { [key: string]: number } = {};

    let totales: { [key: string]: number } = {
      toxixidadHumana: 0,
      ecotoxicidad: 0,
      eutrofizacion: 0,
      availableWaterRemainingAware: 0,

      potencialesImpactosSalud: 0,
      enfermedadesPorToxicidad: 0,
      disminucionBiodiversidadTerrestre: 0,
      ecosistemasAcuaticosAfectadosPorEcotoxicidad: 0,
      ecosistemasAcuaticosAfectadosPorEutrofizacion: 0,

      disminucionBiodiversidadPlantas: 0,
    };

    /* this.salidasDeAgua.forEach((salida) => {
      salida.contaminantes.forEach((contaminante) => {

      });
    }); */

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
        ((ecotoxicidad1 + ecotoxicidad2) / totales.ecotoxicidadTotal) *
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
        categoria: fuente.categoria,
        fuente: fuente.nombre,
        total: fuente.total,
        promedio: fuente.promedio.toFixed(6),
        porcentaje: 0,
        disminucionBiodiversidadPlantas: fuente.disminucionBiodiversidadPlantas,
        disminucionBiodiversidadPlantasPorcentaje: 0,
      });

      totales['disminucionBiodiversidadPlantas'] +=
        fuente.disminucionBiodiversidadPlantas;

      if (!totalEntradas[fuente.categoria]) {
        totalEntradas[fuente.categoria] = 0;
      }

      totalEntradas[fuente.categoria] += fuente.total;
    });

    const salidasAgua: SalidaAgua[] = [];
    this.salidasDeAgua.forEach((salida) => {
      // saca los totales
      if (!totalsalidas[salida.categoria]) {
        totalsalidas[salida.categoria] = 0;
      }
      totalsalidas[salida.categoria] += salida.total;

      salida.contaminantes.forEach((contaminante) => {
        if (!totalContaminantes[contaminante.abreviacion]) {
          totalContaminantes[contaminante.abreviacion] = 0;
        }
        totalContaminantes[contaminante.abreviacion] += contaminante.valor;
      });

      totales['toxixidadHumana'] += salida.toxixidadHumana;
      totales['ecotoxicidad'] += salida.ecotoxicidad;
      totales['eutrofizacion'] += salida.eutrofizacion;
      totales['availableWaterRemainingAware'] +=
        salida.availableWaterRemainingAware;

      totales['potencialesImpactosSalud'] += salida.potencialesImpactosSalud;
      totales['enfermedadesPorToxicidad'] += salida.enfermedadesPorToxicidad;
      totales['disminucionBiodiversidadTerrestre'] +=
        salida.disminucionBiodiversidadTerrestre;
      totales['ecosistemasAcuaticosAfectadosPorEcotoxicidad'] +=
        salida.ecosistemasAcuaticosAfectadosPorEcotoxicidad;
      totales['ecosistemasAcuaticosAfectadosPorEutrofizacion'] +=
        salida.ecosistemasAcuaticosAfectadosPorEutrofizacion;

      const estaSalida: SalidaAgua = {
        nombre: salida.nombre,
        proceso: salida.proceso,
        categoria: salida.categoria,
        total: parseFloat(salida.total.toFixed(6)),
        promedio: parseFloat(salida.promedio.toFixed(6)),
        contaminantes: salida.contaminantes,
        availableWaterRemainingAware: salida.availableWaterRemainingAware,

        toxixidadHumana: salida.toxixidadHumana,
        ecotoxicidad: salida.ecotoxicidad,
        eutrofizacion: salida.eutrofizacion,

        potencialesImpactosSalud: salida.potencialesImpactosSalud,
        enfermedadesPorToxicidad: salida.enfermedadesPorToxicidad,
        disminucionBiodiversidadTerrestre:
          salida.disminucionBiodiversidadTerrestre,
        ecosistemasAcuaticosAfectadosPorEcotoxicidad:
          salida.ecosistemasAcuaticosAfectadosPorEcotoxicidad,
        ecosistemasAcuaticosAfectadosPorEutrofizacion:
          salida.ecosistemasAcuaticosAfectadosPorEutrofizacion,

        potencialesImpactosSaludPorcentaje: 0,
        enfermedadesPorToxicidadPorcentaje: 0,
        disminucionBiodiversidadTerrestrePorcentaje: 0,
        ecosistemasAcuaticosAfectadosPorEcotoxicidadPorcentaje: 0,
        ecosistemasAcuaticosAfectadosPorEutrofizacionPorcentaje: 0,

        toxixidadHumanaPorcentaje: 0,
        ecotoxicidadPorcentaje: 0,
        eutrofizacionPorcentaje: 0,
        porcentaje: 0,
        availableWaterRemainingAwarePorcentaje: 0,
      };
      salidasAgua.push(estaSalida);
    });

    let porcentajesEntradas: { [key: string]: number } = {};
    let porcentajesSalidas: { [key: string]: number } = {};
    // let porcentajesContaminantes: { [key: string]: number } = {};
    // let porcentajesFuentesTotal: { [key: string]: number } = {};
    // let porcentajesSalidasTotal: { [key: string]: number } = {};
    // let porcentajesContaminantesTotal: { [key: string]: number } = {};

    entradasAgua.forEach((entrada) => {
      entrada.porcentaje = totalEntradas[entrada.categoria]
        ? (entrada.total / totalEntradas[entrada.categoria]) * 100
        : 0;
      entrada.disminucionBiodiversidadPlantasPorcentaje = totales[
        'disminucionBiodiversidadPlantas'
      ]
        ? (entrada.disminucionBiodiversidadPlantas /
            totales['disminucionBiodiversidadPlantas']) *
          100
        : 0;
    });

    salidasAgua.forEach((salida) => {
      salida.contaminantes.forEach((contaminante) => {
        contaminante.porcentaje = totalContaminantes[contaminante.abreviacion]
          ? (contaminante.valor /
              totalContaminantes[contaminante.abreviacion]) *
            100
          : 0;
      });

      salida.porcentaje = totalsalidas[salida.categoria]
        ? (salida.total / totalsalidas[salida.categoria]) * 100
        : 0;
      salida.toxixidadHumanaPorcentaje = totales['toxixidadHumana']
        ? (salida.toxixidadHumana / totales['toxixidadHumana']) * 100
        : 0;
      salida.ecotoxicidadPorcentaje = totales['ecotoxicidad']
        ? (salida.ecotoxicidad / totales['ecotoxicidad']) * 100
        : 0;
      salida.eutrofizacionPorcentaje = totales['eutrofizacion']
        ? (salida.eutrofizacion / totales['eutrofizacion']) * 100
        : 0;
      salida.enfermedadesPorToxicidadPorcentaje = totales[
        'enfermedadesPorToxicidad'
      ]
        ? (salida.enfermedadesPorToxicidad /
            totales['enfermedadesPorToxicidad']) *
          100
        : 0;

      salida.disminucionBiodiversidadTerrestrePorcentaje = totales[
        'disminucionBiodiversidadTerrestre'
      ]
        ? (salida.disminucionBiodiversidadTerrestre /
            totales['disminucionBiodiversidadTerrestre']) *
          100
        : 0;

      salida.ecosistemasAcuaticosAfectadosPorEcotoxicidadPorcentaje = totales[
        'ecosistemasAcuaticosAfectadosPorEcotoxicidad'
      ]
        ? (salida.ecosistemasAcuaticosAfectadosPorEcotoxicidad /
            totales['ecosistemasAcuaticosAfectadosPorEcotoxicidad']) *
          100
        : 0;
      salida.ecosistemasAcuaticosAfectadosPorEutrofizacionPorcentaje = totales[
        'ecosistemasAcuaticosAfectadosPorEutrofizacion'
      ]
        ? (salida.ecosistemasAcuaticosAfectadosPorEutrofizacion /
            totales['ecosistemasAcuaticosAfectadosPorEutrofizacion']) *
          100
        : 0;
      salida.availableWaterRemainingAwarePorcentaje = totales[
        'availableWaterRemainingAware'
      ]
        ? (salida.availableWaterRemainingAware /
            totales['availableWaterRemainingAware']) *
          100
        : 0;
      salida.potencialesImpactosSaludPorcentaje = totales[
        'potencialesImpactosSalud'
      ]
        ? (salida.potencialesImpactosSalud /
            totales['potencialesImpactosSalud']) *
          100
        : 0;
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
      contaminantes: this.contaminantes,
      salidasDeAgua: salidasAgua,
      totales: {
        ...totales,
        totalEntradas,
        totalsalidas,
        totalContaminantes,
      },
      porcentajes: {
        porcentajesEntradas,
        porcentajesSalidas,
        // porcentajesContaminantes,
      },

      // totalesPorcentaje,
    };

    console.log(dataLista);

    this.router.navigate(['/resumen'], { state: { data: dataLista } });
  }

  calculaEntradaAgua() {
    this.fuentesDeAgua.forEach((fuente) => {
      const valoresMensuales = Object.values(fuente.datosMensuales);
      const total = valoresMensuales.reduce((acc, val) => acc + val, 0);
      fuente.total = total;
      fuente.promedio = fuente.total / 12; // Promedio mensual
      if (fuente.categoria != 'ENTRADA AGUA SUPERFICIAL') {
        fuente.disminucionBiodiversidadPlantas = total * 0.21 * 0.5;
      }
    });
  }

  calculaSalidasAgua() {
    this.salidasDeAgua.forEach((salida) => {
      const valoresMensuales = Object.values(salida.datosMensuales);
      salida.total = valoresMensuales.reduce((acc, val) => acc + val, 0); // Suma de todos los meses
      salida.promedio = salida.total / 12; // Promedio mensual

      salida.availableWaterRemainingAware = 0;
      salida.potencialesImpactosSalud = 0;
      salida.disminucionBiodiversidadTerrestre = 0;

      if (salida.categoria == 'AGUA DULCE CONSUMIDA (HUELLA AZUL - WFN)') {
        salida.availableWaterRemainingAware = salida.total * this.aware100;
        salida.potencialesImpactosSalud = salida.total * this.UNEP_SETAC_2017;
        salida.disminucionBiodiversidadTerrestre =
          salida.total * this.Pfister_et_al_2009;
      }
    });
  }

  calculaContaminantes() {
    this.salidasDeAgua.forEach((salida) => {
      salida.toxixidadHumana = 0;
      salida.ecotoxicidad = 0;
      salida.eutrofizacion = 0;

      salida.enfermedadesPorToxicidad = 0;
      salida.ecosistemasAcuaticosAfectadosPorEcotoxicidad = 0;
      salida.ecosistemasAcuaticosAfectadosPorEutrofizacion = 0;

      // salida.disminucionBiodiversidadTerrestrePlantas= 0;

      salida.contaminantes.forEach((contaminante) => {
        const valoresMensuales = Object.values(contaminante.datosMensuales);
        contaminante.min = Math.min(...valoresMensuales);
        contaminante.max = Math.max(...valoresMensuales);
        const suma = valoresMensuales.reduce((acc, val) => acc + val, 0);
        contaminante.total = suma;
        contaminante.promedio = suma / 12;
        contaminante.valor = (contaminante.promedio * salida.total) / 1000;

        if (this.toxixidadHumana[contaminante.abreviacion]) {
          salida.toxixidadHumana +=
            contaminante.valor * this.toxixidadHumana[contaminante.abreviacion];
        }

        if (this.ecotoxicidad[contaminante.abreviacion]) {
          salida.ecotoxicidad +=
            contaminante.valor * this.ecotoxicidad[contaminante.abreviacion];
        }

        if (this.eutrofizacion[contaminante.abreviacion]) {
          salida.eutrofizacion +=
            contaminante.valor * this.eutrofizacion[contaminante.abreviacion];
        }

        if (this.toxixidadHumanaFinal[contaminante.abreviacion]) {
          salida.enfermedadesPorToxicidad +=
            contaminante.valor *
            this.toxixidadHumanaFinal[contaminante.abreviacion];
        }
      });

      salida.ecosistemasAcuaticosAfectadosPorEcotoxicidad +=
        salida.ecotoxicidad * this.ecotoxicidadMedioFinal;

      salida.ecosistemasAcuaticosAfectadosPorEutrofizacion +=
        salida.eutrofizacion * this.desconocidoFinal;
    });

    console.log(this.salidasDeAgua);
  }

  agregarNuevaFuenteAgua() {
    const nuevaFuente = {
      nombre: `Agua Potable ${
        this.fuentesDeAgua.filter((f) => f.categoria === 'ENTRADA AGUA POTABLE')
          .length + 1
      }`,
      uso: 'Sistemas Sanitarios',
      categoria: 'ENTRADA AGUA POTABLE',
      datosMensuales: {
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
      },
      total: 0,
      promedio: 0,
      valor: 0,
      disminucionBiodiversidadPlantas: 0,
      disminucionBiodiversidadPlantasPorcentaje: 0,
    };

    this.fuentesDeAgua.push(nuevaFuente);
  }

  agregarNuevaSalidaAgua() {
    const nuevaSalida = {
      nombre: `Nueva Salida ${this.salidasDeAgua.length + 1}`,
      proceso: 'Producción',
      categoria: 'SALIDA AGUA DESCARGADA',
      datosMensuales: { ...this.datosMensuales } as DatosMensuales,
      total: 0,
      promedio: 0,
      valor: 0,
      consumida: false,
      contaminantes: [],
      toxixidadHumana: 0,
      ecotoxicidad: 0,
      eutrofizacion: 0,
      availableWaterRemainingAware: 0,
      potencialesImpactosSalud: 0,
      enfermedadesPorToxicidad: 0,
      disminucionBiodiversidadTerrestre: 0,
      ecosistemasAcuaticosAfectadosPorEcotoxicidad: 0,
      ecosistemasAcuaticosAfectadosPorEutrofizacion: 0,

      toxixidadHumanaPrcentaje: 0,
      ecotoxicidadPrcentaje: 0,
      eutrofizacionPrcentaje: 0,
      availableWaterRemainingAwarePrcentaje: 0,
      potencialesImpactosSaludPrcentaje: 0,
      enfermedadesPorToxicidadPrcentaje: 0,
      disminucionBiodiversidadTerrestrePrcentaje: 0,
      ecosistemasAcuaticosAfectadosPorEcotoxicidadPrcentaje: 0,
      ecosistemasAcuaticosAfectadosPorEutrofizacionPrcentaje: 0,
    };

    this.salidasDeAgua.push(nuevaSalida);
  }

  onCategoriaChange(salida: SalidaAgua, categoria: string | null): void {
    if (!categoria) {
      return;
    }
    salida.categoria = categoria;
    if (
      categoria === 'SALIDA AGUA DESCARGADA' ||
      categoria === 'SALIDA AGUA INFILTRADA'
    ) {
      salida.contaminantes = this.cloneContaminantes();
    } else if (categoria === 'AGUA DULCE CONSUMIDA (HUELLA AZUL - WFN)') {
      salida.contaminantes = [];
    }
  }
}
