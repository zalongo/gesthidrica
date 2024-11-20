import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
// import { GoogleSheetsService } from '../services/google-sheets.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-calcular-huella',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './calcular-huella.component.html',
    styleUrls: ['./calcular-huella.component.css'],
})
export class CalcularHuellaComponent {
    currentStep: number = 1;
    isLoggedIn: boolean = false;

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
    aguaPotableMensualUso: string = 'Sistemas Sanitarios';
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
    aguaPotableMensualTotal: number = 0;
    aguaPotableMensualPromedio: number = 0;

    // Datos de entrada de agua de pozo mensual
    aguaPozoFuenteUso: string = 'Producción';
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
    aguaPozoTotal: number = 0;
    aguaPozoPromedio: number = 0;

    // Datos de entrada de agua dulce de fuentes superficiales mensual
    aguaSuperficialFuenteUso: string = 'Producción';
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
    aguaSuperficialTotal: number = 0;
    aguaSuperficialPromedio: number = 0;

    // Datos de salida de agua descargada mensual
    salidaAguaDescargadaProceso: string = 'Producción';
    salidaAguaDescargadaEnero: number = 0;
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
    salidaAguaDescargadaTotal: number = 0;
    salidaAguaDescargadaPromedio: number = 0;

    //dATOS DER SALIDA DE AGUA INFILTRADA MENSUAL
    salidaAguaInfiltradaProceso: string = 'Producción';
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
    salidaAguaInfiltradaTotal: number = 0;
    salidaAguaInfiltradaPromedio: number = 0;

    // Datos de salida de agua consumida mensual
    salidaAguaConsumidaProceso: string = 'Producción';
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
    salidaAguaConsumidaTotal: number = 0;
    salidaAguaConsumidaPromedio: number = 0;

    //DatosUltimaPaginaF1
    nitrogenoEnero1: number = 0;
    nitrogenoFebrero1: number = 0;
    nitrogenoMarzo1: number = 0;
    nitrogenoAbril1: number = 0;
    nitrogenoMayo1: number = 0;
    nitrogenoJunio1: number = 0;
    nitrogenoJulio1: number = 0;
    nitrogenoAgosto1: number = 0;
    nitrogenoSeptiembre1: number = 0;
    nitrogenoOctubre1: number = 0;
    nitrogenoNoviembre1: number = 0;
    nitrogenoDiciembre1: number = 0;
    nitrogeno1Min: number = 0;
    nitrogeno1Max: number = 0;
    nitrogeno1Promedio: number = 0;

    nitrogenoEnero2: number = 0;
    nitrogenoFebrero2: number = 0;
    nitrogenoMarzo2: number = 0;
    nitrogenoAbril2: number = 0;
    nitrogenoMayo2: number = 0;
    nitrogenoJunio2: number = 0;
    nitrogenoJulio2: number = 0;
    nitrogenoAgosto2: number = 0;
    nitrogenoSeptiembre2: number = 0;
    nitrogenoOctubre2: number = 0;
    nitrogenoNoviembre2: number = 0;
    nitrogenoDiciembre2: number = 0;
    nitrogeno2Min: number = 0;
    nitrogeno2Max: number = 0;
    nitrogeno2Promedio: number = 0;

    nitrogenoEnero3: number = 0;
    nitrogenoFebrero3: number = 0;
    nitrogenoMarzo3: number = 0;
    nitrogenoAbril3: number = 0;
    nitrogenoMayo3: number = 0;
    nitrogenoJunio3: number = 0;
    nitrogenoJulio3: number = 0;
    nitrogenoAgosto3: number = 0;
    nitrogenoSeptiembre3: number = 0;
    nitrogenoOctubre3: number = 0;
    nitrogenoNoviembre3: number = 0;
    nitrogenoDiciembre3: number = 0;
    nitrogeno3Min: number = 0;
    nitrogeno3Max: number = 0;
    nitrogeno3Promedio: number = 0;

    //DatosUltimaPagF2
    nitrogenoKjeldahlEnero1: number = 0;
    nitrogenoKjeldahlFebrero1: number = 0;
    nitrogenoKjeldahlMarzo1: number = 0;
    nitrogenoKjeldahlAbril1: number = 0;
    nitrogenoKjeldahlMayo1: number = 0;
    nitrogenoKjeldahlJunio1: number = 0;
    nitrogenoKjeldahlJulio1: number = 0;
    nitrogenoKjeldahlAgosto1: number = 0;
    nitrogenoKjeldahlSeptiembre1: number = 0;
    nitrogenoKjeldahlOctubre1: number = 0;
    nitrogenoKjeldahlNoviembre1: number = 0;
    nitrogenoKjeldahlDiciembre1: number = 0;
    nitrogenoKjeldahl1Min: number = 0;
    nitrogenoKjeldahl1Max: number = 0;
    nitrogenoKjeldahl1Promedio: number = 0;

    nitrogenoKjeldahlEnero2: number =0;
    nitrogenoKjeldahlFebrero2: number =0;
    nitrogenoKjeldahlMarzo2: number =0;
    nitrogenoKjeldahlAbril2: number =0;
    nitrogenoKjeldahlMayo2: number = 0;
    nitrogenoKjeldahlJunio2: number =0;
    nitrogenoKjeldahlJulio2: number =0;
    nitrogenoKjeldahlAgosto2: number =0;
    nitrogenoKjeldahlSeptiembre2: number =0;
    nitrogenoKjeldahlOctubre2: number =0;
    nitrogenoKjeldahlNoviembre2: number =0;
    nitrogenoKjeldahlDiciembre2: number =0;
    nitrogenoKjeldahl2Min: number = 0;
    nitrogenoKjeldahl2Max: number = 0;
    nitrogenoKjeldahl2Promedio: number = 0;

    nitrogenoKjeldahlEnero3: number = 0;
    nitrogenoKjeldahlFebrero3: number = 0;
    nitrogenoKjeldahlMarzo3: number = 0;
    nitrogenoKjeldahlAbril3: number = 0;
    nitrogenoKjeldahlMayo3: number = 0;
    nitrogenoKjeldahlJunio3: number = 0;
    nitrogenoKjeldahlJulio3: number = 0;
    nitrogenoKjeldahlAgosto3: number = 0;
    nitrogenoKjeldahlSeptiembre3: number = 0;
    nitrogenoKjeldahlOctubre3: number = 0;
    nitrogenoKjeldahlNoviembre3: number = 0;
    nitrogenoKjeldahlDiciembre3: number = 0;
    nitrogenoKjeldahl3Min: number = 0;
    nitrogenoKjeldahl3Max: number = 0;
    nitrogenoKjeldahl3Promedio: number = 0;

    //DatosUltimaPagF3
    fosforoTotalEnero1: number = 0;
    fosforoTotalFebrero1: number = 0;
    fosforoTotalMarzo1: number = 0;
    fosforoTotalAbril1: number = 0;
    fosforoTotalMayo1: number = 0;
    fosforoTotalJunio1: number = 0;
    fosforoTotalJulio1: number = 0;
    fosforoTotalAgosto1: number = 0;
    fosforoTotalSeptiembre1: number = 0;
    fosforoTotalOctubre1: number = 0;
    fosforoTotalNoviembre1: number = 0;
    fosforoTotalDiciembre1: number = 0;
    fosforoTotal1Min: number = 0;
    fosforoTotal1Max: number = 0;
    fosforoTotal1Promedio: number = 0;

    fosforoTotalEnero2: number = 0;
    fosforoTotalFebrero2: number = 0;
    fosforoTotalMarzo2: number = 0;
    fosforoTotalAbril2: number = 0;
    fosforoTotalMayo2: number = 0;
    fosforoTotalJunio2: number = 0;
    fosforoTotalJulio2: number = 0;
    fosforoTotalAgosto2: number = 0;
    fosforoTotalSeptiembre2: number = 0;
    fosforoTotalOctubre2: number = 0;
    fosforoTotalNoviembre2: number = 0;
    fosforoTotalDiciembre2: number = 0;
    fosforoTotal2Min: number = 0;
    fosforoTotal2Max: number = 0;
    fosforoTotal2Promedio: number = 0;

    fosforoTotalEnero3: number = 0;
    fosforoTotalFebrero3: number = 0;
    fosforoTotalMarzo3: number = 0;
    fosforoTotalAbril3: number = 0;
    fosforoTotalMayo3: number = 0;
    fosforoTotalJunio3: number = 0;
    fosforoTotalJulio3: number = 0;
    fosforoTotalAgosto3: number = 0;
    fosforoTotalSeptiembre3: number = 0;
    fosforoTotalOctubre3: number = 0;
    fosforoTotalNoviembre3: number = 0;
    fosforoTotalDiciembre3: number = 0;
    fosforoTotal3Min: number = 0;
    fosforoTotal3Max: number = 0;
    fosforoTotal3Promedio: number = 0;

    //DatosUltimaPagF4
    fosfatoEnero1: number = 0;
    fosfatoFebrero1: number = 0;
    fosfatoMarzo1: number = 0;
    fosfatoAbril1: number = 0;
    fosfatoMayo1: number = 0;
    fosfatoJunio1: number = 0;
    fosfatoJulio1: number = 0;
    fosfatoAgosto1: number = 0;
    fosfatoSeptiembre1: number = 0;
    fosfatoOctubre1: number = 0;
    fosfatoNoviembre1: number = 0;
    fosfatoDiciembre1: number = 0;
    fosfato1Min: number = 0;
    fosfato1Max: number = 0;
    fosfato1Promedio: number = 0;

    fosfatoEnero2: number = 0;
    fosfatoFebrero2: number = 0;
    fosfatoMarzo2: number = 0;
    fosfatoAbril2: number = 0;
    fosfatoMayo2: number = 0;
    fosfatoJunio2: number = 0;
    fosfatoJulio2: number = 0;
    fosfatoAgosto2: number = 0;
    fosfatoSeptiembre2: number = 0;
    fosfatoOctubre2: number = 0;
    fosfatoNoviembre2: number = 0;
    fosfatoDiciembre2: number = 0;
    fosfato2Min: number = 0;
    fosfato2Max: number = 0;
    fosfato2Promedio: number = 0;

    fosfatoEnero3: number = 0;
    fosfatoFebrero3: number = 0;
    fosfatoMarzo3: number = 0;
    fosfatoAbril3: number = 0;
    fosfatoMayo3: number = 0;
    fosfatoJunio3: number = 0;
    fosfatoJulio3: number = 0;
    fosfatoAgosto3: number = 0;
    fosfatoSeptiembre3: number = 0;
    fosfatoOctubre3: number = 0;
    fosfatoNoviembre3: number = 0;
    fosfatoDiciembre3: number = 0;
    fosfato3Min: number = 0;
    fosfato3Max: number = 0;
    fosfato3Promedio: number = 0;

    //DatosUltimaPagF5
    dqoEnero1: number = 0;
    dqoFebrero1: number = 0;
    dqoMarzo1: number = 0;
    dqoAbril1: number = 0;
    dqoMayo1: number = 0;
    dqoJunio1: number = 0;
    dqoJulio1: number = 0;
    dqoAgosto1: number = 0;
    dqoSeptiembre1: number = 0;
    dqoOctubre1: number = 0;
    dqoNoviembre1: number = 0;
    dqoDiciembre1: number = 0;
    dqo1Min: number = 0;
    dqo1Max: number = 0;
    dqo1Promedio: number = 0;

    dqoEnero2: number = 0;
    dqoFebrero2: number = 0;
    dqoMarzo2: number = 0;
    dqoAbril2: number = 0;
    dqoMayo2: number = 0;
    dqoJunio2: number = 0;
    dqoJulio2: number = 0;
    dqoAgosto2: number = 0;
    dqoSeptiembre2: number = 0;
    dqoOctubre2: number = 0;
    dqoNoviembre2: number = 0;
    dqoDiciembre2: number = 0;
    dqo2Min: number = 0;
    dqo2Max: number = 0;
    dqo2Promedio: number = 0;

    dqoEnero3: number = 0;
    dqoFebrero3: number = 0;
    dqoMarzo3: number = 0;
    dqoAbril3: number = 0;
    dqoMayo3: number = 0;
    dqoJunio3: number = 0;
    dqoJulio3: number = 0;
    dqoAgosto3: number = 0;
    dqoSeptiembre3: number = 0;
    dqoOctubre3: number = 0;
    dqoNoviembre3: number = 0;
    dqoDiciembre3: number = 0;
    dqo3Min: number = 0;
    dqo3Max: number = 0;
    dqo3Promedio: number = 0;

    //DatosUltimaPagF6
    dboEnero1: number = 0;
    dboFebrero1: number = 0;
    dboMarzo1: number = 0;
    dboAbril1: number = 0;
    dboMayo1: number = 0;
    dboJunio1: number = 0;
    dboJulio1: number = 0;
    dboAgosto1: number = 0;
    dboSeptiembre1: number = 0;
    dboOctubre1: number = 0;
    dboNoviembre1: number = 0;
    dboDiciembre1: number = 0;
    dbo1Min: number = 0;
    dbo1Max: number = 0;
    dbo1Promedio: number = 0;

    dboEnero2: number = 0;
    dboFebrero2: number = 0;
    dboMarzo2: number = 0;
    dboAbril2: number = 0;
    dboMayo2: number = 0;
    dboJunio2: number = 0;
    dboJulio2: number = 0;
    dboAgosto2: number = 0;
    dboSeptiembre2: number = 0;
    dboOctubre2: number = 0;
    dboNoviembre2: number = 0;
    dboDiciembre2: number = 0;
    dbo2Min: number = 0;
    dbo2Max: number = 0;
    dbo2Promedio: number = 0;

    dboEnero3: number = 0;
    dboFebrero3: number = 0;
    dboMarzo3: number = 0;
    dboAbril3: number = 0;
    dboMayo3: number = 0;
    dboJunio3: number = 0;
    dboJulio3: number = 0;
    dboAgosto3: number = 0;
    dboSeptiembre3: number = 0;
    dboOctubre3: number = 0;
    dboNoviembre3: number = 0;
    dboDiciembre3: number = 0;
    dbo3Min: number = 0;
    dbo3Max: number = 0;
    dbo3Promedio: number = 0;

    //DatosUltimaPagF7
    arsenicoEnero1: number = 0;
    arsenicoFebrero1: number = 0;
    arsenicoMarzo1: number = 0;
    arsenicoAbril1: number = 0;
    arsenicoMayo1: number = 0;
    arsenicoJunio1: number = 0;
    arsenicoJulio1: number = 0;
    arsenicoAgosto1: number = 0;
    arsenicoSeptiembre1: number = 0;
    arsenicoOctubre1: number = 0;
    arsenicoNoviembre1: number = 0;
    arsenicoDiciembre1: number = 0;
    arsenico1Min: number = 0;
    arsenico1Max: number = 0;
    arsenico1Promedio: number = 0;

    arsenicoEnero2: number = 0;
    arsenicoFebrero2: number = 0;
    arsenicoMarzo2: number = 0;
    arsenicoAbril2: number = 0;
    arsenicoMayo2: number = 0;
    arsenicoJunio2: number = 0;
    arsenicoJulio2: number = 0;
    arsenicoAgosto2: number = 0;
    arsenicoSeptiembre2: number = 0;
    arsenicoOctubre2: number = 0;
    arsenicoNoviembre2: number = 0;
    arsenicoDiciembre2: number = 0;
    arsenico2Min: number = 0;
    arsenico2Max: number = 0;
    arsenico2Promedio: number = 0;

    arsenicoEnero3: number = 0;
    arsenicoFebrero3: number = 0;
    arsenicoMarzo3: number = 0;
    arsenicoAbril3: number = 0;
    arsenicoMayo3: number = 0;
    arsenicoJunio3: number = 0;
    arsenicoJulio3: number = 0;
    arsenicoAgosto3: number = 0;
    arsenicoSeptiembre3: number = 0;
    arsenicoOctubre3: number = 0;
    arsenicoNoviembre3: number = 0;
    arsenicoDiciembre3: number = 0;
    arsenico3Min: number = 0;
    arsenico3Max: number = 0;
    arsenico3Promedio: number = 0;

    //DatosUltimaPagF8
    cadmioEnero1: number = 0;
    cadmioFebrero1: number = 0;
    cadmioMarzo1: number = 0;
    cadmioAbril1: number = 0;
    cadmioMayo1: number = 0;
    cadmioJunio1: number = 0;
    cadmioJulio1: number = 0;
    cadmioAgosto1: number = 0;
    cadmioSeptiembre1: number = 0;
    cadmioOctubre1: number = 0;
    cadmioNoviembre1: number = 0;
    cadmioDiciembre1: number = 0;
    cadmio1Min: number = 0;
    cadmio1Max: number = 0;
    cadmio1Promedio: number = 0;

    cadmioEnero2: number = 0;
    cadmioFebrero2: number = 0;
    cadmioMarzo2: number = 0;
    cadmioAbril2: number = 0;
    cadmioMayo2: number = 0;
    cadmioJunio2: number = 0;
    cadmioJulio2: number = 0;
    cadmioAgosto2: number = 0;
    cadmioSeptiembre2: number = 0;
    cadmioOctubre2: number = 0;
    cadmioNoviembre2: number = 0;
    cadmioDiciembre2: number = 0;
    cadmio2Min: number = 0;
    cadmio2Max: number = 0;
    cadmio2Promedio: number = 0;

    cadmioEnero3: number = 0;
    cadmioFebrero3: number = 0;
    cadmioMarzo3: number = 0;
    cadmioAbril3: number = 0;
    cadmioMayo3: number = 0;
    cadmioJunio3: number = 0;
    cadmioJulio3: number = 0;
    cadmioAgosto3: number = 0;
    cadmioSeptiembre3: number = 0;
    cadmioOctubre3: number = 0;
    cadmioNoviembre3: number = 0;
    cadmioDiciembre3: number = 0;
    cadmio3Min: number = 0;
    cadmio3Max: number = 0;
    cadmio3Promedio: number = 0;

    //DatosUltimaPagF9
    cromoEnero1: number = 0;
    cromoFebrero1: number = 0;
    cromoMarzo1: number = 0;
    cromoAbril1: number = 0;
    cromoMayo1: number = 0;
    cromoJunio1: number = 0;
    cromoJulio1: number = 0;
    cromoAgosto1: number = 0;
    cromoSeptiembre1: number = 0;
    cromoOctubre1: number = 0;
    cromoNoviembre1: number = 0;
    cromoDiciembre1: number = 0;
    cromo1Min: number = 0;
    cromo1Max: number = 0;
    cromo1Promedio: number = 0;

    cromoEnero2: number = 0;
    cromoFebrero2: number = 0;
    cromoMarzo2: number = 0;
    cromoAbril2: number = 0;
    cromoMayo2: number = 0;
    cromoJunio2: number = 0;
    cromoJulio2: number = 0;
    cromoAgosto2: number = 0;
    cromoSeptiembre2: number = 0;
    cromoOctubre2: number = 0;
    cromoNoviembre2: number = 0;
    cromoDiciembre2: number = 0;
    cromo2Min: number = 0;
    cromo2Max: number = 0;
    cromo2Promedio: number = 0;

    cromoEnero3: number = 0;
    cromoFebrero3: number = 0;
    cromoMarzo3: number = 0;
    cromoAbril3: number = 0;
    cromoMayo3: number = 0;
    cromoJunio3: number = 0;
    cromoJulio3: number = 0;
    cromoAgosto3: number = 0;
    cromoSeptiembre3: number = 0;
    cromoOctubre3: number = 0;
    cromoNoviembre3: number = 0;
    cromoDiciembre3: number = 0;
    cromo3Min: number = 0;
    cromo3Max: number = 0;
    cromo3Promedio: number = 0;

    //DatosUltimaPagF10
    cobreEnero1: number = 0;
    cobreFebrero1: number = 0;
    cobreMarzo1: number = 0;
    cobreAbril1: number = 0;
    cobreMayo1: number = 0;
    cobreJunio1: number = 0;
    cobreJulio1: number = 0;
    cobreAgosto1: number = 0;
    cobreSeptiembre1: number = 0;
    cobreOctubre1: number = 0;
    cobreNoviembre1: number = 0;
    cobreDiciembre1: number = 0;
    cobre1Min: number = 0;
    cobre1Max: number = 0;
    cobre1Promedio: number = 0;

    cobreEnero2: number = 0;
    cobreFebrero2: number = 0;
    cobreMarzo2: number = 0;
    cobreAbril2: number = 0;
    cobreMayo2: number = 0;
    cobreJunio2: number = 0;
    cobreJulio2: number = 0;
    cobreAgosto2: number = 0;
    cobreSeptiembre2: number = 0;
    cobreOctubre2: number = 0;
    cobreNoviembre2: number = 0;
    cobreDiciembre2: number = 0;
    cobre2Min: number = 0;
    cobre2Max: number = 0;
    cobre2Promedio: number = 0;

    cobreEnero3: number = 0;
    cobreFebrero3: number = 0;
    cobreMarzo3: number = 0;
    cobreAbril3: number = 0;
    cobreMayo3: number = 0;
    cobreJunio3: number = 0;
    cobreJulio3: number = 0;
    cobreAgosto3: number = 0;
    cobreSeptiembre3: number = 0;
    cobreOctubre3: number = 0;
    cobreNoviembre3: number = 0;
    cobreDiciembre3: number = 0;
    cobre3Min: number = 0;
    cobre3Max: number = 0;
    cobre3Promedio: number = 0;

    //DatosUltimaPagF11
    mercurioEnero1: number = 0;
    mercurioFebrero1: number = 0;
    mercurioMarzo1: number = 0;
    mercurioAbril1: number = 0;
    mercurioMayo1: number = 0;
    mercurioJunio1: number = 0;
    mercurioJulio1: number = 0;
    mercurioAgosto1: number = 0;
    mercurioSeptiembre1: number = 0;
    mercurioOctubre1: number = 0;
    mercurioNoviembre1: number = 0;
    mercurioDiciembre1: number = 0;
    mercurio1Min: number = 0;
    mercurio1Max: number = 0;
    mercurio1Promedio: number = 0;

    mercurioEnero2: number = 0;
    mercurioFebrero2: number = 0;
    mercurioMarzo2: number = 0;
    mercurioAbril2: number = 0;
    mercurioMayo2: number = 0;
    mercurioJunio2: number = 0;
    mercurioJulio2: number = 0;
    mercurioAgosto2: number = 0;
    mercurioSeptiembre2: number = 0;
    mercurioOctubre2: number = 0;
    mercurioNoviembre2: number = 0;
    mercurioDiciembre2: number = 0;
    mercurio2Min: number = 0;
    mercurio2Max: number = 0;
    mercurio2Promedio: number = 0;

    mercurioEnero3: number = 0;
    mercurioFebrero3: number = 0;
    mercurioMarzo3: number = 0;
    mercurioAbril3: number = 0;
    mercurioMayo3: number = 0;
    mercurioJunio3: number = 0;
    mercurioJulio3: number = 0;
    mercurioAgosto3: number = 0;
    mercurioSeptiembre3: number = 0;
    mercurioOctubre3: number = 0;
    mercurioNoviembre3: number = 0;
    mercurioDiciembre3: number = 0;
    mercurio3Min: number = 0;
    mercurio3Max: number = 0;
    mercurio3Promedio: number = 0;

    //DatosUltimaPagF12
    niquelEnero1: number = 0;
    niquelFebrero1: number = 0;
    niquelMarzo1: number = 0;
    niquelAbril1: number = 0;
    niquelMayo1: number = 0;
    niquelJunio1: number = 0;
    niquelJulio1: number = 0;
    niquelAgosto1: number = 0;
    niquelSeptiembre1: number = 0;
    niquelOctubre1: number = 0;
    niquelNoviembre1: number = 0;
    niquelDiciembre1: number = 0;
    niquel1Min: number = 0;
    niquel1Max: number = 0;
    niquel1Promedio: number = 0;

    niquelEnero2: number = 0;
    niquelFebrero2: number = 0;
    niquelMarzo2: number = 0;
    niquelAbril2: number = 0;
    niquelMayo2: number = 0;
    niquelJunio2: number = 0;
    niquelJulio2: number = 0;
    niquelAgosto2: number = 0;
    niquelSeptiembre2: number = 0;
    niquelOctubre2: number = 0;
    niquelNoviembre2: number = 0;
    niquelDiciembre2: number = 0;
    niquel2Min: number = 0;
    niquel2Max: number = 0;
    niquel2Promedio: number = 0;

    niquelEnero3: number = 0;
    niquelFebrero3: number = 0;
    niquelMarzo3: number = 0;
    niquelAbril3: number = 0;
    niquelMayo3: number = 0;
    niquelJunio3: number = 0;
    niquelJulio3: number = 0;
    niquelAgosto3: number = 0;
    niquelSeptiembre3: number = 0;
    niquelOctubre3: number = 0;
    niquelNoviembre3: number = 0;
    niquelDiciembre3: number = 0;
    niquel3Min: number = 0;
    niquel3Max: number = 0;
    niquel3Promedio: number = 0;

    //DatosUltimaPagF13
    plomoEnero1: number = 0;
    plomoFebrero1: number = 0;
    plomoMarzo1: number = 0;
    plomoAbril1: number = 0;
    plomoMayo1: number = 0;
    plomoJunio1: number = 0;
    plomoJulio1: number = 0;
    plomoAgosto1: number = 0;
    plomoSeptiembre1: number = 0;
    plomoOctubre1: number = 0;
    plomoNoviembre1: number = 0;
    plomoDiciembre1: number = 0;
    plomo1Min: number = 0;
    plomo1Max: number = 0;
    plomo1Promedio: number = 0;

    plomoEnero2: number = 0;
    plomoFebrero2: number = 0;
    plomoMarzo2: number = 0;
    plomoAbril2: number = 0;
    plomoMayo2: number = 0;
    plomoJunio2: number = 0;
    plomoJulio2: number = 0;
    plomoAgosto2: number = 0;
    plomoSeptiembre2: number = 0;
    plomoOctubre2: number = 0;
    plomoNoviembre2: number = 0;
    plomoDiciembre2: number = 0;
    plomo2Min: number = 0;
    plomo2Max: number = 0;
    plomo2Promedio: number = 0;

    plomoEnero3: number = 0;
    plomoFebrero3: number = 0;
    plomoMarzo3: number = 0;
    plomoAbril3: number = 0;
    plomoMayo3: number = 0;
    plomoJunio3: number = 0;
    plomoJulio3: number = 0;
    plomoAgosto3: number = 0;
    plomoSeptiembre3: number = 0;
    plomoOctubre3: number = 0;
    plomoNoviembre3: number = 0;
    plomoDiciembre3: number = 0;
    plomo3Min: number = 0;
    plomo3Max: number = 0;
    plomo3Promedio: number = 0;

    //DatosUltimaPagF14
    zincEnero1: number = 0;
    zincFebrero1: number = 0;
    zincMarzo1: number = 0;
    zincAbril1: number = 0;
    zincMayo1: number = 0;
    zincJunio1: number = 0;
    zincJulio1: number = 0;
    zincAgosto1: number = 0;
    zincSeptiembre1: number = 0;
    zincOctubre1: number = 0;
    zincNoviembre1: number = 0;
    zincDiciembre1: number = 0;
    zinc1Min: number = 0;
    zinc1Max: number = 0;
    zinc1Promedio: number = 0;

    zincEnero2: number = 0;
    zincFebrero2: number = 0;
    zincMarzo2: number = 0;
    zincAbril2: number = 0;
    zincMayo2: number = 0;
    zincJunio2: number = 0;
    zincJulio2: number = 0;
    zincAgosto2: number = 0;
    zincSeptiembre2: number = 0;
    zincOctubre2: number = 0;
    zincNoviembre2: number = 0;
    zincDiciembre2: number = 0;
    zinc2Min: number = 0;
    zinc2Max: number = 0;
    zinc2Promedio: number = 0;

    zincEnero3: number = 0;
    zincFebrero3: number = 0;
    zincMarzo3: number = 0;
    zincAbril3: number = 0;
    zincMayo3: number = 0;
    zincJunio3: number = 0;
    zincJulio3: number = 0;
    zincAgosto3: number = 0;
    zincSeptiembre3: number = 0;
    zincOctubre3: number = 0;
    zincNoviembre3: number = 0;
    zincDiciembre3: number = 0;
    zinc3Min: number = 0;
    zinc3Max: number = 0;
    zinc3Promedio: number = 0;

    //DatosUltimaPagF15
    pentaclorofenolEnero1: number = 0;
    pentaclorofenolFebrero1: number = 0;
    pentaclorofenolMarzo1: number = 0;
    pentaclorofenolAbril1: number = 0;
    pentaclorofenolMayo1: number = 0;
    pentaclorofenolJunio1: number = 0;
    pentaclorofenolJulio1: number = 0;
    pentaclorofenolAgosto1: number = 0;
    pentaclorofenolSeptiembre1: number = 0;
    pentaclorofenolOctubre1: number = 0;
    pentaclorofenolNoviembre1: number = 0;
    pentaclorofenolDiciembre1: number = 0;
    pentaclorofenol1Min: number = 0;
    pentaclorofenol1Max: number = 0;
    pentaclorofenol1Promedio: number = 0;

    pentaclorofenolEnero2: number = 0;
    pentaclorofenolFebrero2: number = 0;
    pentaclorofenolMarzo2: number = 0;
    pentaclorofenolAbril2: number = 0;
    pentaclorofenolMayo2: number = 0;
    pentaclorofenolJunio2: number = 0;
    pentaclorofenolJulio2: number = 0;
    pentaclorofenolAgosto2: number = 0;
    pentaclorofenolSeptiembre2: number = 0;
    pentaclorofenolOctubre2: number = 0;
    pentaclorofenolNoviembre2: number = 0;
    pentaclorofenolDiciembre2: number = 0;
    pentaclorofenol2Min: number = 0;
    pentaclorofenol2Max: number = 0;
    pentaclorofenol2Promedio: number = 0;

    pentaclorofenolEnero3: number = 0;
    pentaclorofenolFebrero3: number = 0;
    pentaclorofenolMarzo3: number = 0;
    pentaclorofenolAbril3: number = 0;
    pentaclorofenolMayo3: number = 0;
    pentaclorofenolJunio3: number = 0;
    pentaclorofenolJulio3: number = 0;
    pentaclorofenolAgosto3: number = 0;
    pentaclorofenolSeptiembre3: number = 0;
    pentaclorofenolOctubre3: number = 0;
    pentaclorofenolNoviembre3: number = 0;
    pentaclorofenolDiciembre3: number = 0;
    pentaclorofenol3Min: number = 0;
    pentaclorofenol3Max: number = 0;
    pentaclorofenol3Promedio: number = 0;

    // Inyectar el servicio de Google Sheets en el constructor
    constructor(

        private router: Router
    ) {
        this.calcularTotalesProduccion();
        this.calculaEntradaAguaPotable();
        this.calculaEntradaAguaPozo();
        this.calculaEntradaAguaDulce();
        this.calculaSalidaAguaDescargada();
        this.calculaSalidaAguaInfiltrada();
        this.calculaSalidaAguaConsumida();
        this.calculaNitrogeno1();
        this.calculaNitrogeno2();
        this.calculaNitrogeno3();
        this.calculaNitrogenoKjeldahl1();
        this.calculaNitrogenoKjeldahl2();
        this.calculaNitrogenoKjeldahl3();
        this.calculaFosforoTotal1();
        this.calculaFosforoTotal2();
        this.calculaFosforoTotal3();
        this.calculaFosfato1();
        this.calculaFosfato2();
        this.calculaFosfato3();
        this.calculaDqo1();
        this.calculaDqo2();
        this.calculaDqo3();
        this.calculaDbo1();
        this.calculaDbo2();
        this.calculaDbo3();
        this.calculaArsenico1();
        this.calculaArsenico2();
        this.calculaArsenico3();
        this.calculaCadmio1();
        this.calculaCadmio2();
        this.calculaCadmio3();
        this.calculaCromo1();
        this.calculaCromo2();
        this.calculaCromo3();
        this.calculaCobre1();
        this.calculaCobre2();
        this.calculaCobre3();
        this.calculaMercurio1();
        this.calculaMercurio2();
        this.calculaMercurio3();
        this.calculaNiquel1();
        this.calculaNiquel2();
        this.calculaNiquel3();
        this.calculaPlomo1();
        this.calculaPlomo2();
        this.calculaPlomo3();
        this.calculaZinc1();
        this.calculaZinc2();
        this.calculaZinc3();
        this.calculaPentaclorofenol1();
        this.calculaPentaclorofenol2();
        this.calculaPentaclorofenol3();
    }

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
  /*   guardarDatos() {
        this.guardarDatosHoja3();
        this.guardarDatosHoja4();
        this.guardarDatosHoja5();
        this.guardarDatosSalidaAgua();
        this.guardarDatosCalidadAgua();

        // Reiniciar el formulario después de guardar los datos
    } */

    // Método específico para guardar datos en Hoja 3
   /*  private guardarDatosHoja3() {
        const rango = '3. INFORMACIÓN!B5:B18'; // El rango específico en la hoja 3
        const valores = [
            [this.medicionHuella], // B5
            [this.anioMedicion], // B6
            [this.unidadFuncional], // B7
            [''], // Saltar una fila
            [this.nombreEmpresa], // B9
            [this.instalacionMedida], // B10
            [this.ubicacionMedidaR], // B11
            [this.ubicacionMedidaC], // B12
            [this.tipoProducto], // B13
            [''], // Saltar otra fila
            [this.nombreResponsable], // B15
            [this.cargoResponsable], // B16
            [this.correoResponsable], // B17
            [this.telefonoResponsable], // B18
        ];

        this.googleSheetsService
            .addDataToSheet(rango, valores)
            .then((response: any) => {
                console.log('Datos guardados exitosamente en Hoja 3:', response);
            })
            .catch((error: any) => {
                console.error('Error al guardar los datos en Hoja 3:', error);
            });
    } */

    // Método específico para guardar datos en Hoja 4
    /* private guardarDatosHoja4() {
        const rango = '4. PRODUCCIÓN!A6:O6'; // Rango que cubre de A6 a N6 en una sola operación
        const valores = [
            [
                this.producto,
                this.descripcion,
                '[kg]',
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
            ],
        ];

        this.googleSheetsService
            .addDataToSheet(rango, valores)
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
                '[m3]',
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
            ],
        ];

        // Segunda tabla: Entrada Mensual de Agua de Pozo
        const rangoAguaPozo = '5. USO DIRECTO DE AGUA!A16:N16'; // Rango para la segunda tabla
        const valoresAguaPozo = [
            [
                this.aguaPozoFuenteUso, // A16
                '[m3]', //B16
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
            ],
        ];

        // Tercera tabla: Entrada Mensual de Agua Dulce de Fuentes Superficiales
        const rangoAguaSuperficial = '5. USO DIRECTO DE AGUA!A26:N26'; // Rango para la tercera tabla
        const valoresAguaSuperficial = [
            [
                this.aguaSuperficialFuenteUso,
                '[m3]', // C26
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
            ],
        ];

        // Guardar en la Hoja 5 - Entrada Mensual de Agua Potable
        this.googleSheetsService
            .addDataToSheet(rangoAguaPotable, valoresAguaPotable)
            .then((response: any) => {
                console.log(
                    'Datos guardados exitosamente en Hoja 5 - Agua Potable:',
                    response
                );
            })
            .catch((error: any) => {
                console.error(
                    'Error al guardar los datos en Hoja 5 - Agua Potable:',
                    error
                );
            });

        // Guardar en la Hoja 5 - Entrada Mensual de Agua de Pozo
        this.googleSheetsService
            .addDataToSheet(rangoAguaPozo, valoresAguaPozo)
            .then((response: any) => {
                console.log(
                    'Datos guardados exitosamente en Hoja 5 - Agua de Pozo:',
                    response
                );
            })
            .catch((error: any) => {
                console.error(
                    'Error al guardar los datos en Hoja 5 - Agua de Pozo:',
                    error
                );
            });

        // Guardar en la Hoja 5 - Entrada Mensual de Agua Dulce de Fuentes Superficiales
        this.googleSheetsService
            .addDataToSheet(rangoAguaSuperficial, valoresAguaSuperficial)
            .then((response: any) => {
                console.log(
                    'Datos guardados exitosamente en Hoja 5 - Agua Superficial:',
                    response
                );
            })
            .catch((error: any) => {
                console.error(
                    'Error al guardar los datos en Hoja 5 - Agua Superficial:',
                    error
                );
            });
    }
    private guardarDatosSalidaAgua() {
        // Primer tabla: Salida Mensual de Agua Descargada
        const rangoSalidaAguaDescargada = '5. USO DIRECTO DE AGUA!A40:N40'; // Rango para la tabla de agua descargada
        const valoresSalidaAguaDescargada = [
            [
                this.salidaAguaDescargadaProceso, // A6
                '[m3]', // B6 (puedes ajustar este valor según sea necesario)
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
                this.salidaAguaDescargadaDiciembre, // N6
            ],
        ];

        // Tercera tabla: Salida Mensual de Agua Dulce de Fuentes Superficiales
        const rangoSalidaAguaSuperficial = '5. USO DIRECTO DE AGUA!A54:N54'; // Rango para la tabla de agua superficial
        const valoresSalidaAguaSuperficial = [
            [
                this.salidaAguaConsumidaProceso, // A26
                '[m3]', // B26 (ajustar según sea necesario)
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
                this.salidaAguaConsumidaDiciembre, // N26
            ],
        ];
        // Segunda tabla: Salida Mensual de Agua Infiltrada
        const rangoSalidaAguaInfiltrada = '5. USO DIRECTO DE AGUA!A47:N47'; // Rango para la tabla de agua infiltrada
        const valoresSalidaAguaInfiltrada = [
            [
                this.salidaAguaInfiltradaProceso, // A16
                '[m3]', // B16 (ajustar según sea necesario)
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
                this.salidaAguaInfiltradaDiciembre, // N16
            ],
        ];

        // Guardar en la Hoja 5 - Salida Mensual de Agua Descargada
        this.googleSheetsService
            .addDataToSheet(rangoSalidaAguaDescargada, valoresSalidaAguaDescargada)
            .then((response: any) => {
                console.log(
                    'Datos guardados exitosamente en Hoja 5 - Agua Descargada:',
                    response
                );
            })
            .catch((error: any) => {
                console.error(
                    'Error al guardar los datos en Hoja 5 - Agua Descargada:',
                    error
                );
            });

        // Guardar en la Hoja 5 - Salida Mensual de Agua Infiltrada
        this.googleSheetsService
            .addDataToSheet(rangoSalidaAguaInfiltrada, valoresSalidaAguaInfiltrada)
            .then((response: any) => {
                console.log(
                    'Datos guardados exitosamente en Hoja 5 - Agua Infiltrada:',
                    response
                );
            })
            .catch((error: any) => {
                console.error(
                    'Error al guardar los datos en Hoja 5 - Agua Infiltrada:',
                    error
                );
            });

        // Guardar en la Hoja 5 - Salida Mensual de Agua Dulce de Fuentes Superficiales
        this.googleSheetsService
            .addDataToSheet(rangoSalidaAguaSuperficial, valoresSalidaAguaSuperficial)
            .then((response: any) => {
                console.log(
                    'Datos guardados exitosamente en Hoja 5 - Agua Superficial:',
                    response
                );
            })
            .catch((error: any) => {
                console.error(
                    'Error al guardar los datos en Hoja 5 - Agua Superficial:',
                    error
                );
            });
    }

    private guardarDatosCalidadAgua() {
        const rangoNitrogeno = '7. CALIDAD DE AGUA!D6:O6'; // Rango para la tabla de agua descargada
        const valoresNitrogeno = [
            [
                this.nitrogenoEnero1, // D6
                this.nitrogenoFebrero1, // E6 (puedes ajustar este valor según sea necesario)
                this.nitrogenoMarzo1, // F6
                this.nitrogenoAbril1, // G6
                this.nitrogenoMayo1, // H6
                this.nitrogenoJunio1, // I6
                this.nitrogenoJulio1, // J6
                this.nitrogenoAgosto1, // K6
                this.nitrogenoSeptiembre1, // L6
                this.nitrogenoOctubre1, // M6
                this.nitrogenoNoviembre1, // N6
                this.nitrogenoDiciembre1, // O6
            ],
            [
                this.nitrogenoEnero2, // D6
                this.nitrogenoFebrero2, // E6 (puedes ajustar este valor según sea necesario)
                this.nitrogenoMarzo2, // F6
                this.nitrogenoAbril2, // G6
                this.nitrogenoMayo2, // H6
                this.nitrogenoJunio2, // I6
                this.nitrogenoJulio2, // J6
                this.nitrogenoAgosto2, // K6
                this.nitrogenoSeptiembre2, // L6
                this.nitrogenoOctubre2, // M6
                this.nitrogenoNoviembre2, // N6
                this.nitrogenoDiciembre2, // O6
            ],
            [
                this.nitrogenoEnero3, // D6
                this.nitrogenoFebrero3, // E6 (puedes ajustar este valor según sea necesario)
                this.nitrogenoMarzo3, // F6
                this.nitrogenoAbril3, // G6
                this.nitrogenoMayo3, // H6
                this.nitrogenoJunio3, // I6
                this.nitrogenoJulio3, // J6
                this.nitrogenoAgosto3, // K6
                this.nitrogenoSeptiembre3, // L6
                this.nitrogenoOctubre3, // M6
                this.nitrogenoNoviembre3, // N6
                this.nitrogenoDiciembre3, // O6
            ],
        ];
        // Guardar en la Hoja 7
        this.googleSheetsService
            .addDataToSheet(rangoNitrogeno, valoresNitrogeno)
            .then((response: any) => {
                console.log(
                    'Datos guardados exitosamente en Hoja 7 - Calidad Agua',
                    response
                );
            })
            .catch((error: any) => {
                console.error(
                    'Error al guardar los datos en Hoja 7 - Calidad Agua',
                    error
                );
            });

        const rangoNitrogenoKjeldahl = '7. CALIDAD DE AGUA!D7:O7'; // Rango para la tabla de agua del nitrógeno Kjeldahl
        const valoresNitrogenoKjeldahl = [
            [
                this.nitrogenoKjeldahlEnero1, // D7
                this.nitrogenoKjeldahlFebrero1, // E7
                this.nitrogenoKjeldahlMarzo1, // F7
                this.nitrogenoKjeldahlAbril1, // G7
                this.nitrogenoKjeldahlMayo1, // H7
                this.nitrogenoKjeldahlJunio1, // I7
                this.nitrogenoKjeldahlJulio1, // J7
                this.nitrogenoKjeldahlAgosto1, // K7
                this.nitrogenoKjeldahlSeptiembre1, // L7
                this.nitrogenoKjeldahlOctubre1, // M7
                this.nitrogenoKjeldahlNoviembre1, // N7
                this.nitrogenoKjeldahlDiciembre1, // O7
            ],
            [
                this.nitrogenoKjeldahlEnero2, // D7
                this.nitrogenoKjeldahlFebrero2, // E7
                this.nitrogenoKjeldahlMarzo2, // F7
                this.nitrogenoKjeldahlAbril2, // G7
                this.nitrogenoKjeldahlMayo2, // H7
                this.nitrogenoKjeldahlJunio2, // I7
                this.nitrogenoKjeldahlJulio2, // J7
                this.nitrogenoKjeldahlAgosto2, // K7
                this.nitrogenoKjeldahlSeptiembre2, // L7
                this.nitrogenoKjeldahlOctubre2, // M7
                this.nitrogenoKjeldahlNoviembre2, // N7
                this.nitrogenoKjeldahlDiciembre2, // O7
            ],
            [
                this.nitrogenoKjeldahlEnero3, // D7
                this.nitrogenoKjeldahlFebrero3, // E7
                this.nitrogenoKjeldahlMarzo3, // F7
                this.nitrogenoKjeldahlAbril3, // G7
                this.nitrogenoKjeldahlMayo3, // H7
                this.nitrogenoKjeldahlJunio3, // I7
                this.nitrogenoKjeldahlJulio3, // J7
                this.nitrogenoKjeldahlAgosto3, // K7
                this.nitrogenoKjeldahlSeptiembre3, // L7
                this.nitrogenoKjeldahlOctubre3, // M7
                this.nitrogenoKjeldahlNoviembre3, // N7
                this.nitrogenoKjeldahlDiciembre3, // O7
            ],
        ];

        // Guardar en la Hoja 7
        this.googleSheetsService
            .addDataToSheet(rangoNitrogenoKjeldahl, valoresNitrogenoKjeldahl)
            .then((response: any) => {
                console.log(
                    'Datos guardados exitosamente en Hoja 7 - Calidad Agua',
                    response
                );
            })
            .catch((error: any) => {
                console.error(
                    'Error al guardar los datos en Hoja 7 - Calidad Agua',
                    error
                );
            });
        const rangoFosforo = '7. CALIDAD DE AGUA!D8:O8'; // Rango para el fosforo total
        const valoresFosforo = [
            [
                this.fosforoTotalEnero1, // D8
                this.fosforoTotalFebrero1, // E8
                this.fosforoTotalMarzo1, // F8
                this.fosforoTotalAbril1, // G8
                this.fosforoTotalMayo1, // H8
                this.fosforoTotalJunio1, // I8
                this.fosforoTotalJulio1, // J8
                this.fosforoTotalAgosto1, // K8
                this.fosforoTotalSeptiembre1, // L8
                this.fosforoTotalOctubre1, // M8
                this.fosforoTotalNoviembre1, // N8
                this.fosforoTotalDiciembre1, // O8
            ],
            [
                this.fosforoTotalEnero2, // D8
                this.fosforoTotalFebrero2, // E8
                this.fosforoTotalMarzo2, // F8
                this.fosforoTotalAbril2, // G8
                this.fosforoTotalMayo2, // H8
                this.fosforoTotalJunio2, // I8
                this.fosforoTotalJulio2, // J8
                this.fosforoTotalAgosto2, // K8
                this.fosforoTotalSeptiembre2, // L8
                this.fosforoTotalOctubre2, // M8
                this.fosforoTotalNoviembre2, // N8
                this.fosforoTotalDiciembre2, // O8
            ],
            [
                this.fosforoTotalEnero3, // D8
                this.fosforoTotalFebrero3, // E8
                this.fosforoTotalMarzo3, // F8
                this.fosforoTotalAbril3, // G8
                this.fosforoTotalMayo3, // H8
                this.fosforoTotalJunio3, // I8
                this.fosforoTotalJulio3, // J8
                this.fosforoTotalAgosto3, // K8
                this.fosforoTotalSeptiembre3, // L8
                this.fosforoTotalOctubre3, // M8
                this.fosforoTotalNoviembre3, // N8
                this.fosforoTotalDiciembre3, // O8
            ],
        ];
        // Guardar en la Hoja 7
        this.googleSheetsService
            .addDataToSheet(rangoFosforo, valoresFosforo)
            .then((response: any) => {
                console.log(
                    'Datos guardados exitosamente en Hoja 7 - Calidad Agua',
                    response
                );
            })
            .catch((error: any) => {
                console.error(
                    'Error al guardar los datos en Hoja 7 - Calidad Agua',
                    error
                );
            });
        const rangoFosfato = '7. CALIDAD DE AGUA!D9:O9'; // Rango para el fosfato
        const valoresFosfato = [
            [
                this.fosfatoEnero1, // D9
                this.fosfatoFebrero1, // E9
                this.fosfatoMarzo1, // F9
                this.fosfatoAbril1, // G9
                this.fosfatoMayo1, // H9
                this.fosfatoJunio1, // I9
                this.fosfatoJulio1, // J9
                this.fosfatoAgosto1, // K9
                this.fosfatoSeptiembre1, // L9
                this.fosfatoOctubre1, // M9
                this.fosfatoNoviembre1, // N9
                this.fosfatoDiciembre1, // O9
            ],
            [
                this.fosfatoEnero2, // D9
                this.fosfatoFebrero2, // E9
                this.fosfatoMarzo2, // F9
                this.fosfatoAbril2, // G9
                this.fosfatoMayo2, // H9
                this.fosfatoJunio2, // I9
                this.fosfatoJulio2, // J9
                this.fosfatoAgosto2, // K9
                this.fosfatoSeptiembre2, // L9
                this.fosfatoOctubre2, // M9
                this.fosfatoNoviembre2, // N9
                this.fosfatoDiciembre2, // O9
            ],
            [
                this.fosfatoEnero3, // D9
                this.fosfatoFebrero3, // E9
                this.fosfatoMarzo3, // F9
                this.fosfatoAbril3, // G9
                this.fosfatoMayo3, // H9
                this.fosfatoJunio3, // I9
                this.fosfatoJulio3, // J9
                this.fosfatoAgosto3, // K9
                this.fosfatoSeptiembre3, // L9
                this.fosfatoOctubre3, // M9
                this.fosfatoNoviembre3, // N9
                this.fosfatoDiciembre3, // O9
            ],
        ];
        this.googleSheetsService
            .addDataToSheet(rangoFosfato, valoresFosfato)
            .then((response: any) => {
                console.log(
                    'Datos guardados exitosamente en Hoja 7 - Calidad Agua',
                    response
                );
            })
            .catch((error: any) => {
                console.error(
                    'Error al guardar los datos en Hoja 7 - Calidad Agua',
                    error
                );
            });
        const rangoDqo = '7. CALIDAD DE AGUA!D10:O10'; // Rango para la DQO
        const valoresDqo = [
            [
                this.dqoEnero1,
                this.dqoFebrero1,
                this.dqoMarzo1,
                this.dqoAbril1,
                this.dqoMayo1,
                this.dqoJunio1,
                this.dqoJulio1,
                this.dqoAgosto1,
                this.dqoSeptiembre1,
                this.dqoOctubre1,
                this.dqoNoviembre1,
                this.dqoDiciembre1,
            ],
            [
                this.dqoEnero2,
                this.dqoFebrero2,
                this.dqoMarzo2,
                this.dqoAbril2,
                this.dqoMayo2,
                this.dqoJunio2,
                this.dqoJulio2,
                this.dqoAgosto2,
                this.dqoSeptiembre2,
                this.dqoOctubre2,
                this.dqoNoviembre2,
                this.dqoDiciembre2,
            ],
            [
                this.dqoEnero3,
                this.dqoFebrero3,
                this.dqoMarzo3,
                this.dqoAbril3,
                this.dqoMayo3,
                this.dqoJunio3,
                this.dqoJulio3,
                this.dqoAgosto3,
                this.dqoSeptiembre3,
                this.dqoOctubre3,
                this.dqoNoviembre3,
                this.dqoDiciembre3,
            ],
        ];
        this.googleSheetsService
            .addDataToSheet(rangoDqo, valoresDqo)
            .then((response: any) => {
                console.log(
                    'Datos guardados exitosamente en Hoja 7 - Calidad Agua',
                    response
                );
            })
            .catch((error: any) => {
                console.error(
                    'Error al guardar los datos en Hoja 7 - Calidad Agua',
                    error
                );
            });
        const rangoDbo = '7. CALIDAD DE AGUA!D11:O11'; // Rango para la DBO
        const valoresDbo = [
            [
                this.dboEnero1,
                this.dboFebrero1,
                this.dboMarzo1,
                this.dboAbril1,
                this.dboMayo1,
                this.dboJunio1,
                this.dboJulio1,
                this.dboAgosto1,
                this.dboSeptiembre1,
                this.dboOctubre1,
                this.dboNoviembre1,
                this.dboDiciembre1,
            ],
            [
                this.dboEnero2,
                this.dboFebrero2,
                this.dboMarzo2,
                this.dboAbril2,
                this.dboMayo2,
                this.dboJunio2,
                this.dboJulio2,
                this.dboAgosto2,
                this.dboSeptiembre2,
                this.dboOctubre2,
                this.dboNoviembre2,
                this.dboDiciembre2,
            ],
            [
                this.dboEnero3,
                this.dboFebrero3,
                this.dboMarzo3,
                this.dboAbril3,
                this.dboMayo3,
                this.dboJunio3,
                this.dboJulio3,
                this.dboAgosto3,
                this.dboSeptiembre3,
                this.dboOctubre3,
                this.dboNoviembre3,
                this.dboDiciembre3,
            ],
        ];
        this.googleSheetsService
            .addDataToSheet(rangoDbo, valoresDbo)
            .then((response: any) => {
                console.log(
                    'Datos guardados exitosamente en Hoja 7 - Calidad Agua',
                    response
                );
            })
            .catch((error: any) => {
                console.error(
                    'Error al guardar los datos en Hoja 7 - Calidad Agua',
                    error
                );
            });
        const rangoArsenico = '7. CALIDAD DE AGUA!D12:O12'; // Rango para el arsénico
        const valoresArsenico = [
            [
                this.arsenicoEnero1,
                this.arsenicoFebrero1,
                this.arsenicoMarzo1,
                this.arsenicoAbril1,
                this.arsenicoMayo1,
                this.arsenicoJunio1,
                this.arsenicoJulio1,
                this.arsenicoAgosto1,
                this.arsenicoSeptiembre1,
                this.arsenicoOctubre1,
                this.arsenicoNoviembre1,
                this.arsenicoDiciembre1,
            ],
            [
                this.arsenicoEnero2,
                this.arsenicoFebrero2,
                this.arsenicoMarzo2,
                this.arsenicoAbril2,
                this.arsenicoMayo2,
                this.arsenicoJunio2,
                this.arsenicoJulio2,
                this.arsenicoAgosto2,
                this.arsenicoSeptiembre2,
                this.arsenicoOctubre2,
                this.arsenicoNoviembre2,
                this.arsenicoDiciembre2,
            ],
            [
                this.arsenicoEnero3,
                this.arsenicoFebrero3,
                this.arsenicoMarzo3,
                this.arsenicoAbril3,
                this.arsenicoMayo3,
                this.arsenicoJunio3,
                this.arsenicoJulio3,
                this.arsenicoAgosto3,
                this.arsenicoSeptiembre3,
                this.arsenicoOctubre3,
                this.arsenicoNoviembre3,
                this.arsenicoDiciembre3,
            ],
        ];
        this.googleSheetsService
            .addDataToSheet(rangoArsenico, valoresArsenico)
            .then((response: any) => {
                console.log(
                    'Datos guardados exitosamente en Hoja 7 - Calidad Agua',
                    response
                );
            })
            .catch((error: any) => {
                console.error(
                    'Error al guardar los datos en Hoja 7 - Calidad Agua',
                    error
                );
            });
        const rangoCadmio = '7. CALIDAD DE AGUA!D13:O13'; // Rango para el cadmio
        const valoresCadmio = [
            [
                this.cadmioEnero1,
                this.cadmioFebrero1,
                this.cadmioMarzo1,
                this.cadmioAbril1,
                this.cadmioMayo1,
                this.cadmioJunio1,
                this.cadmioJulio1,
                this.cadmioAgosto1,
                this.cadmioSeptiembre1,
                this.cadmioOctubre1,
                this.cadmioNoviembre1,
                this.cadmioDiciembre1,
            ],
            [
                this.cadmioEnero2,
                this.cadmioFebrero2,
                this.cadmioMarzo2,
                this.cadmioAbril2,
                this.cadmioMayo2,
                this.cadmioJunio2,
                this.cadmioJulio2,
                this.cadmioAgosto2,
                this.cadmioSeptiembre2,
                this.cadmioOctubre2,
                this.cadmioNoviembre2,
                this.cadmioDiciembre2,
            ],
            [
                this.cadmioEnero3,
                this.cadmioFebrero3,
                this.cadmioMarzo3,
                this.cadmioAbril3,
                this.cadmioMayo3,
                this.cadmioJunio3,
                this.cadmioJulio3,
                this.cadmioAgosto3,
                this.cadmioSeptiembre3,
                this.cadmioOctubre3,
                this.cadmioNoviembre3,
                this.cadmioDiciembre3,
            ],
        ];
        this.googleSheetsService
            .addDataToSheet(rangoCadmio, valoresCadmio)
            .then((response: any) => {
                console.log(
                    'Datos guardados exitosamente en Hoja 7 - Calidad Agua',
                    response
                );
            })
            .catch((error: any) => {
                console.error(
                    'Error al guardar los datos en Hoja 7 - Calidad Agua',
                    error
                );
            });
        const rangoCromo = '7. CALIDAD DE AGUA!D14:O14'; // Rango para el cromo
        const valoresCromo = [
            [
                this.cromoEnero1,
                this.cromoFebrero1,
                this.cromoMarzo1,
                this.cromoAbril1,
                this.cromoMayo1,
                this.cromoJunio1,
                this.cromoJulio1,
                this.cromoAgosto1,
                this.cromoSeptiembre1,
                this.cromoOctubre1,
                this.cromoNoviembre1,
                this.cromoDiciembre1,
            ],
            [
                this.cromoEnero2,
                this.cromoFebrero2,
                this.cromoMarzo2,
                this.cromoAbril2,
                this.cromoMayo2,
                this.cromoJunio2,
                this.cromoJulio2,
                this.cromoAgosto2,
                this.cromoSeptiembre2,
                this.cromoOctubre2,
                this.cromoNoviembre2,
                this.cromoDiciembre2,
            ],
            [
                this.cromoEnero3,
                this.cromoFebrero3,
                this.cromoMarzo3,
                this.cromoAbril3,
                this.cromoMayo3,
                this.cromoJunio3,
                this.cromoJulio3,
                this.cromoAgosto3,
                this.cromoSeptiembre3,
                this.cromoOctubre3,
                this.cromoNoviembre3,
                this.cromoDiciembre3,
            ],
        ];
        this.googleSheetsService
            .addDataToSheet(rangoCromo, valoresCromo)
            .then((response: any) => {
                console.log(
                    'Datos guardados exitosamente en Hoja 7 - Calidad Agua',
                    response
                );
            })
            .catch((error: any) => {
                console.error(
                    'Error al guardar los datos en Hoja 7 - Calidad Agua',
                    error
                );
            });
        const rangoCobre = '7. CALIDAD DE AGUA!D15:O15'; // Rango para el cobre
        const valoresCobre = [
            [
                this.cobreEnero1,
                this.cobreFebrero1,
                this.cobreMarzo1,
                this.cobreAbril1,
                this.cobreMayo1,
                this.cobreJunio1,
                this.cobreJulio1,
                this.cobreAgosto1,
                this.cobreSeptiembre1,
                this.cobreOctubre1,
                this.cobreNoviembre1,
                this.cobreDiciembre1,
            ],
            [
                this.cobreEnero2,
                this.cobreFebrero2,
                this.cobreMarzo2,
                this.cobreAbril2,
                this.cobreMayo2,
                this.cobreJunio2,
                this.cobreJulio2,
                this.cobreAgosto2,
                this.cobreSeptiembre2,
                this.cobreOctubre2,
                this.cobreNoviembre2,
                this.cobreDiciembre2,
            ],
            [
                this.cobreEnero3,
                this.cobreFebrero3,
                this.cobreMarzo3,
                this.cobreAbril3,
                this.cobreMayo3,
                this.cobreJunio3,
                this.cobreJulio3,
                this.cobreAgosto3,
                this.cobreSeptiembre3,
                this.cobreOctubre3,
                this.cobreNoviembre3,
                this.cobreDiciembre3,
            ],
        ];
        this.googleSheetsService
            .addDataToSheet(rangoCobre, valoresCobre)
            .then((response: any) => {
                console.log(
                    'Datos guardados exitosamente en Hoja 7 - Calidad Agua',
                    response
                );
            })
            .catch((error: any) => {
                console.error(
                    'Error al guardar los datos en Hoja 7 - Calidad Agua',
                    error
                );
            });
        const rangoMercurio = '7. CALIDAD DE AGUA!D16:O16'; // Rango para el mercurio
        const valoresMercurio = [
            [
                this.mercurioEnero1,
                this.mercurioFebrero1,
                this.mercurioMarzo1,
                this.mercurioAbril1,
                this.mercurioMayo1,
                this.mercurioJunio1,
                this.mercurioJulio1,
                this.mercurioAgosto1,
                this.mercurioSeptiembre1,
                this.mercurioOctubre1,
                this.mercurioNoviembre1,
                this.mercurioDiciembre1,
            ],
            [
                this.mercurioEnero2,
                this.mercurioFebrero2,
                this.mercurioMarzo2,
                this.mercurioAbril2,
                this.mercurioMayo2,
                this.mercurioJunio2,
                this.mercurioJulio2,
                this.mercurioAgosto2,
                this.mercurioSeptiembre2,
                this.mercurioOctubre2,
                this.mercurioNoviembre2,
                this.mercurioDiciembre2,
            ],
            [
                this.mercurioEnero3,
                this.mercurioFebrero3,
                this.mercurioMarzo3,
                this.mercurioAbril3,
                this.mercurioMayo3,
                this.mercurioJunio3,
                this.mercurioJulio3,
                this.mercurioAgosto3,
                this.mercurioSeptiembre3,
                this.mercurioOctubre3,
                this.mercurioNoviembre3,
                this.mercurioDiciembre3,
            ],
        ];
        this.googleSheetsService
            .addDataToSheet(rangoMercurio, valoresMercurio)
            .then((response: any) => {
                console.log(
                    'Datos guardados exitosamente en Hoja 7 - Calidad Agua',
                    response
                );
            })
            .catch((error: any) => {
                console.error(
                    'Error al guardar los datos en Hoja 7 - Calidad Agua',
                    error
                );
            });
        const rangoNiquel = '7. CALIDAD DE AGUA!D17:O17'; // Rango para el níquel
        const valoresNiquel = [
            [
                this.niquelEnero1,
                this.niquelFebrero1,
                this.niquelMarzo1,
                this.niquelAbril1,
                this.niquelMayo1,
                this.niquelJunio1,
                this.niquelJulio1,
                this.niquelAgosto1,
                this.niquelSeptiembre1,
                this.niquelOctubre1,
                this.niquelNoviembre1,
                this.niquelDiciembre1,
            ],
            [
                this.niquelEnero2,
                this.niquelFebrero2,
                this.niquelMarzo2,
                this.niquelAbril2,
                this.niquelMayo2,
                this.niquelJunio2,
                this.niquelJulio2,
                this.niquelAgosto2,
                this.niquelSeptiembre2,
                this.niquelOctubre2,
                this.niquelNoviembre2,
                this.niquelDiciembre2,
            ],
            [
                this.niquelEnero3,
                this.niquelFebrero3,
                this.niquelMarzo3,
                this.niquelAbril3,
                this.niquelMayo3,
                this.niquelJunio3,
                this.niquelJulio3,
                this.niquelAgosto3,
                this.niquelSeptiembre3,
                this.niquelOctubre3,
                this.niquelNoviembre3,
                this.niquelDiciembre3,
            ],
        ];
        this.googleSheetsService
            .addDataToSheet(rangoNiquel, valoresNiquel)
            .then((response: any) => {
                console.log(
                    'Datos guardados exitosamente en Hoja 7 - Calidad Agua',
                    response
                );
            })
            .catch((error: any) => {
                console.error(
                    'Error al guardar los datos en Hoja 7 - Calidad Agua',
                    error
                );
            });
        const rangoPlomo = '7. CALIDAD DE AGUA!D18:O18'; // Rango para el plomo
        const valoresPlomo = [
            [
                this.plomoEnero1,
                this.plomoFebrero1,
                this.plomoMarzo1,
                this.plomoAbril1,
                this.plomoMayo1,
                this.plomoJunio1,
                this.plomoJulio1,
                this.plomoAgosto1,
                this.plomoSeptiembre1,
                this.plomoOctubre1,
                this.plomoNoviembre1,
                this.plomoDiciembre1,
            ],
            [
                this.plomoEnero2,
                this.plomoFebrero2,
                this.plomoMarzo2,
                this.plomoAbril2,
                this.plomoMayo2,
                this.plomoJunio2,
                this.plomoJulio2,
                this.plomoAgosto2,
                this.plomoSeptiembre2,
                this.plomoOctubre2,
                this.plomoNoviembre2,
                this.plomoDiciembre2,
            ],
            [
                this.plomoEnero3,
                this.plomoFebrero3,
                this.plomoMarzo3,
                this.plomoAbril3,
                this.plomoMayo3,
                this.plomoJunio3,
                this.plomoJulio3,
                this.plomoAgosto3,
                this.plomoSeptiembre3,
                this.plomoOctubre3,
                this.plomoNoviembre3,
                this.plomoDiciembre3,
            ],
        ];
        this.googleSheetsService
            .addDataToSheet(rangoPlomo, valoresPlomo)
            .then((response: any) => {
                console.log(
                    'Datos guardados exitosamente en Hoja 7 - Calidad Agua',
                    response
                );
            })
            .catch((error: any) => {
                console.error(
                    'Error al guardar los datos en Hoja 7 - Calidad Agua',
                    error
                );
            });
        const rangoZinc = '7. CALIDAD DE AGUA!D19:O19'; // Rango para el zinc
        const valoresZinc = [
            [
                this.zincEnero1,
                this.zincFebrero1,
                this.zincMarzo1,
                this.zincAbril1,
                this.zincMayo1,
                this.zincJunio1,
                this.zincJulio1,
                this.zincAgosto1,
                this.zincSeptiembre1,
                this.zincOctubre1,
                this.zincNoviembre1,
                this.zincDiciembre1,
            ],
            [
                this.zincEnero2,
                this.zincFebrero2,
                this.zincMarzo2,
                this.zincAbril2,
                this.zincMayo2,
                this.zincJunio2,
                this.zincJulio2,
                this.zincAgosto2,
                this.zincSeptiembre2,
                this.zincOctubre2,
                this.zincNoviembre2,
                this.zincDiciembre2,
            ],
            [
                this.zincEnero3,
                this.zincFebrero3,
                this.zincMarzo3,
                this.zincAbril3,
                this.zincMayo3,
                this.zincJunio3,
                this.zincJulio3,
                this.zincAgosto3,
                this.zincSeptiembre3,
                this.zincOctubre3,
                this.zincNoviembre3,
                this.zincDiciembre3,
            ],
        ];
        this.googleSheetsService
            .addDataToSheet(rangoZinc, valoresZinc)
            .then((response: any) => {
                console.log(
                    'Datos guardados exitosamente en Hoja 7 - Calidad Agua',
                    response
                );
            })
            .catch((error: any) => {
                console.error(
                    'Error al guardar los datos en Hoja 7 - Calidad Agua',
                    error
                );
            });
        const rangoPentaclorofenol = '7. CALIDAD DE AGUA!D20:O20'; // Rango para el pentaclorofenol
        const valoresPentaclorofenol = [
            [
                this.pentaclorofenolEnero1,
                this.pentaclorofenolFebrero1,
                this.pentaclorofenolMarzo1,
                this.pentaclorofenolAbril1,
                this.pentaclorofenolMayo1,
                this.pentaclorofenolJunio1,
                this.pentaclorofenolJulio1,
                this.pentaclorofenolAgosto1,
                this.pentaclorofenolSeptiembre1,
                this.pentaclorofenolOctubre1,
                this.pentaclorofenolNoviembre1,
                this.pentaclorofenolDiciembre1,
            ],
            [
                this.pentaclorofenolEnero2,
                this.pentaclorofenolFebrero2,
                this.pentaclorofenolMarzo2,
                this.pentaclorofenolAbril2,
                this.pentaclorofenolMayo2,
                this.pentaclorofenolJunio2,
                this.pentaclorofenolJulio2,
                this.pentaclorofenolAgosto2,
                this.pentaclorofenolSeptiembre2,
                this.pentaclorofenolOctubre2,
                this.pentaclorofenolNoviembre2,
                this.pentaclorofenolDiciembre2,
            ],
            [
                this.pentaclorofenolEnero3,
                this.pentaclorofenolFebrero3,
                this.pentaclorofenolMarzo3,
                this.pentaclorofenolAbril3,
                this.pentaclorofenolMayo3,
                this.pentaclorofenolJunio3,
                this.pentaclorofenolJulio3,
                this.pentaclorofenolAgosto3,
                this.pentaclorofenolSeptiembre3,
                this.pentaclorofenolOctubre3,
                this.pentaclorofenolNoviembre3,
                this.pentaclorofenolDiciembre3,
            ],
        ];
        this.googleSheetsService
            .addDataToSheet(rangoPentaclorofenol, valoresPentaclorofenol)
            .then((response: any) => {
                console.log(
                    'Datos guardados exitosamente en Hoja 7 - Calidad Agua',
                    response
                );
            })
            .catch((error: any) => {
                console.error(
                    'Error al guardar los datos en Hoja 7 - Calidad Agua',
                    error
                );
            });
    } */
    // Método para cálculos adicionales si es necesario

    calcular() {
        const toxixidadHumana = {
            ARSENICO: 0.027669,
            CADMIO: 0.000429,
            CROMO: 0.005332,
            COBRE: 0.000001,
            MERCURIO: 0.00012,
            NIQUEL: 0.000038,
            PLOMO: 0.0,
            ZINC: 0.0,
            PENTACLOROFENOL: 0.000021,
        };

        const ecotoxixidad = {
            ARSENICO: 40400.0,
            CADMIO: 9710.0,
            CROMO: 53000.0,
            COBRE: 55200.0,
            MERCURIO: 22100.0,
            NIQUEL: 14900.0,
            PLOMO: 375.0,
            ZINC: 38600.0,
            PENTACLOROFENOL: 78700.0,
        };

        const eutrofizacion = {
            FOSFORO: 1.0,
            FOSFATO: 0.326797,
            DQO: 0.00719,
        };

        const toxixidadHumanaFinal = {
            ARSENICO: 0.077954,
            CADMIO: 0.001171,
            CROMO: 0.061212,
            COBRE: 0.000002,
            MERCURIO: 0.00138,
            NIQUEL: 0.00044,
            PLOMO: 0.000004,
            ZINC: 0.0,
            PENTACLOROFENOL: 0.000238,
        };

        const ecotoxixidadFinal = {
            ARSENICO: 22.22,
            CADMIO: 5.3405,
            CROMO: 29.15,
            COBRE: 30.36,
            MERCURIO: 12.155,
            NIQUEL: 8.195,
            PLOMO: 0.20625,
            ZINC: 21.23,
            PENTACLOROFENOL: 43.285,
        };

        const eutrofizacionFinal = {
            FOSFORO: 34.958282,
            FOSFATO: 11.424275,
            DQO: 0.251334,
        };

        let toxixidadHumanaArsenico1 =
            (toxixidadHumana.ARSENICO *
                (this.salidaAguaDescargadaTotal * this.arsenico1Promedio)) /
            1000;
        let toxixidadHumanaCadmio1 =
            (toxixidadHumana.CADMIO *
                (this.salidaAguaDescargadaTotal * this.cadmio1Promedio)) /
            1000;
        let toxixidadHumanaCromo1 =
            (toxixidadHumana.CROMO *
                (this.salidaAguaDescargadaTotal * this.cromo1Promedio)) /
            1000;
        let toxixidadHumanaCobre1 =
            (toxixidadHumana.COBRE *
                (this.salidaAguaDescargadaTotal * this.cobre1Promedio)) /
            1000;
        let toxixidadHumanaMercurio1 =
            (toxixidadHumana.MERCURIO *
                (this.salidaAguaDescargadaTotal * this.mercurio1Promedio)) /
            1000;
        let toxixidadHumanaNiquel1 =
            (toxixidadHumana.NIQUEL *
                (this.salidaAguaDescargadaTotal * this.niquel1Promedio)) /
            1000;
        let toxixidadHumanaPlomo1 =
            (toxixidadHumana.PLOMO *
                (this.salidaAguaDescargadaTotal * this.plomo1Promedio)) /
            1000;
        let toxixidadHumanaZinc1 =
            (toxixidadHumana.ZINC *
                (this.salidaAguaDescargadaTotal * this.zinc1Promedio)) /
            1000;
        let toxixidadHumanaPentaclorofenol1 =
            (toxixidadHumana.PENTACLOROFENOL *
                (this.salidaAguaDescargadaTotal * this.pentaclorofenol1Promedio)) /
            1000;

        let ecotoxixidadArsenico1 =
            (ecotoxixidad.ARSENICO *
                (this.salidaAguaDescargadaTotal * this.arsenico1Promedio)) /
            1000;
        let ecotoxixidadCadmio1 =
            (ecotoxixidad.CADMIO *
                (this.salidaAguaDescargadaTotal * this.cadmio1Promedio)) /
            1000;
        let ecotoxixidadCromo1 =
            (ecotoxixidad.CROMO *
                (this.salidaAguaDescargadaTotal * this.cromo1Promedio)) /
            1000;
        let ecotoxixidadCobre1 =
            (ecotoxixidad.COBRE *
                (this.salidaAguaDescargadaTotal * this.cobre1Promedio)) /
            1000;
        let ecotoxixidadMercurio1 =
            (ecotoxixidad.MERCURIO *
                (this.salidaAguaDescargadaTotal * this.mercurio1Promedio)) /
            1000;
        let ecotoxixidadNiquel1 =
            (ecotoxixidad.NIQUEL *
                (this.salidaAguaDescargadaTotal * this.niquel1Promedio)) /
            1000;
        let ecotoxixidadPlomo1 =
            (ecotoxixidad.PLOMO *
                (this.salidaAguaDescargadaTotal * this.plomo1Promedio)) /
            1000;
        let ecotoxixidadZinc1 =
            (ecotoxixidad.ZINC *
                (this.salidaAguaDescargadaTotal * this.zinc1Promedio)) /
            1000;
        let ecotoxixidadPentaclorofenol1 =
            (ecotoxixidad.PENTACLOROFENOL *
                (this.salidaAguaDescargadaTotal * this.pentaclorofenol1Promedio)) /
            1000;

        let eutrofizacionFosforo1 =
            (eutrofizacion.FOSFORO *
                (this.salidaAguaDescargadaTotal * this.fosforoTotal1Promedio)) /
            1000;
        let eutrofizacionDqo1 =
            (eutrofizacion.DQO *
                (this.salidaAguaDescargadaTotal * this.dqo1Promedio)) /
            1000;

        let toxixidadHumanaArsenico2 =
            (toxixidadHumana.ARSENICO *
                (this.salidaAguaInfiltradaTotal * this.arsenico2Promedio)) /
            1000;
        let toxixidadHumanaCadmio2 =
            (toxixidadHumana.CADMIO *
                (this.salidaAguaInfiltradaTotal * this.cadmio2Promedio)) /
            1000;
        let toxixidadHumanaCromo2 =
            (toxixidadHumana.CROMO *
                (this.salidaAguaInfiltradaTotal * this.cromo2Promedio)) /
            1000;
        let toxixidadHumanaCobre2 =
            (toxixidadHumana.COBRE *
                (this.salidaAguaInfiltradaTotal * this.cobre2Promedio)) /
            1000;
        let toxixidadHumanaMercurio2 =
            (toxixidadHumana.MERCURIO *
                (this.salidaAguaInfiltradaTotal * this.mercurio2Promedio)) /
            1000;
        let toxixidadHumanaNiquel2 =
            (toxixidadHumana.NIQUEL *
                (this.salidaAguaInfiltradaTotal * this.niquel2Promedio)) /
            1000;
        let toxixidadHumanaPlomo2 =
            (toxixidadHumana.PLOMO *
                (this.salidaAguaInfiltradaTotal * this.plomo2Promedio)) /
            1000;
        let toxixidadHumanaZinc2 =
            (toxixidadHumana.ZINC *
                (this.salidaAguaInfiltradaTotal * this.zinc2Promedio)) /
            1000;
        let toxixidadHumanaPentaclorofenol2 =
            (toxixidadHumana.PENTACLOROFENOL *
                (this.salidaAguaInfiltradaTotal * this.pentaclorofenol2Promedio)) /
            1000;

        let ecotoxixidadArsenico2 =
            (ecotoxixidad.ARSENICO *
                (this.salidaAguaInfiltradaTotal * this.arsenico2Promedio)) /
            1000;
        let ecotoxixidadCadmio2 =
            (ecotoxixidad.CADMIO *
                (this.salidaAguaInfiltradaTotal * this.cadmio2Promedio)) /
            1000;
        let ecotoxixidadCromo2 =
            (ecotoxixidad.CROMO *
                (this.salidaAguaInfiltradaTotal * this.cromo2Promedio)) /
            1000;
        let ecotoxixidadCobre2 =
            (ecotoxixidad.COBRE *
                (this.salidaAguaInfiltradaTotal * this.cobre2Promedio)) /
            1000;
        let ecotoxixidadMercurio2 =
            (ecotoxixidad.MERCURIO *
                (this.salidaAguaInfiltradaTotal * this.mercurio2Promedio)) /
            1000;
        let ecotoxixidadNiquel2 =
            (ecotoxixidad.NIQUEL *
                (this.salidaAguaInfiltradaTotal * this.niquel2Promedio)) /
            1000;
        let ecotoxixidadPlomo2 =
            (ecotoxixidad.PLOMO *
                (this.salidaAguaInfiltradaTotal * this.plomo2Promedio)) /
            1000;
        let ecotoxixidadZinc2 =
            (ecotoxixidad.ZINC *
                (this.salidaAguaInfiltradaTotal * this.zinc2Promedio)) /
            1000;
        let ecotoxixidadPentaclorofenol2 =
            (ecotoxixidad.PENTACLOROFENOL *
                (this.salidaAguaInfiltradaTotal * this.pentaclorofenol2Promedio)) /
            1000;

        let eutrofizacionFosforo2 =
            (eutrofizacion.FOSFORO *
                (this.salidaAguaInfiltradaTotal * this.fosforoTotal2Promedio)) /
            1000;
        let eutrofizacionDqo2 =
            (eutrofizacion.DQO *
                (this.salidaAguaInfiltradaTotal * this.dqo2Promedio)) /
            1000;

        let toxixidadHumanaArsenico3 =
            (toxixidadHumana.ARSENICO *
                (this.salidaAguaConsumidaTotal * this.arsenico3Promedio)) /
            1000;
        let toxixidadHumanaCadmio3 =
            (toxixidadHumana.CADMIO *
                (this.salidaAguaConsumidaTotal * this.cadmio3Promedio)) /
            1000;
        let toxixidadHumanaCromo3 =
            (toxixidadHumana.CROMO *
                (this.salidaAguaConsumidaTotal * this.cromo3Promedio)) /
            1000;
        let toxixidadHumanaCobre3 =
            (toxixidadHumana.COBRE *
                (this.salidaAguaConsumidaTotal * this.cobre3Promedio)) /
            1000;
        let toxixidadHumanaMercurio3 =
            (toxixidadHumana.MERCURIO *
                (this.salidaAguaConsumidaTotal * this.mercurio3Promedio)) /
            1000;
        let toxixidadHumanaNiquel3 =
            (toxixidadHumana.NIQUEL *
                (this.salidaAguaConsumidaTotal * this.niquel3Promedio)) /
            1000;
        let toxixidadHumanaPlomo3 =
            (toxixidadHumana.PLOMO *
                (this.salidaAguaConsumidaTotal * this.plomo3Promedio)) /
            1000;
        let toxixidadHumanaZinc3 =
            (toxixidadHumana.ZINC *
                (this.salidaAguaConsumidaTotal * this.zinc3Promedio)) /
            1000;
        let toxixidadHumanaPentaclorofenol3 =
            (toxixidadHumana.PENTACLOROFENOL *
                (this.salidaAguaConsumidaTotal * this.pentaclorofenol3Promedio)) /
            1000;

        let ecotoxixidadArsenico3 =
            (ecotoxixidad.ARSENICO *
                (this.salidaAguaConsumidaTotal * this.arsenico3Promedio)) /
            1000;
        let ecotoxixidadCadmio3 =
            (ecotoxixidad.CADMIO *
                (this.salidaAguaConsumidaTotal * this.cadmio3Promedio)) /
            1000;
        let ecotoxixidadCromo3 =
            (ecotoxixidad.CROMO *
                (this.salidaAguaConsumidaTotal * this.cromo3Promedio)) /
            1000;
        let ecotoxixidadCobre3 =
            (ecotoxixidad.COBRE *
                (this.salidaAguaConsumidaTotal * this.cobre3Promedio)) /
            1000;
        let ecotoxixidadMercurio3 =
            (ecotoxixidad.MERCURIO *
                (this.salidaAguaConsumidaTotal * this.mercurio3Promedio)) /
            1000;
        let ecotoxixidadNiquel3 =
            (ecotoxixidad.NIQUEL *
                (this.salidaAguaConsumidaTotal * this.niquel3Promedio)) /
            1000;
        let ecotoxixidadPlomo3 =
            (ecotoxixidad.PLOMO *
                (this.salidaAguaConsumidaTotal * this.plomo3Promedio)) /
            1000;
        let ecotoxixidadZinc3 =
            (ecotoxixidad.ZINC *
                (this.salidaAguaConsumidaTotal * this.zinc3Promedio)) /
            1000;
        let ecotoxixidadPentaclorofenol3 =
            (ecotoxixidad.PENTACLOROFENOL *
                (this.salidaAguaConsumidaTotal * this.pentaclorofenol3Promedio)) /
            1000;

        let eutrofizacionFosforo3 =
            (eutrofizacion.FOSFORO *
                (this.salidaAguaConsumidaTotal * this.fosforoTotal3Promedio)) /
            1000;
        let eutrofizacionDqo3 =
            (eutrofizacion.DQO *
                (this.salidaAguaConsumidaTotal * this.dqo3Promedio)) /
            1000;

        let toxixidadHumana1 =
            toxixidadHumanaArsenico1 +
            toxixidadHumanaCadmio1 +
            toxixidadHumanaCromo1 +
            toxixidadHumanaCobre1 +
            toxixidadHumanaMercurio1 +
            toxixidadHumanaNiquel1 +
            toxixidadHumanaPlomo1 +
            toxixidadHumanaZinc1 +
            toxixidadHumanaPentaclorofenol1;
        let ecotoxixidad1 =
            ecotoxixidadArsenico1 +
            ecotoxixidadCadmio1 +
            ecotoxixidadCromo1 +
            ecotoxixidadCobre1 +
            ecotoxixidadMercurio1 +
            ecotoxixidadNiquel1 +
            ecotoxixidadPlomo1 +
            ecotoxixidadZinc1 +
            ecotoxixidadPentaclorofenol1;
        let eutrofizacion1 = eutrofizacionFosforo1 + eutrofizacionDqo1;

        let toxixidadHumana2 =
            toxixidadHumanaArsenico2 +
            toxixidadHumanaCadmio2 +
            toxixidadHumanaCromo2 +
            toxixidadHumanaCobre2 +
            toxixidadHumanaMercurio2 +
            toxixidadHumanaNiquel2 +
            toxixidadHumanaPlomo2 +
            toxixidadHumanaZinc2 +
            toxixidadHumanaPentaclorofenol2;
        let ecotoxixidad2 =
            ecotoxixidadArsenico2 +
            ecotoxixidadCadmio2 +
            ecotoxixidadCromo2 +
            ecotoxixidadCobre2 +
            ecotoxixidadMercurio2 +
            ecotoxixidadNiquel2 +
            ecotoxixidadPlomo2 +
            ecotoxixidadZinc2 +
            ecotoxixidadPentaclorofenol2;
        let eutrofizacion2 = eutrofizacionFosforo2 + eutrofizacionDqo2;

        let toxixidadHumana3 =
            toxixidadHumanaArsenico3 +
            toxixidadHumanaCadmio3 +
            toxixidadHumanaCromo3 +
            toxixidadHumanaCobre3 +
            toxixidadHumanaMercurio3 +
            toxixidadHumanaNiquel3 +
            toxixidadHumanaPlomo3 +
            toxixidadHumanaZinc3 +
            toxixidadHumanaPentaclorofenol3;
        let ecotoxixidad3 =
            ecotoxixidadArsenico3 +
            ecotoxixidadCadmio3 +
            ecotoxixidadCromo3 +
            ecotoxixidadCobre3 +
            ecotoxixidadMercurio3 +
            ecotoxixidadNiquel3 +
            ecotoxixidadPlomo3 +
            ecotoxixidadZinc3 +
            ecotoxixidadPentaclorofenol3;
        let eutrofizacion3 = eutrofizacionFosforo3 + eutrofizacionDqo3;

        let enfermedadesPorToxicidad1Arcenico1 =
            (toxixidadHumanaFinal.ARSENICO *
                (this.salidaAguaDescargadaTotal * this.arsenico1Promedio)) /
            1000;
        let enfermedadesPorToxicidad1Cadmio1 =
            (toxixidadHumanaFinal.CADMIO *
                (this.salidaAguaDescargadaTotal * this.cadmio1Promedio)) /
            1000;
        let enfermedadesPorToxicidad1Cromo1 =
            (toxixidadHumanaFinal.CROMO *
                (this.salidaAguaDescargadaTotal * this.cromo1Promedio)) /
            1000;
        let enfermedadesPorToxicidad1Cobre1 =
            (toxixidadHumanaFinal.COBRE *
                (this.salidaAguaDescargadaTotal * this.cobre1Promedio)) /
            1000;
        let enfermedadesPorToxicidad1Mercurio1 =
            (toxixidadHumanaFinal.MERCURIO *
                (this.salidaAguaDescargadaTotal * this.mercurio1Promedio)) /
            1000;
        let enfermedadesPorToxicidad1Niquel1 =
            (toxixidadHumanaFinal.NIQUEL *
                (this.salidaAguaDescargadaTotal * this.niquel1Promedio)) /
            1000;
        let enfermedadesPorToxicidad1Plomo1 =
            (toxixidadHumanaFinal.PLOMO *
                (this.salidaAguaDescargadaTotal * this.plomo1Promedio)) /
            1000;
        let enfermedadesPorToxicidad1Zinc1 =
            (toxixidadHumanaFinal.ZINC *
                (this.salidaAguaDescargadaTotal * this.zinc1Promedio)) /
            1000;
        let enfermedadesPorToxicidad1Pentaclorofenol1 =
            (toxixidadHumanaFinal.PENTACLOROFENOL *
                (this.salidaAguaDescargadaTotal * this.pentaclorofenol1Promedio)) /
            1000;

        let enfermedadesPorToxicidad1 =
            enfermedadesPorToxicidad1Arcenico1 +
            enfermedadesPorToxicidad1Cadmio1 +
            enfermedadesPorToxicidad1Cromo1 +
            enfermedadesPorToxicidad1Cobre1 +
            enfermedadesPorToxicidad1Mercurio1 +
            enfermedadesPorToxicidad1Niquel1 +
            enfermedadesPorToxicidad1Plomo1 +
            enfermedadesPorToxicidad1Zinc1 +
            enfermedadesPorToxicidad1Pentaclorofenol1;

        let ecosistemasAcuaticosAfectadosPorEcotoxicidad1 = ecotoxixidad1 * 0.00055;
        let ecosistemasAcuaticosAfectadosPorEutrofizacion1 =
            eutrofizacion1 * 34.958282;

        let enfermedadesPorToxicidad1Arcenico2 =
            (toxixidadHumanaFinal.ARSENICO *
                (this.salidaAguaInfiltradaTotal * this.arsenico2Promedio)) /
            1000;
        let enfermedadesPorToxicidad1Cadmio2 =
            (toxixidadHumanaFinal.CADMIO *
                (this.salidaAguaInfiltradaTotal * this.cadmio2Promedio)) /
            1000;
        let enfermedadesPorToxicidad1Cromo2 =
            (toxixidadHumanaFinal.CROMO *
                (this.salidaAguaInfiltradaTotal * this.cromo2Promedio)) /
            1000;
        let enfermedadesPorToxicidad1Cobre2 =
            (toxixidadHumanaFinal.COBRE *
                (this.salidaAguaInfiltradaTotal * this.cobre2Promedio)) /
            1000;
        let enfermedadesPorToxicidad1Mercurio2 =
            (toxixidadHumanaFinal.MERCURIO *
                (this.salidaAguaInfiltradaTotal * this.mercurio2Promedio)) /
            1000;
        let enfermedadesPorToxicidad1Niquel2 =
            (toxixidadHumanaFinal.NIQUEL *
                (this.salidaAguaInfiltradaTotal * this.niquel2Promedio)) /
            1000;
        let enfermedadesPorToxicidad1Plomo2 =
            (toxixidadHumanaFinal.PLOMO *
                (this.salidaAguaInfiltradaTotal * this.plomo2Promedio)) /
            1000;
        let enfermedadesPorToxicidad1Zinc2 =
            (toxixidadHumanaFinal.ZINC *
                (this.salidaAguaInfiltradaTotal * this.zinc2Promedio)) /
            1000;
        let enfermedadesPorToxicidad1Pentaclorofenol2 =
            (toxixidadHumanaFinal.PENTACLOROFENOL *
                (this.salidaAguaInfiltradaTotal * this.pentaclorofenol2Promedio)) /
            1000;

        let enfermedadesPorToxicidad2 =
            enfermedadesPorToxicidad1Arcenico2 +
            enfermedadesPorToxicidad1Cadmio2 +
            enfermedadesPorToxicidad1Cromo2 +
            enfermedadesPorToxicidad1Cobre2 +
            enfermedadesPorToxicidad1Mercurio2 +
            enfermedadesPorToxicidad1Niquel2 +
            enfermedadesPorToxicidad1Plomo2 +
            enfermedadesPorToxicidad1Zinc2 +
            enfermedadesPorToxicidad1Pentaclorofenol1;

        let ecosistemasAcuaticosAfectadosPorEcotoxicidad2 = ecotoxixidad2 * 0.00055;
        let ecosistemasAcuaticosAfectadosPorEutrofizacion2 =
            eutrofizacion2 * 34.958282;

        let enfermedadesPorToxicidad1Arcenico3 =
            (toxixidadHumanaFinal.ARSENICO *
                (this.salidaAguaConsumidaTotal * this.arsenico3Promedio)) /
            1000;
        let enfermedadesPorToxicidad1Cadmio3 =
            (toxixidadHumanaFinal.CADMIO *
                (this.salidaAguaConsumidaTotal * this.cadmio3Promedio)) /
            1000;
        let enfermedadesPorToxicidad1Cromo3 =
            (toxixidadHumanaFinal.CROMO *
                (this.salidaAguaConsumidaTotal * this.cromo3Promedio)) /
            1000;
        let enfermedadesPorToxicidad1Cobre3 =
            (toxixidadHumanaFinal.COBRE *
                (this.salidaAguaConsumidaTotal * this.cobre3Promedio)) /
            1000;
        let enfermedadesPorToxicidad1Mercurio3 =
            (toxixidadHumanaFinal.MERCURIO *
                (this.salidaAguaConsumidaTotal * this.mercurio3Promedio)) /
            1000;
        let enfermedadesPorToxicidad1Niquel3 =
            (toxixidadHumanaFinal.NIQUEL *
                (this.salidaAguaConsumidaTotal * this.niquel3Promedio)) /
            1000;
        let enfermedadesPorToxicidad1Plomo3 =
            (toxixidadHumanaFinal.PLOMO *
                (this.salidaAguaConsumidaTotal * this.plomo3Promedio)) /
            1000;
        let enfermedadesPorToxicidad1Zinc3 =
            (toxixidadHumanaFinal.ZINC *
                (this.salidaAguaConsumidaTotal * this.zinc3Promedio)) /
            1000;
        let enfermedadesPorToxicidad1Pentaclorofenol3 =
            (toxixidadHumanaFinal.PENTACLOROFENOL *
                (this.salidaAguaConsumidaTotal * this.pentaclorofenol3Promedio)) /
            1000;

        let enfermedadesPorToxicidad3 =
            enfermedadesPorToxicidad1Arcenico3 +
            enfermedadesPorToxicidad1Cadmio3 +
            enfermedadesPorToxicidad1Cromo3 +
            enfermedadesPorToxicidad1Cobre3 +
            enfermedadesPorToxicidad1Mercurio3 +
            enfermedadesPorToxicidad1Niquel3 +
            enfermedadesPorToxicidad1Plomo3 +
            enfermedadesPorToxicidad1Zinc3 +
            enfermedadesPorToxicidad1Pentaclorofenol1;

        let ecosistemasAcuaticosAfectadosPorEcotoxicidad3 = ecotoxixidad3 * 0.00055;
        let ecosistemasAcuaticosAfectadosPorEutrofizacion3 =
            eutrofizacion3 * 34.958282;



        const totales = {
            entradaAguaPotableTotal: Number(this.aguaPotableMensualTotal.toFixed(6)),
            entradaAguaPozoTotal: Number(this.aguaSuperficialTotal.toFixed(6)),
            entradaAguaSuperficialTotal: Number(this.aguaSuperficialTotal.toFixed(6)),
            salidaAguaDescargada: Number(this.salidaAguaDescargadaTotal.toFixed(6)),
            salidaAguaInfiltrada: Number(this.salidaAguaInfiltradaTotal.toFixed(6)),
            aguaDulceConsumida: Number(this.salidaAguaConsumidaTotal.toFixed(6)),

            nitrogenoTatal: 0,
            nitrgenoTotalKjeldahl: (
                Number(((this.salidaAguaDescargadaTotal * this.nitrogenoKjeldahl1Promedio) / 1000).toFixed(6)) +
                Number(((this.salidaAguaInfiltradaTotal * this.nitrogenoKjeldahl2Promedio) / 1000).toFixed(6))
            ),
            fosforoTotalTotal: (
                Number(((this.salidaAguaDescargadaTotal * this.fosforoTotal1Promedio) / 1000).toFixed(6))
            ),
            fosfatoTotal: (
                Number(((this.salidaAguaDescargadaTotal * this.fosfato1Promedio) / 1000).toFixed(6)) +
                Number(((this.salidaAguaInfiltradaTotal * this.fosfato2Promedio) / 1000).toFixed(6)) +
                Number(((this.salidaAguaConsumidaTotal * this.fosfato3Promedio) / 1000).toFixed(6))
            ),
            demandaBioOxgTotal: (
                Number(((this.salidaAguaDescargadaTotal * this.dbo1Promedio) / 1000).toFixed(6))
            ),
            arsenicoTotal: (
                Number(((this.salidaAguaDescargadaTotal * this.arsenico1Promedio) / 1000).toFixed(6)) +
                Number(((this.salidaAguaInfiltradaTotal * this.arsenico2Promedio) / 1000).toFixed(6))
            ),
            cadminioTotal: (
                Number(((this.salidaAguaDescargadaTotal * this.cadmio1Promedio) / 1000).toFixed(6)) +
                Number(((this.salidaAguaInfiltradaTotal * this.cadmio2Promedio) / 1000).toFixed(6))
            ),
            cromoTotal: (
                Number(((this.salidaAguaDescargadaTotal * this.cromo1Promedio) / 1000).toFixed(6)) +
                Number(((this.salidaAguaInfiltradaTotal * this.cromo2Promedio) / 1000).toFixed(6))
            ),
            cobreTotal: (
                Number(((this.salidaAguaDescargadaTotal * this.cobre1Promedio) / 1000).toFixed(6)) +
                Number(((this.salidaAguaInfiltradaTotal * this.cobre2Promedio) / 1000).toFixed(6)) +
                Number(((this.salidaAguaConsumidaTotal * this.cobre3Promedio) / 1000).toFixed(6))
            ),
            mercurioTotal: (
                Number(((this.salidaAguaDescargadaTotal * this.mercurio1Promedio) / 1000).toFixed(6)) +
                Number(((this.salidaAguaInfiltradaTotal * this.mercurio2Promedio) / 1000).toFixed(6))
            ),
            niquelTotal: (
                Number(((this.salidaAguaDescargadaTotal * this.niquel1Promedio) / 1000).toFixed(6)) +
                Number(((this.salidaAguaInfiltradaTotal * this.niquel2Promedio) / 1000).toFixed(6))
            ),
            plomoTotal: (
                Number(((this.salidaAguaDescargadaTotal * this.plomo1Promedio) / 1000).toFixed(6)) +
                Number(((this.salidaAguaInfiltradaTotal * this.plomo2Promedio) / 1000).toFixed(6))
            ),
            zincTotal: (
                Number(((this.salidaAguaDescargadaTotal * this.zinc1Promedio) / 1000).toFixed(6)) +
                Number(((this.salidaAguaInfiltradaTotal * this.zinc2Promedio) / 1000).toFixed(6))
            ),
            pentaclorofenolTotal: (
                Number(((this.salidaAguaDescargadaTotal * this.pentaclorofenol1Promedio) / 1000).toFixed(6)) +
                Number(((this.salidaAguaInfiltradaTotal * this.pentaclorofenol2Promedio) / 1000).toFixed(6))
            ),

            availableWaterRemainingAwareTotal: Number((this.salidaAguaConsumidaTotal * 80.095291).toFixed(6)),
            toxixidadHumanaTotal: Number((toxixidadHumana1 + toxixidadHumana2).toFixed(6)),
            ecotoxixidadTotal: Number((ecotoxixidad1 + ecotoxixidad2).toFixed(6)),
            eutrofizacionTotal: Number((eutrofizacion1 + eutrofizacion2).toFixed(6)),

            potencialesImpactosSaludTotal: Number((this.salidaAguaConsumidaTotal * 0.000017256729214146).toFixed(6)),
            enfermedadesPorToxicidadTotal: Number((enfermedadesPorToxicidad1 + enfermedadesPorToxicidad2).toFixed(6)),
            disminucionBiodiversidadTerrestreTotal: Number((this.salidaAguaConsumidaTotal * 0.266051).toFixed(6)),
            ecosistemasAcuaticosAfectadosPorEcotoxicidadTotal: Number((ecosistemasAcuaticosAfectadosPorEcotoxicidad1 + ecosistemasAcuaticosAfectadosPorEcotoxicidad2).toFixed(6)),
            ecosistemasAcuaticosAfectadosPorEutrofizacionTotal: Number((ecosistemasAcuaticosAfectadosPorEutrofizacion1 + ecosistemasAcuaticosAfectadosPorEutrofizacion2).toFixed(6)),

        };

        const totalesPorcentaje = {
            entradaAguaPotableTotal: 100,
            entradaAguaPozoTotal: 100,
            entradaAguaSuperficialTotal: 100,
            salidaAguaDescargada: 100,
            salidaAguaInfiltrada: 100,
            aguaDulceConsumida: 100,

            nitrogenoTotal: 0,
            nitrgenoTotalKjeldahl: ((
                (this.salidaAguaDescargadaTotal * this.nitrogenoKjeldahl1Promedio / 1000) +
                (this.salidaAguaInfiltradaTotal * this.nitrogenoKjeldahl2Promedio / 1000)
            ) / totales.nitrgenoTotalKjeldahl * 100).toFixed(1),

            fosforoTotalTotal: ((
                (this.salidaAguaDescargadaTotal * this.fosforoTotal1Promedio / 1000)
            ) / totales.fosforoTotalTotal * 100).toFixed(1),

            fosfatoTotal: isNaN((
                (this.salidaAguaDescargadaTotal * this.fosfato1Promedio / 1000) +
                (this.salidaAguaInfiltradaTotal * this.fosfato2Promedio / 1000) +
                (this.salidaAguaConsumidaTotal * this.fosfato3Promedio / 1000)
            ) / totales.fosfatoTotal * 100) ? 0 : (
                (
                    (this.salidaAguaDescargadaTotal * this.fosfato1Promedio / 1000) +
                    (this.salidaAguaInfiltradaTotal * this.fosfato2Promedio / 1000) +
                    (this.salidaAguaConsumidaTotal * this.fosfato3Promedio / 1000)
                ) / totales.fosfatoTotal * 100
            ).toFixed(1),
            demandaBioOxgTotal: ((
                (this.salidaAguaDescargadaTotal * this.dbo1Promedio / 1000)
            ) / totales.demandaBioOxgTotal * 100).toFixed(1),

            arsenicoTotal: ((
                (this.salidaAguaDescargadaTotal * this.arsenico1Promedio / 1000) +
                (this.salidaAguaInfiltradaTotal * this.arsenico2Promedio / 1000)
            ) / totales.arsenicoTotal * 100).toFixed(1),

            cadminioTotal: ((
                (this.salidaAguaDescargadaTotal * this.cadmio1Promedio / 1000) +
                (this.salidaAguaInfiltradaTotal * this.cadmio2Promedio / 1000)
            ) / totales.cadminioTotal * 100).toFixed(1),

            cromoTotal: ((
                (this.salidaAguaDescargadaTotal * this.cromo1Promedio / 1000) +
                (this.salidaAguaInfiltradaTotal * this.cromo2Promedio / 1000)
            ) / totales.cromoTotal * 100).toFixed(1),

            cobreTotal: ((
                (this.salidaAguaDescargadaTotal * this.cobre1Promedio / 1000) +
                (this.salidaAguaInfiltradaTotal * this.cobre2Promedio / 1000) +
                (this.salidaAguaConsumidaTotal * this.cobre3Promedio / 1000)
            ) / totales.cobreTotal * 100).toFixed(1),

            mercurioTotal: ((
                (this.salidaAguaDescargadaTotal * this.mercurio1Promedio / 1000) +
                (this.salidaAguaInfiltradaTotal * this.mercurio2Promedio / 1000)
            ) / totales.mercurioTotal * 100).toFixed(1),

            niquelTotal: ((
                (this.salidaAguaDescargadaTotal * this.niquel1Promedio / 1000) +
                (this.salidaAguaInfiltradaTotal * this.niquel2Promedio / 1000)
            ) / totales.niquelTotal * 100).toFixed(1),

            plomoTotal: ((
                (this.salidaAguaDescargadaTotal * this.plomo1Promedio / 1000) +
                (this.salidaAguaInfiltradaTotal * this.plomo2Promedio / 1000)
            ) / totales.plomoTotal * 100).toFixed(1),

            zincTotal: ((
                (this.salidaAguaDescargadaTotal * this.zinc1Promedio / 1000) +
                (this.salidaAguaInfiltradaTotal * this.zinc2Promedio / 1000)
            ) / totales.zincTotal * 100).toFixed(1),

            pentaclorofenolTotal: ((
                (this.salidaAguaDescargadaTotal * this.pentaclorofenol1Promedio / 1000) +
                (this.salidaAguaInfiltradaTotal * this.pentaclorofenol2Promedio / 1000)
            ) / totales.pentaclorofenolTotal * 100).toFixed(1),

            availableWaterRemainingAwareTotal: ((
                this.salidaAguaConsumidaTotal * 80.095291
            ) / totales.availableWaterRemainingAwareTotal * 100).toFixed(1),

            toxixidadHumanaTotal: ((
                toxixidadHumana1 + toxixidadHumana2
            ) / totales.toxixidadHumanaTotal * 100).toFixed(1),

            ecotoxicidadTotal: ((
                ecotoxixidad1 + ecotoxixidad2
            ) / totales.ecotoxixidadTotal * 100).toFixed(1),

            eutrofizacionTotal: ((
                eutrofizacion1 + eutrofizacion2
            ) / totales.eutrofizacionTotal * 100).toFixed(1),

            potencialesImpactosSaludTotal: ((
                this.salidaAguaConsumidaTotal * 0.000017256729214146
            ) / totales.potencialesImpactosSaludTotal * 100).toFixed(1),

            enfermedadesPorToxicidadTotal: ((
                enfermedadesPorToxicidad1 + enfermedadesPorToxicidad2
            ) / totales.enfermedadesPorToxicidadTotal * 100).toFixed(1),

            disminucionBiodiversidadTerrestreTotal: ((
                this.salidaAguaConsumidaTotal * 0.266051
            ) / totales.disminucionBiodiversidadTerrestreTotal * 100).toFixed(1),

            ecosistemasAcuaticosAfectadosPorEcotoxicidadTotal: ((
                ecosistemasAcuaticosAfectadosPorEcotoxicidad1 + ecosistemasAcuaticosAfectadosPorEcotoxicidad2
            ) / totales.ecosistemasAcuaticosAfectadosPorEcotoxicidadTotal * 100).toFixed(1),

            ecosistemasAcuaticosAfectadosPorEutrofizacionTotal: ((
                ecosistemasAcuaticosAfectadosPorEutrofizacion1 + ecosistemasAcuaticosAfectadosPorEutrofizacion2
            ) / totales.ecosistemasAcuaticosAfectadosPorEutrofizacionTotal * 100).toFixed(1),
        };

        const dataLista = {
            datosEmpresa: {
                nombreEmpresa: this.nombreEmpresa,
                instalacionMedida: this.instalacionMedida,
                ubicacionMedidaR: this.ubicacionMedidaR,
                ubicacionMedidaC: this.ubicacionMedidaC,
                tipoProducto: this.tipoProducto,
            },
            entrasdaDeAgua: [
                {
                    categoria: 'ENTRADA AGUA POTABLE',
                    fuente: this.aguaPotableMensualUso,
                    total: this.aguaPotableMensualTotal.toFixed(6),
                    promedio: this.aguaPotableMensualPromedio.toFixed(6),
                    porcentaje: (this.aguaPotableMensualTotal / this.aguaPotableMensualTotal) * 100
                },
                {
                    categoria: 'ENTRADA AGUA POZO',
                    fuente: this.aguaPozoFuenteUso,
                    total: this.aguaPozoTotal.toFixed(6),
                    promedio: this.aguaPozoPromedio.toFixed(6),
                    porcentaje: (this.aguaPozoTotal / this.aguaPozoTotal) * 100
                },
                {
                    categoria: 'ENTRADA AGUA SUPERFICIAL',
                    fuente: this.aguaSuperficialFuenteUso,
                    total: this.aguaSuperficialTotal.toFixed(6),
                    promedio: this.aguaSuperficialPromedio.toFixed(6),
                    porcentaje: (this.aguaSuperficialTotal / this.aguaSuperficialTotal) * 100

                },
            ],
            salidasDeAgua: [
                {
                    categoria: 'SALIDA AGUA DESCARGADA',
                    proceso: this.salidaAguaDescargadaProceso,
                    total: this.salidaAguaDescargadaTotal.toFixed(6),
                    promedio: this.salidaAguaDescargadaPromedio.toFixed(6),
                    toxixidadHumana: toxixidadHumana1.toFixed(6),
                    toxixidadHumanaProcentaje: (toxixidadHumana1 / totales.toxixidadHumanaTotal * 100).toFixed(1),
                    ecotoxixidad: ecotoxixidad1.toFixed(6),
                    ecotoxixidadPorcentaje: (ecotoxixidad1 / totales.ecotoxixidadTotal * 100).toFixed(1),
                    eutrofizacion: eutrofizacion1.toFixed(6),
                    eutrofizacionPorcentahe: (eutrofizacion1 / totales.eutrofizacionTotal * 100).toFixed(1),
                    enfermedadesPorToxicidad: enfermedadesPorToxicidad1.toFixed(6),
                    enfermedadesPorToxicidadPorcentaje: (enfermedadesPorToxicidad1 / totales.enfermedadesPorToxicidadTotal * 100).toFixed(1),
                    ecosistemasAcuaticosAfectadosPorEcotoxicidad:
                        ecosistemasAcuaticosAfectadosPorEcotoxicidad1.toFixed(6),
                    ecosistemasAcuaticosAfectadosPorEcotoxicidadPorcentaje: (
                        ecosistemasAcuaticosAfectadosPorEcotoxicidad1 / totales.ecosistemasAcuaticosAfectadosPorEcotoxicidadTotal * 100).toFixed(1),
                    ecosistemasAcuaticosAfectadosPorEutrofizacion:
                        ecosistemasAcuaticosAfectadosPorEutrofizacion1.toFixed(6),
                    ecosistemasAcuaticosAfectadosPorEutrofizacionPorcentaje: (
                        ecosistemasAcuaticosAfectadosPorEutrofizacion1 / totales.ecosistemasAcuaticosAfectadosPorEutrofizacionTotal * 100).toFixed(1),
                    porcentaje: this.salidaAguaDescargadaTotal / this.salidaAguaDescargadaTotal * 100,
                    availableWaterRemainingAwarePorcentaje: 0,
                    potencialesImpactosSaludPorcentaje: 0,
                    disminucionBiodiversidadTerrestreTotal: 0,
                    calidad: [
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
                            porcentaje: totales.nitrogenoTatal ?
                                (((this.salidaAguaDescargadaTotal * this.nitrogeno1Promedio) / 1000) / totales.nitrogenoTatal * 100).toFixed(1) : '0.0'
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
                            porcentaje: totales.nitrgenoTotalKjeldahl ?
                                (((this.salidaAguaDescargadaTotal * this.nitrogenoKjeldahl1Promedio) / 1000) / totales.nitrgenoTotalKjeldahl * 100).toFixed(1) : '0.0',
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
                            porcentaje: totales.fosforoTotalTotal ?
                                (((this.salidaAguaDescargadaTotal * this.fosforoTotal1Promedio) / 1000) / totales.fosforoTotalTotal * 100).toFixed(1) : '0.0',
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
                            porcentaje: totales.fosfatoTotal ?
                                (((this.salidaAguaDescargadaTotal * this.fosfato1Promedio) / 1000) / totales.fosfatoTotal * 100).toFixed(1) : '0.0',
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
                            porcentaje: totales.demandaBioOxgTotal ?
                                (((this.salidaAguaDescargadaTotal * this.dqo1Promedio) / 1000) / totales.demandaBioOxgTotal * 100).toFixed(1) : '0.0',
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
                            porcentaje: totales.demandaBioOxgTotal ?
                                (((this.salidaAguaDescargadaTotal * this.dbo1Promedio) / 1000) / totales.demandaBioOxgTotal * 100).toFixed(1) : '0.0',
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
                            porcentaje: totales.arsenicoTotal ?
                                (((this.salidaAguaDescargadaTotal * this.arsenico1Promedio) / 1000) / totales.arsenicoTotal * 100).toFixed(1) : '0.0',
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
                            porcentaje: totales.cadminioTotal ?
                                (((this.salidaAguaDescargadaTotal * this.cadmio1Promedio) / 1000) / totales.cadminioTotal * 100).toFixed(1) : '0.0',
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
                            porcentaje: totales.cromoTotal ?
                                (((this.salidaAguaDescargadaTotal * this.cromo1Promedio) / 1000) / totales.cromoTotal * 100).toFixed(1) : '0.0',
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
                            porcentaje: totales.cobreTotal ?
                                (((this.salidaAguaDescargadaTotal * this.cobre1Promedio) / 1000) / totales.cobreTotal * 100).toFixed(1) : '0.0',
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
                            porcentaje: totales.mercurioTotal ?
                                (((this.salidaAguaDescargadaTotal * this.mercurio1Promedio) / 1000) / totales.mercurioTotal * 100).toFixed(1) : '0.0',
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
                            porcentaje: totales.niquelTotal ?
                                (((this.salidaAguaDescargadaTotal * this.niquel1Promedio) / 1000) / totales.niquelTotal * 100).toFixed(1) : '0.0',
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
                            porcentaje: totales.plomoTotal ?
                                (((this.salidaAguaDescargadaTotal * this.plomo1Promedio) / 1000) / totales.plomoTotal * 100).toFixed(1) : '0.0',
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
                            porcentaje: totales.zincTotal ?
                                (((this.salidaAguaDescargadaTotal * this.zinc1Promedio) / 1000) / totales.zincTotal * 100).toFixed(1) : '0.0',
                        },
                        {
                            parametro: 'Pentaclorofenol',
                            abreviacion: 'C6OHCL5',
                            unidad: '[mg/L]',
                            min: this.pentaclorofenol1Min.toFixed(6),
                            max: this.pentaclorofenol1Max.toFixed(6),
                            promedio: this.pentaclorofenol1Promedio.toFixed(6),
                            emisionContaminantes: (
                                (this.salidaAguaDescargadaTotal *
                                    this.pentaclorofenol1Promedio) /
                                1000
                            ).toFixed(6),
                            porcentaje: totales.pentaclorofenolTotal ?
                                (((this.salidaAguaDescargadaTotal * this.pentaclorofenol1Promedio) / 1000) / totales.pentaclorofenolTotal * 100).toFixed(1) : '0.0',
                        },
                    ],
                },
                {
                    categoria: 'SALIDA AGUA INFILTRADA',
                    proceso: this.salidaAguaInfiltradaProceso,
                    total: this.salidaAguaInfiltradaTotal.toFixed(6),
                    promedio: this.salidaAguaInfiltradaPromedio.toFixed(6),
                    toxixidadHumana: toxixidadHumana2.toFixed(6),
                    toxixidadHumanaProcentaje: (toxixidadHumana2 / totales.toxixidadHumanaTotal * 100).toFixed(1),
                    ecotoxixidad: ecotoxixidad2.toFixed(6),
                    ecotoxixidadPorcentaje: (ecotoxixidad2 / totales.ecotoxixidadTotal * 100).toFixed(1),
                    eutrofizacion: eutrofizacion2.toFixed(6),
                    eutrofizacionPorcentahe: (eutrofizacion2 / totales.eutrofizacionTotal * 100).toFixed(1),
                    enfermedadesPorToxicidad: enfermedadesPorToxicidad2.toFixed(6),
                    enfermedadesPorToxicidadPorcentaje: (enfermedadesPorToxicidad2 / totales.enfermedadesPorToxicidadTotal * 100).toFixed(1),
                    ecosistemasAcuaticosAfectadosPorEcotoxicidad:
                        ecosistemasAcuaticosAfectadosPorEcotoxicidad2.toFixed(6),
                    ecosistemasAcuaticosAfectadosPorEcotoxicidadPorcentaje: (
                        ecosistemasAcuaticosAfectadosPorEcotoxicidad2 / totales.ecosistemasAcuaticosAfectadosPorEcotoxicidadTotal * 100).toFixed(1),
                    ecosistemasAcuaticosAfectadosPorEutrofizacion:
                        ecosistemasAcuaticosAfectadosPorEutrofizacion2.toFixed(6),
                    ecosistemasAcuaticosAfectadosPorEutrofizacionPorcentaje: (
                        ecosistemasAcuaticosAfectadosPorEutrofizacion2 / totales.ecosistemasAcuaticosAfectadosPorEutrofizacionTotal * 100).toFixed(1),
                    porcentaje: this.salidaAguaInfiltradaTotal / this.salidaAguaInfiltradaTotal * 100,
                    availableWaterRemainingAwarePorcentaje: 0,
                    potencialesImpactosSaludPorcentaje: 0,
                    disminucionBiodiversidadTerrestreTotal: 0,
                    calidad: [
                        {
                            parametro: 'Nitrógeno Total',
                            abreviacion: 'N',
                            unidad: '[mg/L]',
                            min: this.nitrogeno2Min.toFixed(6),
                            max: this.nitrogeno2Max.toFixed(6),
                            promedio: this.nitrogeno2Promedio.toFixed(6),
                            emisionContaminantes: ((this.salidaAguaInfiltradaTotal * this.nitrogeno2Promedio) / 1000).toFixed(6),
                            porcentaje: totales.nitrogenoTatal ?
                                (((this.salidaAguaInfiltradaTotal * this.nitrogeno2Promedio) / 1000) / totales.nitrogenoTatal * 100).toFixed(1) : '0.0'
                        },
                        {
                            parametro: 'Nitrógeno Total Kjeldahl',
                            abreviacion: 'NTK',
                            unidad: '[mg/L]',
                            min: this.nitrogenoKjeldahl2Min.toFixed(6),
                            max: this.nitrogenoKjeldahl2Max.toFixed(6),
                            promedio: this.nitrogenoKjeldahl2Promedio.toFixed(6),
                            emisionContaminantes: ((this.salidaAguaInfiltradaTotal * this.nitrogenoKjeldahl2Promedio) / 1000).toFixed(6),
                            porcentaje: totales.nitrgenoTotalKjeldahl ?
                                (((this.salidaAguaInfiltradaTotal * this.nitrogenoKjeldahl2Promedio) / 1000) / totales.nitrgenoTotalKjeldahl * 100).toFixed(1) : '0.0'
                        },
                        {
                            parametro: 'Fósforo Total',
                            abreviacion: 'P',
                            unidad: '[mg/L]',
                            min: this.fosforoTotal2Min.toFixed(6),
                            max: this.fosforoTotal2Max.toFixed(6),
                            promedio: this.fosforoTotal2Promedio.toFixed(6),
                            emisionContaminantes: (
                                (this.salidaAguaDescargadaTotal * this.fosforoTotal2Promedio) /
                                1000
                            ).toFixed(6),
                            porcentaje: totales.fosforoTotalTotal ?
                                (((this.salidaAguaDescargadaTotal * this.fosforoTotal2Promedio) / 1000) / totales.fosforoTotalTotal * 100).toFixed(1) : '0.0'
                        },
                        {
                            parametro: 'Fosfato',
                            abreviacion: 'PO4',
                            unidad: '[mg/L]',
                            min: this.fosfato2Min.toFixed(6),
                            max: this.fosfato2Max.toFixed(6),
                            promedio: this.fosfato2Promedio.toFixed(6),
                            emisionContaminantes: (
                                (this.salidaAguaInfiltradaTotal * this.fosfato2Promedio) /
                                1000
                            ).toFixed(6),
                            porcentaje: totales.fosfatoTotal ?
                                (((this.salidaAguaInfiltradaTotal * this.fosfato2Promedio) / 1000) / totales.fosfatoTotal * 100).toFixed(1) : '0.0'
                        },
                        {
                            parametro: 'Demanda Química De Oxígeno',
                            abreviacion: 'DQO',
                            unidad: '[mg/L]',
                            min: this.dqo2Min.toFixed(6),
                            max: this.dqo2Max.toFixed(6),
                            promedio: this.dqo2Promedio.toFixed(6),
                            emisionContaminantes: (
                                (this.salidaAguaInfiltradaTotal * this.dqo2Promedio) /
                                1000
                            ).toFixed(6),
                            porcentaje: totales.demandaBioOxgTotal ?
                                (((this.salidaAguaInfiltradaTotal * this.dqo2Promedio) / 1000) / totales.demandaBioOxgTotal * 100).toFixed(1) : '0.0'
                        },
                        {
                            parametro: 'Demanda Biológica De Oxígeno',
                            abreviacion: 'DBO',
                            unidad: '[mg/L]',
                            min: this.dbo2Min.toFixed(6),
                            max: this.dbo2Max.toFixed(6),
                            promedio: this.dbo2Promedio.toFixed(6),
                            emisionContaminantes: (
                                (this.salidaAguaInfiltradaTotal * this.dbo2Promedio) /
                                1000
                            ).toFixed(6),
                            porcentaje: totales.demandaBioOxgTotal ?
                                (((this.salidaAguaInfiltradaTotal * this.dbo2Promedio) / 1000) / totales.demandaBioOxgTotal * 100).toFixed(1) : '0.0'
                        },
                        {
                            parametro: 'Arsénico',
                            abreviacion: 'As',
                            unidad: '[mg/L]',
                            min: this.arsenico2Min.toFixed(6),
                            max: this.arsenico2Max.toFixed(6),
                            promedio: this.arsenico2Promedio.toFixed(6),
                            emisionContaminantes: (
                                (this.salidaAguaInfiltradaTotal * this.arsenico2Promedio) /
                                1000
                            ).toFixed(6),
                            porcentaje: totales.arsenicoTotal ?
                                (((this.salidaAguaInfiltradaTotal * this.arsenico2Promedio) / 1000) / totales.arsenicoTotal * 100).toFixed(1) : '0.0'
                        },
                        {
                            parametro: 'Cadmio',
                            abreviacion: 'Cd',
                            unidad: '[mg/L]',
                            min: this.cadmio2Min.toFixed(6),
                            max: this.cadmio2Max.toFixed(6),
                            promedio: this.cadmio2Promedio.toFixed(6),
                            emisionContaminantes: (
                                (this.salidaAguaInfiltradaTotal * this.cadmio2Promedio) /
                                1000
                            ).toFixed(6),
                            porcentaje: totales.cadminioTotal ?
                                (((this.salidaAguaInfiltradaTotal * this.cadmio2Promedio) / 1000) / totales.cadminioTotal * 100).toFixed(1) : '0.0'
                        },
                        {
                            parametro: 'Cromo',
                            abreviacion: 'Cr',
                            unidad: '[mg/L]',
                            min: this.cromo2Min.toFixed(6),
                            max: this.cromo2Max.toFixed(6),
                            promedio: this.cromo2Promedio.toFixed(6),
                            emisionContaminantes: (
                                (this.salidaAguaInfiltradaTotal * this.cromo2Promedio) /
                                1000
                            ).toFixed(6),
                            porcentaje: totales.cromoTotal ?
                                (((this.salidaAguaInfiltradaTotal * this.cromo2Promedio) / 1000) / totales.cromoTotal * 100).toFixed(1) : '0.0'
                        },
                        {
                            parametro: 'Cobre',
                            abreviacion: 'Cu',
                            unidad: '[mg/L]',
                            min: this.cobre2Min.toFixed(6),
                            max: this.cobre2Max.toFixed(6),
                            promedio: this.cobre2Promedio.toFixed(6),
                            emisionContaminantes: (
                                (this.salidaAguaInfiltradaTotal * this.cobre2Promedio) /
                                1000
                            ).toFixed(6),
                            porcentaje: totales.cobreTotal ?
                                (((this.salidaAguaInfiltradaTotal * this.cobre2Promedio) / 1000) / totales.cobreTotal * 100).toFixed(1) : '0.0'
                        },
                        {
                            parametro: 'Mercurio',
                            abreviacion: 'Hg',
                            unidad: '[mg/L]',
                            min: this.mercurio2Min.toFixed(6),
                            max: this.mercurio2Max.toFixed(6),
                            promedio: this.mercurio2Promedio.toFixed(6),
                            emisionContaminantes: (
                                (this.salidaAguaInfiltradaTotal * this.mercurio2Promedio) /
                                1000
                            ).toFixed(6),
                            porcentaje: totales.mercurioTotal ?
                                (((this.salidaAguaInfiltradaTotal * this.mercurio2Promedio) / 1000) / totales.mercurioTotal * 100).toFixed(1) : '0.0'
                        },
                        {
                            parametro: 'Niquel',
                            abreviacion: 'Ni',
                            unidad: '[mg/L]',
                            min: this.niquel2Min.toFixed(6),
                            max: this.niquel2Max.toFixed(6),
                            promedio: this.niquel2Promedio.toFixed(6),
                            emisionContaminantes: (
                                (this.salidaAguaInfiltradaTotal * this.niquel2Promedio) /
                                1000
                            ).toFixed(6),
                            porcentaje: totales.niquelTotal ?
                                (((this.salidaAguaInfiltradaTotal * this.niquel2Promedio) / 1000) / totales.niquelTotal * 100).toFixed(1) : '0.0'
                        },
                        {
                            parametro: 'Plomo',
                            abreviacion: 'Pb',
                            unidad: '[mg/L]',
                            min: this.plomo2Min.toFixed(6),
                            max: this.plomo2Max.toFixed(6),
                            promedio: this.plomo2Promedio.toFixed(6),
                            emisionContaminantes: (
                                (this.salidaAguaInfiltradaTotal * this.plomo2Promedio) /
                                1000
                            ).toFixed(6),
                            porcentaje: totales.plomoTotal ?
                                (((this.salidaAguaInfiltradaTotal * this.plomo2Promedio) / 1000) / totales.plomoTotal * 100).toFixed(1) : '0.0'
                        },
                        {
                            parametro: 'Zinc',
                            abreviacion: 'Zn',
                            unidad: '[mg/L]',
                            min: this.zinc2Min.toFixed(6),
                            max: this.zinc2Max.toFixed(6),
                            promedio: this.zinc2Promedio.toFixed(6),
                            emisionContaminantes: (
                                (this.salidaAguaInfiltradaTotal * this.zinc2Promedio) /
                                1000
                            ).toFixed(6),
                            porcentaje: totales.zincTotal ?
                                (((this.salidaAguaInfiltradaTotal * this.zinc2Promedio) / 1000) / totales.zincTotal * 100).toFixed(1) : '0.0'
                        },
                        {
                            parametro: 'Pentaclorofenol',
                            abreviacion: 'C6OHCL5',
                            unidad: '[mg/L]',
                            min: this.pentaclorofenol2Min.toFixed(6),
                            max: this.pentaclorofenol2Max.toFixed(6),
                            promedio: this.pentaclorofenol2Promedio.toFixed(6),
                            emisionContaminantes: (
                                (this.salidaAguaInfiltradaTotal *
                                    this.pentaclorofenol2Promedio) /
                                1000
                            ).toFixed(6),
                            porcentaje: totales.pentaclorofenolTotal ?
                                (((this.salidaAguaInfiltradaTotal * this.pentaclorofenol2Promedio) / 1000) / totales.pentaclorofenolTotal * 100).toFixed(1) : '0.0'
                        },
                    ],
                },
                {
                    categoria: 'AGUA DULCE CONSUMIDA (HUELLA AZUL - WFN)',
                    proceso: this.salidaAguaConsumidaProceso,
                    total: this.salidaAguaConsumidaTotal.toFixed(6),
                    promedio: this.salidaAguaConsumidaPromedio.toFixed(6),
                    toxixidadHumana: 0,
                    ecotoxixidad: 0,
                    ecotoxixidadPorcentaje: 0,
                    eutrofizacion: 0,
                    eutrofizacionPorcentahe: 0,
                    enfermedadesPorToxicidad: 0,
                    enfermedadesPorToxicidadPorcentaje: 0,
                    ecosistemasAcuaticosAfectadosPorEcotoxicidad: 0,
                    ecosistemasAcuaticosAfectadosPorEcotoxicidadPorcentaje: 0,
                    ecosistemasAcuaticosAfectadosPorEutrofizacion: 0,
                    ecosistemasAcuaticosAfectadosPorEutrofizacionPorcentaje: 0,
                    availableWaterRemainingAware: (
                        this.salidaAguaConsumidaTotal * 80.095291
                    ).toFixed(6),
                    availableWaterRemainingAwarePorcentaje: ((this.salidaAguaConsumidaTotal * 80.095291) / totales.availableWaterRemainingAwareTotal * 100).toFixed(1),
                    potencialesImpactosSalud: (
                        this.salidaAguaConsumidaTotal * 0.000017256729214146
                    ).toFixed(6),
                    potencialesImpactosSaludPorcentaje: ((
                        this.salidaAguaConsumidaTotal * 0.000017256729214146
                    ) / totales.potencialesImpactosSaludTotal * 100).toFixed(1),
                    disminucionBiodiversidadTerrestre: (
                        this.salidaAguaConsumidaTotal * 0.266051
                    ).toFixed(6),
                    disminucionBiodiversidadTerrestreTotal: ((
                        this.salidaAguaConsumidaTotal * 0.266051
                    ) / totales.disminucionBiodiversidadTerrestreTotal * 100).toFixed(1),
                    porcentaje: this.salidaAguaConsumidaTotal / this.salidaAguaConsumidaTotal * 100,

                    calidad: [
                        {
                            parametro: 'Nitrógeno Total',
                            abreviacion: 'N',
                            unidad: '[mg/L]',
                            min: this.nitrogeno3Min.toFixed(6),
                            max: this.nitrogeno3Max.toFixed(6),
                            promedio: this.nitrogeno3Promedio.toFixed(6),
                            emisionContaminantes: '',
                            porcentaje: 0
                        },
                        {
                            parametro: 'Nitrógeno Total Kjeldahl',
                            abreviacion: 'NTK',
                            unidad: '[mg/L]',
                            min: this.nitrogenoKjeldahl3Min.toFixed(6),
                            max: this.nitrogenoKjeldahl3Max.toFixed(6),
                            promedio: this.nitrogenoKjeldahl3Promedio.toFixed(6),
                            emisionContaminantes: '',
                            porcentaje: 0
                        },
                        {
                            parametro: 'Fósforo Total',
                            abreviacion: 'P',
                            unidad: '[mg/L]',
                            min: this.fosforoTotal3Min.toFixed(6),
                            max: this.fosforoTotal3Max.toFixed(6),
                            promedio: this.fosforoTotal3Promedio.toFixed(6),
                            emisionContaminantes: '',
                            porcentaje: 0
                        },
                        {
                            parametro: 'Fosfato',
                            abreviacion: 'PO4',
                            unidad: '[mg/L]',
                            min: this.fosfato3Min.toFixed(6),
                            max: this.fosfato3Max.toFixed(6),
                            promedio: this.fosfato3Promedio.toFixed(6),
                            emisionContaminantes: '',
                            porcentaje: 0
                        },
                        {
                            parametro: 'Demanda Química De Oxígeno',
                            abreviacion: 'DQO',
                            unidad: '[mg/L]',
                            min: this.dqo3Min.toFixed(6),
                            max: this.dqo3Max.toFixed(6),
                            promedio: this.dqo3Promedio.toFixed(6),
                            emisionContaminantes: '',
                            porcentaje: 0
                        },
                        {
                            parametro: 'Demanda Biológica De Oxígeno',
                            abreviacion: 'DBO',
                            unidad: '[mg/L]',
                            min: this.dbo3Min.toFixed(6),
                            max: this.dbo3Max.toFixed(6),
                            promedio: this.dbo3Promedio.toFixed(6),
                            emisionContaminantes: '',
                            porcentaje: 0
                        },
                        {
                            parametro: 'Arsénico',
                            abreviacion: 'As',
                            unidad: '[mg/L]',
                            min: this.arsenico3Min.toFixed(6),
                            max: this.arsenico3Max.toFixed(6),
                            promedio: this.arsenico3Promedio.toFixed(6),
                            emisionContaminantes: '',
                            porcentaje: 0
                        },
                        {
                            parametro: 'Cadmio',
                            abreviacion: 'Cd',
                            unidad: '[mg/L]',
                            min: this.cadmio3Min.toFixed(6),
                            max: this.cadmio3Max.toFixed(6),
                            promedio: this.cadmio3Promedio.toFixed(6),
                            emisionContaminantes: '',
                            porcentaje: 0
                        },
                        {
                            parametro: 'Cromo',
                            abreviacion: 'Cr',
                            unidad: '[mg/L]',
                            min: this.cromo3Min.toFixed(6),
                            max: this.cromo3Max.toFixed(6),
                            promedio: this.cromo3Promedio.toFixed(6),
                            emisionContaminantes: '',
                            porcentaje: 0
                        },
                        {
                            parametro: 'Cobre',
                            abreviacion: 'Cu',
                            unidad: '[mg/L]',
                            min: this.cobre3Min.toFixed(6),
                            max: this.cobre3Max.toFixed(6),
                            promedio: this.cobre3Promedio.toFixed(6),
                            emisionContaminantes: '',
                            porcentaje: 0
                        },
                        {
                            parametro: 'Mercurio',
                            abreviacion: 'Hg',
                            unidad: '[mg/L]',
                            min: this.mercurio3Min.toFixed(6),
                            max: this.mercurio3Max.toFixed(6),
                            promedio: this.mercurio3Promedio.toFixed(6),
                            emisionContaminantes: '',
                            porcentaje: 0
                        },
                        {
                            parametro: 'Niquel',
                            abreviacion: 'Ni',
                            unidad: '[mg/L]',
                            min: this.niquel3Min.toFixed(6),
                            max: this.niquel3Max.toFixed(6),
                            promedio: this.niquel3Promedio.toFixed(6),
                            emisionContaminantes: '',
                            porcentaje: 0
                        },
                        {
                            parametro: 'Plomo',
                            abreviacion: 'Pb',
                            unidad: '[mg/L]',
                            min: this.plomo3Min.toFixed(6),
                            max: this.plomo3Max.toFixed(6),
                            promedio: this.plomo3Promedio.toFixed(6),
                            emisionContaminantes: '',
                            porcentaje: 0
                        },
                        {
                            parametro: 'Zinc',
                            abreviacion: 'Zn',
                            unidad: '[mg/L]',
                            min: this.zinc3Min.toFixed(6),
                            max: this.zinc3Max.toFixed(6),
                            promedio: this.zinc3Promedio.toFixed(6),
                            emisionContaminantes: '',
                            porcentaje: 0
                        },
                        {
                            parametro: 'Pentaclorofenol',
                            abreviacion: 'C6OHCL5',
                            unidad: '[mg/L]',
                            min: this.pentaclorofenol3Min.toFixed(6),
                            max: this.pentaclorofenol3Max.toFixed(6),
                            promedio: this.pentaclorofenol3Promedio.toFixed(6),
                            emisionContaminantes: '',
                            porcentaje: 0
                        }
                    ],

                },
            ],
            totales,
            totalesPorcentaje
        };

        this.router.navigate(['/resumen'], { state: { data: dataLista } });
    }

    calcularTotalesProduccion() {
        this.produccionTotal =
            this.enero +
            this.febrero +
            this.marzo +
            this.abril +
            this.mayo +
            this.junio +
            this.julio +
            this.agosto +
            this.septiembre +
            this.octubre +
            this.noviembre +
            this.diciembre;
        this.produccionPromedio = this.produccionTotal / 12;
    }

    calculaEntradaAguaPotable() {
        this.aguaPotableMensualTotal =
            this.aguaPotableMensualEnero +
            this.aguaPotableMensualFebrero +
            this.aguaPotableMensualMarzo +
            this.aguaPotableMensualAbril +
            this.aguaPotableMensualMayo +
            this.aguaPotableMensualJunio +
            this.aguaPotableMensualJulio +
            this.aguaPotableMensualAgosto +
            this.aguaPotableMensualSeptiembre +
            this.aguaPotableMensualOctubre +
            this.aguaPotableMensualNoviembre +
            this.aguaPotableMensualDiciembre;
        this.aguaPotableMensualPromedio = this.aguaPotableMensualTotal / 12;
    }
    calculaEntradaAguaPozo() {
        this.aguaPozoTotal =
            this.aguaPozoEnero +
            this.aguaPozoFebrero +
            this.aguaPozoMarzo +
            this.aguaPozoAbril +
            this.aguaPozoMayo +
            this.aguaPozoJunio +
            this.aguaPozoJulio +
            this.aguaPozoAgosto +
            this.aguaPozoSeptiembre +
            this.aguaPozoOctubre +
            this.aguaPozoNoviembre +
            this.aguaPozoDiciembre;
        this.aguaPozoPromedio = this.aguaPozoTotal / 12;
    }
    calculaEntradaAguaDulce() {
        this.aguaSuperficialTotal =
            this.aguaSuperficialEnero +
            this.aguaSuperficialFebrero +
            this.aguaSuperficialMarzo +
            this.aguaSuperficialAbril +
            this.aguaSuperficialMayo +
            this.aguaSuperficialJunio +
            this.aguaSuperficialJulio +
            this.aguaSuperficialAgosto +
            this.aguaSuperficialSeptiembre +
            this.aguaSuperficialOctubre +
            this.aguaSuperficialNoviembre +
            this.aguaSuperficialDiciembre;
        this.aguaSuperficialPromedio = this.aguaSuperficialTotal / 12;
    }

    calculaSalidaAguaDescargada() {
        this.salidaAguaDescargadaTotal =
            this.salidaAguaDescargadaEnero +
            this.salidaAguaDescargadaFebrero +
            this.salidaAguaDescargadaMarzo +
            this.salidaAguaDescargadaAbril +
            this.salidaAguaDescargadaMayo +
            this.salidaAguaDescargadaJunio +
            this.salidaAguaDescargadaJulio +
            this.salidaAguaDescargadaAgosto +
            this.salidaAguaDescargadaSeptiembre +
            this.salidaAguaDescargadaOctubre +
            this.salidaAguaDescargadaNoviembre +
            this.salidaAguaDescargadaDiciembre;
        this.salidaAguaDescargadaPromedio = this.salidaAguaDescargadaTotal / 12;
    }
    calculaSalidaAguaInfiltrada() {
        this.salidaAguaInfiltradaTotal =
            this.salidaAguaInfiltradaEnero +
            this.salidaAguaInfiltradaFebrero +
            this.salidaAguaInfiltradaMarzo +
            this.salidaAguaInfiltradaAbril +
            this.salidaAguaInfiltradaMayo +
            this.salidaAguaInfiltradaJunio +
            this.salidaAguaInfiltradaJulio +
            this.salidaAguaInfiltradaAgosto +
            this.salidaAguaInfiltradaSeptiembre +
            this.salidaAguaInfiltradaOctubre +
            this.salidaAguaInfiltradaNoviembre +
            this.salidaAguaInfiltradaDiciembre;
        this.salidaAguaInfiltradaPromedio = this.salidaAguaInfiltradaTotal / 12;
    }
    calculaSalidaAguaConsumida() {
        this.salidaAguaConsumidaTotal =
            this.salidaAguaConsumidaEnero +
            this.salidaAguaConsumidaFebrero +
            this.salidaAguaConsumidaMarzo +
            this.salidaAguaConsumidaAbril +
            this.salidaAguaConsumidaMayo +
            this.salidaAguaConsumidaJunio +
            this.salidaAguaConsumidaJulio +
            this.salidaAguaConsumidaAgosto +
            this.salidaAguaConsumidaSeptiembre +
            this.salidaAguaConsumidaOctubre +
            this.salidaAguaConsumidaNoviembre +
            this.salidaAguaConsumidaDiciembre;
        this.salidaAguaConsumidaPromedio = this.salidaAguaConsumidaTotal / 12;
    }

    calculaNitrogeno1() {
        this.nitrogeno1Min = Math.min(
            this.nitrogenoEnero1,
            this.nitrogenoFebrero1,
            this.nitrogenoMarzo1,
            this.nitrogenoAbril1,
            this.nitrogenoMayo1,
            this.nitrogenoJunio1,
            this.nitrogenoJulio1,
            this.nitrogenoAgosto1,
            this.nitrogenoSeptiembre1,
            this.nitrogenoOctubre1,
            this.nitrogenoNoviembre1,
            this.nitrogenoDiciembre1
        );
        this.nitrogeno1Max = Math.max(
            this.nitrogenoEnero1,
            this.nitrogenoFebrero1,
            this.nitrogenoMarzo1,
            this.nitrogenoAbril1,
            this.nitrogenoMayo1,
            this.nitrogenoJunio1,
            this.nitrogenoJulio1,
            this.nitrogenoAgosto1,
            this.nitrogenoSeptiembre1,
            this.nitrogenoOctubre1,
            this.nitrogenoNoviembre1,
            this.nitrogenoDiciembre1
        );
        let suma =
            this.nitrogenoEnero1 +
            this.nitrogenoFebrero1 +
            this.nitrogenoMarzo1 +
            this.nitrogenoAbril1 +
            this.nitrogenoMayo1 +
            this.nitrogenoJunio1 +
            this.nitrogenoJulio1 +
            this.nitrogenoAgosto1 +
            this.nitrogenoSeptiembre1 +
            this.nitrogenoOctubre1 +
            this.nitrogenoNoviembre1 +
            this.nitrogenoDiciembre1;
        this.nitrogeno1Promedio = suma / 12;
    }
    calculaNitrogeno2() {
        this.nitrogeno2Min = Math.min(
            this.nitrogenoEnero2,
            this.nitrogenoFebrero2,
            this.nitrogenoMarzo2,
            this.nitrogenoAbril2,
            this.nitrogenoMayo2,
            this.nitrogenoJunio2,
            this.nitrogenoJulio2,
            this.nitrogenoAgosto2,
            this.nitrogenoSeptiembre2,
            this.nitrogenoOctubre2,
            this.nitrogenoNoviembre2,
            this.nitrogenoDiciembre2
        );
        this.nitrogeno2Max = Math.max(
            this.nitrogenoEnero2,
            this.nitrogenoFebrero2,
            this.nitrogenoMarzo2,
            this.nitrogenoAbril2,
            this.nitrogenoMayo2,
            this.nitrogenoJunio2,
            this.nitrogenoJulio2,
            this.nitrogenoAgosto2,
            this.nitrogenoSeptiembre2,
            this.nitrogenoOctubre2,
            this.nitrogenoNoviembre2,
            this.nitrogenoDiciembre2
        );
        let suma =
            this.nitrogenoEnero2 +
            this.nitrogenoFebrero2 +
            this.nitrogenoMarzo2 +
            this.nitrogenoAbril2 +
            this.nitrogenoMayo2 +
            this.nitrogenoJunio2 +
            this.nitrogenoJulio2 +
            this.nitrogenoAgosto2 +
            this.nitrogenoSeptiembre2 +
            this.nitrogenoOctubre2 +
            this.nitrogenoNoviembre2 +
            this.nitrogenoDiciembre2;
        this.nitrogeno2Promedio = suma / 12;
    }
    calculaNitrogeno3() {
        this.nitrogeno3Min = Math.min(
            this.nitrogenoEnero3,
            this.nitrogenoFebrero3,
            this.nitrogenoMarzo3,
            this.nitrogenoAbril3,
            this.nitrogenoMayo3,
            this.nitrogenoJunio3,
            this.nitrogenoJulio3,
            this.nitrogenoAgosto3,
            this.nitrogenoSeptiembre3,
            this.nitrogenoOctubre3,
            this.nitrogenoNoviembre3,
            this.nitrogenoDiciembre3
        );
        this.nitrogeno3Max = Math.max(
            this.nitrogenoEnero3,
            this.nitrogenoFebrero3,
            this.nitrogenoMarzo3,
            this.nitrogenoAbril3,
            this.nitrogenoMayo3,
            this.nitrogenoJunio3,
            this.nitrogenoJulio3,
            this.nitrogenoAgosto3,
            this.nitrogenoSeptiembre3,
            this.nitrogenoOctubre3,
            this.nitrogenoNoviembre3,
            this.nitrogenoDiciembre3
        );
        let suma =
            this.nitrogenoEnero3 +
            this.nitrogenoFebrero3 +
            this.nitrogenoMarzo3 +
            this.nitrogenoAbril3 +
            this.nitrogenoMayo3 +
            this.nitrogenoJunio3 +
            this.nitrogenoJulio3 +
            this.nitrogenoAgosto3 +
            this.nitrogenoSeptiembre3 +
            this.nitrogenoOctubre3 +
            this.nitrogenoNoviembre3 +
            this.nitrogenoDiciembre3;
        this.nitrogeno3Promedio = suma / 12;
    }
    calculaNitrogenoKjeldahl1() {
        this.nitrogenoKjeldahl1Min = Math.min(
            this.nitrogenoKjeldahlEnero1,
            this.nitrogenoKjeldahlFebrero1,
            this.nitrogenoKjeldahlMarzo1,
            this.nitrogenoKjeldahlAbril1,
            this.nitrogenoKjeldahlMayo1,
            this.nitrogenoKjeldahlJunio1,
            this.nitrogenoKjeldahlJulio1,
            this.nitrogenoKjeldahlAgosto1,
            this.nitrogenoKjeldahlSeptiembre1,
            this.nitrogenoKjeldahlOctubre1,
            this.nitrogenoKjeldahlNoviembre1,
            this.nitrogenoKjeldahlDiciembre1
        );
        this.nitrogenoKjeldahl1Max = Math.max(
            this.nitrogenoKjeldahlEnero1,
            this.nitrogenoKjeldahlFebrero1,
            this.nitrogenoKjeldahlMarzo1,
            this.nitrogenoKjeldahlAbril1,
            this.nitrogenoKjeldahlMayo1,
            this.nitrogenoKjeldahlJunio1,
            this.nitrogenoKjeldahlJulio1,
            this.nitrogenoKjeldahlAgosto1,
            this.nitrogenoKjeldahlSeptiembre1,
            this.nitrogenoKjeldahlOctubre1,
            this.nitrogenoKjeldahlNoviembre1,
            this.nitrogenoKjeldahlDiciembre1
        );
        let suma =
            this.nitrogenoKjeldahlEnero1 +
            this.nitrogenoKjeldahlFebrero1 +
            this.nitrogenoKjeldahlMarzo1 +
            this.nitrogenoKjeldahlAbril1 +
            this.nitrogenoKjeldahlMayo1 +
            this.nitrogenoKjeldahlJunio1 +
            this.nitrogenoKjeldahlJulio1 +
            this.nitrogenoKjeldahlAgosto1 +
            this.nitrogenoKjeldahlSeptiembre1 +
            this.nitrogenoKjeldahlOctubre1 +
            this.nitrogenoKjeldahlNoviembre1 +
            this.nitrogenoKjeldahlDiciembre1;
        this.nitrogenoKjeldahl1Promedio = suma / 12;
    }
    calculaNitrogenoKjeldahl2() {
        this.nitrogenoKjeldahl2Min = Math.min(
            this.nitrogenoKjeldahlEnero2,
            this.nitrogenoKjeldahlFebrero2,
            this.nitrogenoKjeldahlMarzo2,
            this.nitrogenoKjeldahlAbril2,
            this.nitrogenoKjeldahlMayo2,
            this.nitrogenoKjeldahlJunio2,
            this.nitrogenoKjeldahlJulio2,
            this.nitrogenoKjeldahlAgosto2,
            this.nitrogenoKjeldahlSeptiembre2,
            this.nitrogenoKjeldahlOctubre2,
            this.nitrogenoKjeldahlNoviembre2,
            this.nitrogenoKjeldahlDiciembre2
        );
        this.nitrogenoKjeldahl2Max = Math.max(
            this.nitrogenoKjeldahlEnero2,
            this.nitrogenoKjeldahlFebrero2,
            this.nitrogenoKjeldahlMarzo2,
            this.nitrogenoKjeldahlAbril2,
            this.nitrogenoKjeldahlMayo2,
            this.nitrogenoKjeldahlJunio2,
            this.nitrogenoKjeldahlJulio2,
            this.nitrogenoKjeldahlAgosto2,
            this.nitrogenoKjeldahlSeptiembre2,
            this.nitrogenoKjeldahlOctubre2,
            this.nitrogenoKjeldahlNoviembre2,
            this.nitrogenoKjeldahlDiciembre2
        );
        let suma =
            this.nitrogenoKjeldahlEnero2 +
            this.nitrogenoKjeldahlFebrero2 +
            this.nitrogenoKjeldahlMarzo2 +
            this.nitrogenoKjeldahlAbril2 +
            this.nitrogenoKjeldahlMayo2 +
            this.nitrogenoKjeldahlJunio2 +
            this.nitrogenoKjeldahlJulio2 +
            this.nitrogenoKjeldahlAgosto2 +
            this.nitrogenoKjeldahlSeptiembre2 +
            this.nitrogenoKjeldahlOctubre2 +
            this.nitrogenoKjeldahlNoviembre2 +
            this.nitrogenoKjeldahlDiciembre2;
        this.nitrogenoKjeldahl2Promedio = suma / 12;
    }
    calculaNitrogenoKjeldahl3() {
        this.nitrogenoKjeldahl3Min = Math.min(
            this.nitrogenoKjeldahlEnero3,
            this.nitrogenoKjeldahlFebrero3,
            this.nitrogenoKjeldahlMarzo3,
            this.nitrogenoKjeldahlAbril3,
            this.nitrogenoKjeldahlMayo3,
            this.nitrogenoKjeldahlJunio3,
            this.nitrogenoKjeldahlJulio3,
            this.nitrogenoKjeldahlAgosto3,
            this.nitrogenoKjeldahlSeptiembre3,
            this.nitrogenoKjeldahlOctubre3,
            this.nitrogenoKjeldahlNoviembre3,
            this.nitrogenoKjeldahlDiciembre3
        );
        this.nitrogenoKjeldahl3Max = Math.max(
            this.nitrogenoKjeldahlEnero3,
            this.nitrogenoKjeldahlFebrero3,
            this.nitrogenoKjeldahlMarzo3,
            this.nitrogenoKjeldahlAbril3,
            this.nitrogenoKjeldahlMayo3,
            this.nitrogenoKjeldahlJunio3,
            this.nitrogenoKjeldahlJulio3,
            this.nitrogenoKjeldahlAgosto3,
            this.nitrogenoKjeldahlSeptiembre3,
            this.nitrogenoKjeldahlOctubre3,
            this.nitrogenoKjeldahlNoviembre3,
            this.nitrogenoKjeldahlDiciembre3
        );
        let suma =
            this.nitrogenoKjeldahlEnero3 +
            this.nitrogenoKjeldahlFebrero3 +
            this.nitrogenoKjeldahlMarzo3 +
            this.nitrogenoKjeldahlAbril3 +
            this.nitrogenoKjeldahlMayo3 +
            this.nitrogenoKjeldahlJunio3 +
            this.nitrogenoKjeldahlJulio3 +
            this.nitrogenoKjeldahlAgosto3 +
            this.nitrogenoKjeldahlSeptiembre3 +
            this.nitrogenoKjeldahlOctubre3 +
            this.nitrogenoKjeldahlNoviembre3 +
            this.nitrogenoKjeldahlDiciembre3;
        this.nitrogenoKjeldahl3Promedio = suma / 12;
    }
    calculaFosforoTotal1() {
        this.fosforoTotal1Min = Math.min(
            this.fosforoTotalEnero1,
            this.fosforoTotalFebrero1,
            this.fosforoTotalMarzo1,
            this.fosforoTotalAbril1,
            this.fosforoTotalMayo1,
            this.fosforoTotalJunio1,
            this.fosforoTotalJulio1,
            this.fosforoTotalAgosto1,
            this.fosforoTotalSeptiembre1,
            this.fosforoTotalOctubre1,
            this.fosforoTotalNoviembre1,
            this.fosforoTotalDiciembre1
        );
        this.fosforoTotal1Max = Math.max(
            this.fosforoTotalEnero1,
            this.fosforoTotalFebrero1,
            this.fosforoTotalMarzo1,
            this.fosforoTotalAbril1,
            this.fosforoTotalMayo1,
            this.fosforoTotalJunio1,
            this.fosforoTotalJulio1,
            this.fosforoTotalAgosto1,
            this.fosforoTotalSeptiembre1,
            this.fosforoTotalOctubre1,
            this.fosforoTotalNoviembre1,
            this.fosforoTotalDiciembre1
        );
        let suma =
            this.fosforoTotalEnero1 +
            this.fosforoTotalFebrero1 +
            this.fosforoTotalMarzo1 +
            this.fosforoTotalAbril1 +
            this.fosforoTotalMayo1 +
            this.fosforoTotalJunio1 +
            this.fosforoTotalJulio1 +
            this.fosforoTotalAgosto1 +
            this.fosforoTotalSeptiembre1 +
            this.fosforoTotalOctubre1 +
            this.fosforoTotalNoviembre1 +
            this.fosforoTotalDiciembre1;
        this.fosforoTotal1Promedio = suma / 12;
    }
    calculaFosforoTotal2() {
        this.fosforoTotal2Min = Math.min(
            this.fosforoTotalEnero2,
            this.fosforoTotalFebrero2,
            this.fosforoTotalMarzo2,
            this.fosforoTotalAbril2,
            this.fosforoTotalMayo2,
            this.fosforoTotalJunio2,
            this.fosforoTotalJulio2,
            this.fosforoTotalAgosto2,
            this.fosforoTotalSeptiembre2,
            this.fosforoTotalOctubre2,
            this.fosforoTotalNoviembre2,
            this.fosforoTotalDiciembre2
        );
        this.fosforoTotal2Max = Math.max(
            this.fosforoTotalEnero2,
            this.fosforoTotalFebrero2,
            this.fosforoTotalMarzo2,
            this.fosforoTotalAbril2,
            this.fosforoTotalMayo2,
            this.fosforoTotalJunio2,
            this.fosforoTotalJulio2,
            this.fosforoTotalAgosto2,
            this.fosforoTotalSeptiembre2,
            this.fosforoTotalOctubre2,
            this.fosforoTotalNoviembre2,
            this.fosforoTotalDiciembre2
        );
        let suma =
            this.fosforoTotalEnero2 +
            this.fosforoTotalFebrero2 +
            this.fosforoTotalMarzo2 +
            this.fosforoTotalAbril2 +
            this.fosforoTotalMayo2 +
            this.fosforoTotalJunio2 +
            this.fosforoTotalJulio2 +
            this.fosforoTotalAgosto2 +
            this.fosforoTotalSeptiembre2 +
            this.fosforoTotalOctubre2 +
            this.fosforoTotalNoviembre2 +
            this.fosforoTotalDiciembre2;
        this.fosforoTotal2Promedio = suma / 12;
    }
    calculaFosforoTotal3() {
        this.fosforoTotal3Min = Math.min(
            this.fosforoTotalEnero3,
            this.fosforoTotalFebrero3,
            this.fosforoTotalMarzo3,
            this.fosforoTotalAbril3,
            this.fosforoTotalMayo3,
            this.fosforoTotalJunio3,
            this.fosforoTotalJulio3,
            this.fosforoTotalAgosto3,
            this.fosforoTotalSeptiembre3,
            this.fosforoTotalOctubre3,
            this.fosforoTotalNoviembre3,
            this.fosforoTotalDiciembre3
        );
        this.fosforoTotal3Max = Math.max(
            this.fosforoTotalEnero3,
            this.fosforoTotalFebrero3,
            this.fosforoTotalMarzo3,
            this.fosforoTotalAbril3,
            this.fosforoTotalMayo3,
            this.fosforoTotalJunio3,
            this.fosforoTotalJulio3,
            this.fosforoTotalAgosto3,
            this.fosforoTotalSeptiembre3,
            this.fosforoTotalOctubre3,
            this.fosforoTotalNoviembre3,
            this.fosforoTotalDiciembre3
        );
        let suma =
            this.fosforoTotalEnero3 +
            this.fosforoTotalFebrero3 +
            this.fosforoTotalMarzo3 +
            this.fosforoTotalAbril3 +
            this.fosforoTotalMayo3 +
            this.fosforoTotalJunio3 +
            this.fosforoTotalJulio3 +
            this.fosforoTotalAgosto3 +
            this.fosforoTotalSeptiembre3 +
            this.fosforoTotalOctubre3 +
            this.fosforoTotalNoviembre3 +
            this.fosforoTotalDiciembre3;
        this.fosforoTotal3Promedio = suma / 12;
    }
    calculaFosfato1() {
        this.fosfato1Min = Math.min(
            this.fosfatoEnero1,
            this.fosfatoFebrero1,
            this.fosfatoMarzo1,
            this.fosfatoAbril1,
            this.fosfatoMayo1,
            this.fosfatoJunio1,
            this.fosfatoJulio1,
            this.fosfatoAgosto1,
            this.fosfatoSeptiembre1,
            this.fosfatoOctubre1,
            this.fosfatoNoviembre1,
            this.fosfatoDiciembre1
        );
        this.fosfato1Max = Math.max(
            this.fosfatoEnero1,
            this.fosfatoFebrero1,
            this.fosfatoMarzo1,
            this.fosfatoAbril1,
            this.fosfatoMayo1,
            this.fosfatoJunio1,
            this.fosfatoJulio1,
            this.fosfatoAgosto1,
            this.fosfatoSeptiembre1,
            this.fosfatoOctubre1,
            this.fosfatoNoviembre1,
            this.fosfatoDiciembre1
        );
        let suma =
            this.fosfatoEnero1 +
            this.fosfatoFebrero1 +
            this.fosfatoMarzo1 +
            this.fosfatoAbril1 +
            this.fosfatoMayo1 +
            this.fosfatoJunio1 +
            this.fosfatoJulio1 +
            this.fosfatoAgosto1 +
            this.fosfatoSeptiembre1 +
            this.fosfatoOctubre1 +
            this.fosfatoNoviembre1 +
            this.fosfatoDiciembre1;
        this.fosfato1Promedio = suma / 12;
    }
    calculaFosfato2() {
        this.fosfato2Min = Math.min(
            this.fosfatoEnero2,
            this.fosfatoFebrero2,
            this.fosfatoMarzo2,
            this.fosfatoAbril2,
            this.fosfatoMayo2,
            this.fosfatoJunio2,
            this.fosfatoJulio2,
            this.fosfatoAgosto2,
            this.fosfatoSeptiembre2,
            this.fosfatoOctubre2,
            this.fosfatoNoviembre2,
            this.fosfatoDiciembre2
        );
        this.fosfato2Max = Math.max(
            this.fosfatoEnero2,
            this.fosfatoFebrero2,
            this.fosfatoMarzo2,
            this.fosfatoAbril2,
            this.fosfatoMayo2,
            this.fosfatoJunio2,
            this.fosfatoJulio2,
            this.fosfatoAgosto2,
            this.fosfatoSeptiembre2,
            this.fosfatoOctubre2,
            this.fosfatoNoviembre2,
            this.fosfatoDiciembre2
        );
        let suma =
            this.fosfatoEnero2 +
            this.fosfatoFebrero2 +
            this.fosfatoMarzo2 +
            this.fosfatoAbril2 +
            this.fosfatoMayo2 +
            this.fosfatoJunio2 +
            this.fosfatoJulio2 +
            this.fosfatoAgosto2 +
            this.fosfatoSeptiembre2 +
            this.fosfatoOctubre2 +
            this.fosfatoNoviembre2 +
            this.fosfatoDiciembre2;
        this.fosfato2Promedio = suma / 12;
    }
    calculaFosfato3() {
        this.fosfato3Min = Math.min(
            this.fosfatoEnero3,
            this.fosfatoFebrero3,
            this.fosfatoMarzo3,
            this.fosfatoAbril3,
            this.fosfatoMayo3,
            this.fosfatoJunio3,
            this.fosfatoJulio3,
            this.fosfatoAgosto3,
            this.fosfatoSeptiembre3,
            this.fosfatoOctubre3,
            this.fosfatoNoviembre3,
            this.fosfatoDiciembre3
        );
        this.fosfato3Max = Math.max(
            this.fosfatoEnero3,
            this.fosfatoFebrero3,
            this.fosfatoMarzo3,
            this.fosfatoAbril3,
            this.fosfatoMayo3,
            this.fosfatoJunio3,
            this.fosfatoJulio3,
            this.fosfatoAgosto3,
            this.fosfatoSeptiembre3,
            this.fosfatoOctubre3,
            this.fosfatoNoviembre3,
            this.fosfatoDiciembre3
        );
        let suma =
            this.fosfatoEnero3 +
            this.fosfatoFebrero3 +
            this.fosfatoMarzo3 +
            this.fosfatoAbril3 +
            this.fosfatoMayo3 +
            this.fosfatoJunio3 +
            this.fosfatoJulio3 +
            this.fosfatoAgosto3 +
            this.fosfatoSeptiembre3 +
            this.fosfatoOctubre3 +
            this.fosfatoNoviembre3 +
            this.fosfatoDiciembre3;
        this.fosfato3Promedio = suma / 12;
    }
    calculaDqo1() {
        this.dqo1Min = Math.min(
            this.dqoEnero1,
            this.dqoFebrero1,
            this.dqoMarzo1,
            this.dqoAbril1,
            this.dqoMayo1,
            this.dqoJunio1,
            this.dqoJulio1,
            this.dqoAgosto1,
            this.dqoSeptiembre1,
            this.dqoOctubre1,
            this.dqoNoviembre1,
            this.dqoDiciembre1
        );
        this.dqo1Max = Math.max(
            this.dqoEnero1,
            this.dqoFebrero1,
            this.dqoMarzo1,
            this.dqoAbril1,
            this.dqoMayo1,
            this.dqoJunio1,
            this.dqoJulio1,
            this.dqoAgosto1,
            this.dqoSeptiembre1,
            this.dqoOctubre1,
            this.dqoNoviembre1,
            this.dqoDiciembre1
        );
        let suma =
            this.dqoEnero1 +
            this.dqoFebrero1 +
            this.dqoMarzo1 +
            this.dqoAbril1 +
            this.dqoMayo1 +
            this.dqoJunio1 +
            this.dqoJulio1 +
            this.dqoAgosto1 +
            this.dqoSeptiembre1 +
            this.dqoOctubre1 +
            this.dqoNoviembre1 +
            this.dqoDiciembre1;
        this.dqo1Promedio = suma / 12;
    }
    calculaDqo2() {
        this.dqo2Min = Math.min(
            this.dqoEnero2,
            this.dqoFebrero2,
            this.dqoMarzo2,
            this.dqoAbril2,
            this.dqoMayo2,
            this.dqoJunio2,
            this.dqoJulio2,
            this.dqoAgosto2,
            this.dqoSeptiembre2,
            this.dqoOctubre2,
            this.dqoNoviembre2,
            this.dqoDiciembre2
        );
        this.dqo2Max = Math.max(
            this.dqoEnero2,
            this.dqoFebrero2,
            this.dqoMarzo2,
            this.dqoAbril2,
            this.dqoMayo2,
            this.dqoJunio2,
            this.dqoJulio2,
            this.dqoAgosto2,
            this.dqoSeptiembre2,
            this.dqoOctubre2,
            this.dqoNoviembre2,
            this.dqoDiciembre2
        );
        let suma =
            this.dqoEnero2 +
            this.dqoFebrero2 +
            this.dqoMarzo2 +
            this.dqoAbril2 +
            this.dqoMayo2 +
            this.dqoJunio2 +
            this.dqoJulio2 +
            this.dqoAgosto2 +
            this.dqoSeptiembre2 +
            this.dqoOctubre2 +
            this.dqoNoviembre2 +
            this.dqoDiciembre2;
        this.dqo2Promedio = suma / 12;
    }
    calculaDqo3() {
        this.dqo3Min = Math.min(
            this.dqoEnero3,
            this.dqoFebrero3,
            this.dqoMarzo3,
            this.dqoAbril3,
            this.dqoMayo3,
            this.dqoJunio3,
            this.dqoJulio3,
            this.dqoAgosto3,
            this.dqoSeptiembre3,
            this.dqoOctubre3,
            this.dqoNoviembre3,
            this.dqoDiciembre3
        );
        this.dqo3Max = Math.max(
            this.dqoEnero3,
            this.dqoFebrero3,
            this.dqoMarzo3,
            this.dqoAbril3,
            this.dqoMayo3,
            this.dqoJunio3,
            this.dqoJulio3,
            this.dqoAgosto3,
            this.dqoSeptiembre3,
            this.dqoOctubre3,
            this.dqoNoviembre3,
            this.dqoDiciembre3
        );
        let suma =
            this.dqoEnero3 +
            this.dqoFebrero3 +
            this.dqoMarzo3 +
            this.dqoAbril3 +
            this.dqoMayo3 +
            this.dqoJunio3 +
            this.dqoJulio3 +
            this.dqoAgosto3 +
            this.dqoSeptiembre3 +
            this.dqoOctubre3 +
            this.dqoNoviembre3 +
            this.dqoDiciembre3;
        this.dqo3Promedio = suma / 12;
    }
    calculaDbo1() {
        this.dbo1Min = Math.min(
            this.dboEnero1,
            this.dboFebrero1,
            this.dboMarzo1,
            this.dboAbril1,
            this.dboMayo1,
            this.dboJunio1,
            this.dboJulio1,
            this.dboAgosto1,
            this.dboSeptiembre1,
            this.dboOctubre1,
            this.dboNoviembre1,
            this.dboDiciembre1
        );
        this.dbo1Max = Math.max(
            this.dboEnero1,
            this.dboFebrero1,
            this.dboMarzo1,
            this.dboAbril1,
            this.dboMayo1,
            this.dboJunio1,
            this.dboJulio1,
            this.dboAgosto1,
            this.dboSeptiembre1,
            this.dboOctubre1,
            this.dboNoviembre1,
            this.dboDiciembre1
        );
        let suma =
            this.dboEnero1 +
            this.dboFebrero1 +
            this.dboMarzo1 +
            this.dboAbril1 +
            this.dboMayo1 +
            this.dboJunio1 +
            this.dboJulio1 +
            this.dboAgosto1 +
            this.dboSeptiembre1 +
            this.dboOctubre1 +
            this.dboNoviembre1 +
            this.dboDiciembre1;
        this.dbo1Promedio = suma / 12;
    }
    calculaDbo2() {
        this.dbo2Min = Math.min(
            this.dboEnero2,
            this.dboFebrero2,
            this.dboMarzo2,
            this.dboAbril2,
            this.dboMayo2,
            this.dboJunio2,
            this.dboJulio2,
            this.dboAgosto2,
            this.dboSeptiembre2,
            this.dboOctubre2,
            this.dboNoviembre2,
            this.dboDiciembre2
        );
        this.dbo2Max = Math.max(
            this.dboEnero2,
            this.dboFebrero2,
            this.dboMarzo2,
            this.dboAbril2,
            this.dboMayo2,
            this.dboJunio2,
            this.dboJulio2,
            this.dboAgosto2,
            this.dboSeptiembre2,
            this.dboOctubre2,
            this.dboNoviembre2,
            this.dboDiciembre2
        );
        let suma =
            this.dboEnero2 +
            this.dboFebrero2 +
            this.dboMarzo2 +
            this.dboAbril2 +
            this.dboMayo2 +
            this.dboJunio2 +
            this.dboJulio2 +
            this.dboAgosto2 +
            this.dboSeptiembre2 +
            this.dboOctubre2 +
            this.dboNoviembre2 +
            this.dboDiciembre2;
        this.dbo2Promedio = suma / 12;
    }
    calculaDbo3() {
        this.dbo3Min = Math.min(
            this.dboEnero3,
            this.dboFebrero3,
            this.dboMarzo3,
            this.dboAbril3,
            this.dboMayo3,
            this.dboJunio3,
            this.dboJulio3,
            this.dboAgosto3,
            this.dboSeptiembre3,
            this.dboOctubre3,
            this.dboNoviembre3,
            this.dboDiciembre3
        );
        this.dbo3Max = Math.max(
            this.dboEnero3,
            this.dboFebrero3,
            this.dboMarzo3,
            this.dboAbril3,
            this.dboMayo3,
            this.dboJunio3,
            this.dboJulio3,
            this.dboAgosto3,
            this.dboSeptiembre3,
            this.dboOctubre3,
            this.dboNoviembre3,
            this.dboDiciembre3
        );
        let suma =
            this.dboEnero3 +
            this.dboFebrero3 +
            this.dboMarzo3 +
            this.dboAbril3 +
            this.dboMayo3 +
            this.dboJunio3 +
            this.dboJulio3 +
            this.dboAgosto3 +
            this.dboSeptiembre3 +
            this.dboOctubre3 +
            this.dboNoviembre3 +
            this.dboDiciembre3;
        this.dbo3Promedio = suma / 12;
    }
    calculaArsenico1() {
        this.arsenico1Min = Math.min(
            this.arsenicoEnero1,
            this.arsenicoFebrero1,
            this.arsenicoMarzo1,
            this.arsenicoAbril1,
            this.arsenicoMayo1,
            this.arsenicoJunio1,
            this.arsenicoJulio1,
            this.arsenicoAgosto1,
            this.arsenicoSeptiembre1,
            this.arsenicoOctubre1,
            this.arsenicoNoviembre1,
            this.arsenicoDiciembre1
        );
        this.arsenico1Max = Math.max(
            this.arsenicoEnero1,
            this.arsenicoFebrero1,
            this.arsenicoMarzo1,
            this.arsenicoAbril1,
            this.arsenicoMayo1,
            this.arsenicoJunio1,
            this.arsenicoJulio1,
            this.arsenicoAgosto1,
            this.arsenicoSeptiembre1,
            this.arsenicoOctubre1,
            this.arsenicoNoviembre1,
            this.arsenicoDiciembre1
        );
        let suma =
            this.arsenicoEnero1 +
            this.arsenicoFebrero1 +
            this.arsenicoMarzo1 +
            this.arsenicoAbril1 +
            this.arsenicoMayo1 +
            this.arsenicoJunio1 +
            this.arsenicoJulio1 +
            this.arsenicoAgosto1 +
            this.arsenicoSeptiembre1 +
            this.arsenicoOctubre1 +
            this.arsenicoNoviembre1 +
            this.arsenicoDiciembre1;
        this.arsenico1Promedio = suma / 12;
    }
    calculaArsenico2() {
        this.arsenico2Min = Math.min(
            this.arsenicoEnero2,
            this.arsenicoFebrero2,
            this.arsenicoMarzo2,
            this.arsenicoAbril2,
            this.arsenicoMayo2,
            this.arsenicoJunio2,
            this.arsenicoJulio2,
            this.arsenicoAgosto2,
            this.arsenicoSeptiembre2,
            this.arsenicoOctubre2,
            this.arsenicoNoviembre2,
            this.arsenicoDiciembre2
        );
        this.arsenico2Max = Math.max(
            this.arsenicoEnero2,
            this.arsenicoFebrero2,
            this.arsenicoMarzo2,
            this.arsenicoAbril2,
            this.arsenicoMayo2,
            this.arsenicoJunio2,
            this.arsenicoJulio2,
            this.arsenicoAgosto2,
            this.arsenicoSeptiembre2,
            this.arsenicoOctubre2,
            this.arsenicoNoviembre2,
            this.arsenicoDiciembre2
        );
        let suma =
            this.arsenicoEnero2 +
            this.arsenicoFebrero2 +
            this.arsenicoMarzo2 +
            this.arsenicoAbril2 +
            this.arsenicoMayo2 +
            this.arsenicoJunio2 +
            this.arsenicoJulio2 +
            this.arsenicoAgosto2 +
            this.arsenicoSeptiembre2 +
            this.arsenicoOctubre2 +
            this.arsenicoNoviembre2 +
            this.arsenicoDiciembre2;
        this.arsenico2Promedio = suma / 12;
    }
    calculaArsenico3() {
        this.arsenico3Min = Math.min(
            this.arsenicoEnero3,
            this.arsenicoFebrero3,
            this.arsenicoMarzo3,
            this.arsenicoAbril3,
            this.arsenicoMayo3,
            this.arsenicoJunio3,
            this.arsenicoJulio3,
            this.arsenicoAgosto3,
            this.arsenicoSeptiembre3,
            this.arsenicoOctubre3,
            this.arsenicoNoviembre3,
            this.arsenicoDiciembre3
        );
        this.arsenico3Max = Math.max(
            this.arsenicoEnero3,
            this.arsenicoFebrero3,
            this.arsenicoMarzo3,
            this.arsenicoAbril3,
            this.arsenicoMayo3,
            this.arsenicoJunio3,
            this.arsenicoJulio3,
            this.arsenicoAgosto3,
            this.arsenicoSeptiembre3,
            this.arsenicoOctubre3,
            this.arsenicoNoviembre3,
            this.arsenicoDiciembre3
        );
        let suma =
            this.arsenicoEnero3 +
            this.arsenicoFebrero3 +
            this.arsenicoMarzo3 +
            this.arsenicoAbril3 +
            this.arsenicoMayo3 +
            this.arsenicoJunio3 +
            this.arsenicoJulio3 +
            this.arsenicoAgosto3 +
            this.arsenicoSeptiembre3 +
            this.arsenicoOctubre3 +
            this.arsenicoNoviembre3 +
            this.arsenicoDiciembre3;
        this.arsenico3Promedio = suma / 12;
    }
    calculaCadmio1() {
        this.cadmio1Min = Math.min(
            this.cadmioEnero1,
            this.cadmioFebrero1,
            this.cadmioMarzo1,
            this.cadmioAbril1,
            this.cadmioMayo1,
            this.cadmioJunio1,
            this.cadmioJulio1,
            this.cadmioAgosto1,
            this.cadmioSeptiembre1,
            this.cadmioOctubre1,
            this.cadmioNoviembre1,
            this.cadmioDiciembre1
        );
        this.cadmio1Max = Math.max(
            this.cadmioEnero1,
            this.cadmioFebrero1,
            this.cadmioMarzo1,
            this.cadmioAbril1,
            this.cadmioMayo1,
            this.cadmioJunio1,
            this.cadmioJulio1,
            this.cadmioAgosto1,
            this.cadmioSeptiembre1,
            this.cadmioOctubre1,
            this.cadmioNoviembre1,
            this.cadmioDiciembre1
        );
        let suma =
            this.cadmioEnero1 +
            this.cadmioFebrero1 +
            this.cadmioMarzo1 +
            this.cadmioAbril1 +
            this.cadmioMayo1 +
            this.cadmioJunio1 +
            this.cadmioJulio1 +
            this.cadmioAgosto1 +
            this.cadmioSeptiembre1 +
            this.cadmioOctubre1 +
            this.cadmioNoviembre1 +
            this.cadmioDiciembre1;
        this.cadmio1Promedio = suma / 12;
    }
    calculaCadmio2() {
        this.cadmio2Min = Math.min(
            this.cadmioEnero2,
            this.cadmioFebrero2,
            this.cadmioMarzo2,
            this.cadmioAbril2,
            this.cadmioMayo2,
            this.cadmioJunio2,
            this.cadmioJulio2,
            this.cadmioAgosto2,
            this.cadmioSeptiembre2,
            this.cadmioOctubre2,
            this.cadmioNoviembre2,
            this.cadmioDiciembre2
        );
        this.cadmio2Max = Math.max(
            this.cadmioEnero2,
            this.cadmioFebrero2,
            this.cadmioMarzo2,
            this.cadmioAbril2,
            this.cadmioMayo2,
            this.cadmioJunio2,
            this.cadmioJulio2,
            this.cadmioAgosto2,
            this.cadmioSeptiembre2,
            this.cadmioOctubre2,
            this.cadmioNoviembre2,
            this.cadmioDiciembre2
        );
        let suma =
            this.cadmioEnero2 +
            this.cadmioFebrero2 +
            this.cadmioMarzo2 +
            this.cadmioAbril2 +
            this.cadmioMayo2 +
            this.cadmioJunio2 +
            this.cadmioJulio2 +
            this.cadmioAgosto2 +
            this.cadmioSeptiembre2 +
            this.cadmioOctubre2 +
            this.cadmioNoviembre2 +
            this.cadmioDiciembre2;
        this.cadmio2Promedio = suma / 12;
    }
    calculaCadmio3() {
        this.cadmio3Min = Math.min(
            this.cadmioEnero3,
            this.cadmioFebrero3,
            this.cadmioMarzo3,
            this.cadmioAbril3,
            this.cadmioMayo3,
            this.cadmioJunio3,
            this.cadmioJulio3,
            this.cadmioAgosto3,
            this.cadmioSeptiembre3,
            this.cadmioOctubre3,
            this.cadmioNoviembre3,
            this.cadmioDiciembre3
        );
        this.cadmio3Max = Math.max(
            this.cadmioEnero3,
            this.cadmioFebrero3,
            this.cadmioMarzo3,
            this.cadmioAbril3,
            this.cadmioMayo3,
            this.cadmioJunio3,
            this.cadmioJulio3,
            this.cadmioAgosto3,
            this.cadmioSeptiembre3,
            this.cadmioOctubre3,
            this.cadmioNoviembre3,
            this.cadmioDiciembre3
        );
        let suma =
            this.cadmioEnero3 +
            this.cadmioFebrero3 +
            this.cadmioMarzo3 +
            this.cadmioAbril3 +
            this.cadmioMayo3 +
            this.cadmioJunio3 +
            this.cadmioJulio3 +
            this.cadmioAgosto3 +
            this.cadmioSeptiembre3 +
            this.cadmioOctubre3 +
            this.cadmioNoviembre3 +
            this.cadmioDiciembre3;
        this.cadmio3Promedio = suma / 12;
    }
    calculaCromo1() {
        this.cromo1Min = Math.min(
            this.cromoEnero1,
            this.cromoFebrero1,
            this.cromoMarzo1,
            this.cromoAbril1,
            this.cromoMayo1,
            this.cromoJunio1,
            this.cromoJulio1,
            this.cromoAgosto1,
            this.cromoSeptiembre1,
            this.cromoOctubre1,
            this.cromoNoviembre1,
            this.cromoDiciembre1
        );
        this.cromo1Max = Math.max(
            this.cromoEnero1,
            this.cromoFebrero1,
            this.cromoMarzo1,
            this.cromoAbril1,
            this.cromoMayo1,
            this.cromoJunio1,
            this.cromoJulio1,
            this.cromoAgosto1,
            this.cromoSeptiembre1,
            this.cromoOctubre1,
            this.cromoNoviembre1,
            this.cromoDiciembre1
        );
        let suma =
            this.cromoEnero1 +
            this.cromoFebrero1 +
            this.cromoMarzo1 +
            this.cromoAbril1 +
            this.cromoMayo1 +
            this.cromoJunio1 +
            this.cromoJulio1 +
            this.cromoAgosto1 +
            this.cromoSeptiembre1 +
            this.cromoOctubre1 +
            this.cromoNoviembre1 +
            this.cromoDiciembre1;
        this.cromo1Promedio = suma / 12;
    }
    calculaCromo2() {
        this.cromo2Min = Math.min(
            this.cromoEnero2,
            this.cromoFebrero2,
            this.cromoMarzo2,
            this.cromoAbril2,
            this.cromoMayo2,
            this.cromoJunio2,
            this.cromoJulio2,
            this.cromoAgosto2,
            this.cromoSeptiembre2,
            this.cromoOctubre2,
            this.cromoNoviembre2,
            this.cromoDiciembre2
        );
        this.cromo2Max = Math.max(
            this.cromoEnero2,
            this.cromoFebrero2,
            this.cromoMarzo2,
            this.cromoAbril2,
            this.cromoMayo2,
            this.cromoJunio2,
            this.cromoJulio2,
            this.cromoAgosto2,
            this.cromoSeptiembre2,
            this.cromoOctubre2,
            this.cromoNoviembre2,
            this.cromoDiciembre2
        );
        let suma =
            this.cromoEnero2 +
            this.cromoFebrero2 +
            this.cromoMarzo2 +
            this.cromoAbril2 +
            this.cromoMayo2 +
            this.cromoJunio2 +
            this.cromoJulio2 +
            this.cromoAgosto2 +
            this.cromoSeptiembre2 +
            this.cromoOctubre2 +
            this.cromoNoviembre2 +
            this.cromoDiciembre2;
        this.cromo2Promedio = suma / 12;
    }
    calculaCromo3() {
        this.cromo3Min = Math.min(
            this.cromoEnero3,
            this.cromoFebrero3,
            this.cromoMarzo3,
            this.cromoAbril3,
            this.cromoMayo3,
            this.cromoJunio3,
            this.cromoJulio3,
            this.cromoAgosto3,
            this.cromoSeptiembre3,
            this.cromoOctubre3,
            this.cromoNoviembre3,
            this.cromoDiciembre3
        );
        this.cromo3Max = Math.max(
            this.cromoEnero3,
            this.cromoFebrero3,
            this.cromoMarzo3,
            this.cromoAbril3,
            this.cromoMayo3,
            this.cromoJunio3,
            this.cromoJulio3,
            this.cromoAgosto3,
            this.cromoSeptiembre3,
            this.cromoOctubre3,
            this.cromoNoviembre3,
            this.cromoDiciembre3
        );
        let suma =
            this.cromoEnero3 +
            this.cromoFebrero3 +
            this.cromoMarzo3 +
            this.cromoAbril3 +
            this.cromoMayo3 +
            this.cromoJunio3 +
            this.cromoJulio3 +
            this.cromoAgosto3 +
            this.cromoSeptiembre3 +
            this.cromoOctubre3 +
            this.cromoNoviembre3 +
            this.cromoDiciembre3;
        this.cromo3Promedio = suma / 12;
    }
    calculaCobre1() {
        this.cobre1Min = Math.min(
            this.cobreEnero1,
            this.cobreFebrero1,
            this.cobreMarzo1,
            this.cobreAbril1,
            this.cobreMayo1,
            this.cobreJunio1,
            this.cobreJulio1,
            this.cobreAgosto1,
            this.cobreSeptiembre1,
            this.cobreOctubre1,
            this.cobreNoviembre1,
            this.cobreDiciembre1
        );
        this.cobre1Max = Math.max(
            this.cobreEnero1,
            this.cobreFebrero1,
            this.cobreMarzo1,
            this.cobreAbril1,
            this.cobreMayo1,
            this.cobreJunio1,
            this.cobreJulio1,
            this.cobreAgosto1,
            this.cobreSeptiembre1,
            this.cobreOctubre1,
            this.cobreNoviembre1,
            this.cobreDiciembre1
        );
        let suma =
            this.cobreEnero1 +
            this.cobreFebrero1 +
            this.cobreMarzo1 +
            this.cobreAbril1 +
            this.cobreMayo1 +
            this.cobreJunio1 +
            this.cobreJulio1 +
            this.cobreAgosto1 +
            this.cobreSeptiembre1 +
            this.cobreOctubre1 +
            this.cobreNoviembre1 +
            this.cobreDiciembre1;
        this.cobre1Promedio = suma / 12;
    }
    calculaCobre2() {
        this.cobre2Min = Math.min(
            this.cobreEnero2,
            this.cobreFebrero2,
            this.cobreMarzo2,
            this.cobreAbril2,
            this.cobreMayo2,
            this.cobreJunio2,
            this.cobreJulio2,
            this.cobreAgosto2,
            this.cobreSeptiembre2,
            this.cobreOctubre2,
            this.cobreNoviembre2,
            this.cobreDiciembre2
        );
        this.cobre2Max = Math.max(
            this.cobreEnero2,
            this.cobreFebrero2,
            this.cobreMarzo2,
            this.cobreAbril2,
            this.cobreMayo2,
            this.cobreJunio2,
            this.cobreJulio2,
            this.cobreAgosto2,
            this.cobreSeptiembre2,
            this.cobreOctubre2,
            this.cobreNoviembre2,
            this.cobreDiciembre2
        );
        let suma =
            this.cobreEnero2 +
            this.cobreFebrero2 +
            this.cobreMarzo2 +
            this.cobreAbril2 +
            this.cobreMayo2 +
            this.cobreJunio2 +
            this.cobreJulio2 +
            this.cobreAgosto2 +
            this.cobreSeptiembre2 +
            this.cobreOctubre2 +
            this.cobreNoviembre2 +
            this.cobreDiciembre2;
        this.cobre2Promedio = suma / 12;
    }
    calculaCobre3() {
        this.cobre3Min = Math.min(
            this.cobreEnero3,
            this.cobreFebrero3,
            this.cobreMarzo3,
            this.cobreAbril3,
            this.cobreMayo3,
            this.cobreJunio3,
            this.cobreJulio3,
            this.cobreAgosto3,
            this.cobreSeptiembre3,
            this.cobreOctubre3,
            this.cobreNoviembre3,
            this.cobreDiciembre3
        );
        this.cobre3Max = Math.max(
            this.cobreEnero3,
            this.cobreFebrero3,
            this.cobreMarzo3,
            this.cobreAbril3,
            this.cobreMayo3,
            this.cobreJunio3,
            this.cobreJulio3,
            this.cobreAgosto3,
            this.cobreSeptiembre3,
            this.cobreOctubre3,
            this.cobreNoviembre3,
            this.cobreDiciembre3
        );
        let suma =
            this.cobreEnero3 +
            this.cobreFebrero3 +
            this.cobreMarzo3 +
            this.cobreAbril3 +
            this.cobreMayo3 +
            this.cobreJunio3 +
            this.cobreJulio3 +
            this.cobreAgosto3 +
            this.cobreSeptiembre3 +
            this.cobreOctubre3 +
            this.cobreNoviembre3 +
            this.cobreDiciembre3;
        this.cobre3Promedio = suma / 12;
    }
    calculaMercurio1() {
        this.mercurio1Min = Math.min(
            this.mercurioEnero1,
            this.mercurioFebrero1,
            this.mercurioMarzo1,
            this.mercurioAbril1,
            this.mercurioMayo1,
            this.mercurioJunio1,
            this.mercurioJulio1,
            this.mercurioAgosto1,
            this.mercurioSeptiembre1,
            this.mercurioOctubre1,
            this.mercurioNoviembre1,
            this.mercurioDiciembre1
        );
        this.mercurio1Max = Math.max(
            this.mercurioEnero1,
            this.mercurioFebrero1,
            this.mercurioMarzo1,
            this.mercurioAbril1,
            this.mercurioMayo1,
            this.mercurioJunio1,
            this.mercurioJulio1,
            this.mercurioAgosto1,
            this.mercurioSeptiembre1,
            this.mercurioOctubre1,
            this.mercurioNoviembre1,
            this.mercurioDiciembre1
        );
        let suma =
            this.mercurioEnero1 +
            this.mercurioFebrero1 +
            this.mercurioMarzo1 +
            this.mercurioAbril1 +
            this.mercurioMayo1 +
            this.mercurioJunio1 +
            this.mercurioJulio1 +
            this.mercurioAgosto1 +
            this.mercurioSeptiembre1 +
            this.mercurioOctubre1 +
            this.mercurioNoviembre1 +
            this.mercurioDiciembre1;
        this.mercurio1Promedio = suma / 12;
    }
    calculaMercurio2() {
        this.mercurio2Min = Math.min(
            this.mercurioEnero2,
            this.mercurioFebrero2,
            this.mercurioMarzo2,
            this.mercurioAbril2,
            this.mercurioMayo2,
            this.mercurioJunio2,
            this.mercurioJulio2,
            this.mercurioAgosto2,
            this.mercurioSeptiembre2,
            this.mercurioOctubre2,
            this.mercurioNoviembre2,
            this.mercurioDiciembre2
        );
        this.mercurio2Max = Math.max(
            this.mercurioEnero2,
            this.mercurioFebrero2,
            this.mercurioMarzo2,
            this.mercurioAbril2,
            this.mercurioMayo2,
            this.mercurioJunio2,
            this.mercurioJulio2,
            this.mercurioAgosto2,
            this.mercurioSeptiembre2,
            this.mercurioOctubre2,
            this.mercurioNoviembre2,
            this.mercurioDiciembre2
        );
        let suma =
            this.mercurioEnero2 +
            this.mercurioFebrero2 +
            this.mercurioMarzo2 +
            this.mercurioAbril2 +
            this.mercurioMayo2 +
            this.mercurioJunio2 +
            this.mercurioJulio2 +
            this.mercurioAgosto2 +
            this.mercurioSeptiembre2 +
            this.mercurioOctubre2 +
            this.mercurioNoviembre2 +
            this.mercurioDiciembre2;
        this.mercurio2Promedio = suma / 12;
    }
    calculaMercurio3() {
        this.mercurio3Min = Math.min(
            this.mercurioEnero3,
            this.mercurioFebrero3,
            this.mercurioMarzo3,
            this.mercurioAbril3,
            this.mercurioMayo3,
            this.mercurioJunio3,
            this.mercurioJulio3,
            this.mercurioAgosto3,
            this.mercurioSeptiembre3,
            this.mercurioOctubre3,
            this.mercurioNoviembre3,
            this.mercurioDiciembre3
        );
        this.mercurio3Max = Math.max(
            this.mercurioEnero3,
            this.mercurioFebrero3,
            this.mercurioMarzo3,
            this.mercurioAbril3,
            this.mercurioMayo3,
            this.mercurioJunio3,
            this.mercurioJulio3,
            this.mercurioAgosto3,
            this.mercurioSeptiembre3,
            this.mercurioOctubre3,
            this.mercurioNoviembre3,
            this.mercurioDiciembre3
        );
        let suma =
            this.mercurioEnero3 +
            this.mercurioFebrero3 +
            this.mercurioMarzo3 +
            this.mercurioAbril3 +
            this.mercurioMayo3 +
            this.mercurioJunio3 +
            this.mercurioJulio3 +
            this.mercurioAgosto3 +
            this.mercurioSeptiembre3 +
            this.mercurioOctubre3 +
            this.mercurioNoviembre3 +
            this.mercurioDiciembre3;
        this.mercurio3Promedio = suma / 12;
    }
    calculaNiquel1() {
        this.niquel1Min = Math.min(
            this.niquelEnero1,
            this.niquelFebrero1,
            this.niquelMarzo1,
            this.niquelAbril1,
            this.niquelMayo1,
            this.niquelJunio1,
            this.niquelJulio1,
            this.niquelAgosto1,
            this.niquelSeptiembre1,
            this.niquelOctubre1,
            this.niquelNoviembre1,
            this.niquelDiciembre1
        );
        this.niquel1Max = Math.max(
            this.niquelEnero1,
            this.niquelFebrero1,
            this.niquelMarzo1,
            this.niquelAbril1,
            this.niquelMayo1,
            this.niquelJunio1,
            this.niquelJulio1,
            this.niquelAgosto1,
            this.niquelSeptiembre1,
            this.niquelOctubre1,
            this.niquelNoviembre1,
            this.niquelDiciembre1
        );
        let suma =
            this.niquelEnero1 +
            this.niquelFebrero1 +
            this.niquelMarzo1 +
            this.niquelAbril1 +
            this.niquelMayo1 +
            this.niquelJunio1 +
            this.niquelJulio1 +
            this.niquelAgosto1 +
            this.niquelSeptiembre1 +
            this.niquelOctubre1 +
            this.niquelNoviembre1 +
            this.niquelDiciembre1;
        this.niquel1Promedio = suma / 12;
    }
    calculaNiquel2() {
        this.niquel2Min = Math.min(
            this.niquelEnero2,
            this.niquelFebrero2,
            this.niquelMarzo2,
            this.niquelAbril2,
            this.niquelMayo2,
            this.niquelJunio2,
            this.niquelJulio2,
            this.niquelAgosto2,
            this.niquelSeptiembre2,
            this.niquelOctubre2,
            this.niquelNoviembre2,
            this.niquelDiciembre2
        );
        this.niquel2Max = Math.max(
            this.niquelEnero2,
            this.niquelFebrero2,
            this.niquelMarzo2,
            this.niquelAbril2,
            this.niquelMayo2,
            this.niquelJunio2,
            this.niquelJulio2,
            this.niquelAgosto2,
            this.niquelSeptiembre2,
            this.niquelOctubre2,
            this.niquelNoviembre2,
            this.niquelDiciembre2
        );
        let suma =
            this.niquelEnero2 +
            this.niquelFebrero2 +
            this.niquelMarzo2 +
            this.niquelAbril2 +
            this.niquelMayo2 +
            this.niquelJunio2 +
            this.niquelJulio2 +
            this.niquelAgosto2 +
            this.niquelSeptiembre2 +
            this.niquelOctubre2 +
            this.niquelNoviembre2 +
            this.niquelDiciembre2;
        this.niquel2Promedio = suma / 12;
    }
    calculaNiquel3() {
        this.niquel3Min = Math.min(
            this.niquelEnero3,
            this.niquelFebrero3,
            this.niquelMarzo3,
            this.niquelAbril3,
            this.niquelMayo3,
            this.niquelJunio3,
            this.niquelJulio3,
            this.niquelAgosto3,
            this.niquelSeptiembre3,
            this.niquelOctubre3,
            this.niquelNoviembre3,
            this.niquelDiciembre3
        );
        this.niquel3Max = Math.max(
            this.niquelEnero3,
            this.niquelFebrero3,
            this.niquelMarzo3,
            this.niquelAbril3,
            this.niquelMayo3,
            this.niquelJunio3,
            this.niquelJulio3,
            this.niquelAgosto3,
            this.niquelSeptiembre3,
            this.niquelOctubre3,
            this.niquelNoviembre3,
            this.niquelDiciembre3
        );
        let suma =
            this.niquelEnero3 +
            this.niquelFebrero3 +
            this.niquelMarzo3 +
            this.niquelAbril3 +
            this.niquelMayo3 +
            this.niquelJunio3 +
            this.niquelJulio3 +
            this.niquelAgosto3 +
            this.niquelSeptiembre3 +
            this.niquelOctubre3 +
            this.niquelNoviembre3 +
            this.niquelDiciembre3;
        this.niquel3Promedio = suma / 12;
    }
    calculaPlomo1() {
        this.plomo1Min = Math.min(
            this.plomoEnero1,
            this.plomoFebrero1,
            this.plomoMarzo1,
            this.plomoAbril1,
            this.plomoMayo1,
            this.plomoJunio1,
            this.plomoJulio1,
            this.plomoAgosto1,
            this.plomoSeptiembre1,
            this.plomoOctubre1,
            this.plomoNoviembre1,
            this.plomoDiciembre1
        );
        this.plomo1Max = Math.max(
            this.plomoEnero1,
            this.plomoFebrero1,
            this.plomoMarzo1,
            this.plomoAbril1,
            this.plomoMayo1,
            this.plomoJunio1,
            this.plomoJulio1,
            this.plomoAgosto1,
            this.plomoSeptiembre1,
            this.plomoOctubre1,
            this.plomoNoviembre1,
            this.plomoDiciembre1
        );
        let suma =
            this.plomoEnero1 +
            this.plomoFebrero1 +
            this.plomoMarzo1 +
            this.plomoAbril1 +
            this.plomoMayo1 +
            this.plomoJunio1 +
            this.plomoJulio1 +
            this.plomoAgosto1 +
            this.plomoSeptiembre1 +
            this.plomoOctubre1 +
            this.plomoNoviembre1 +
            this.plomoDiciembre1;
        this.plomo1Promedio = suma / 12;
    }
    calculaPlomo2() {
        this.plomo2Min = Math.min(
            this.plomoEnero2,
            this.plomoFebrero2,
            this.plomoMarzo2,
            this.plomoAbril2,
            this.plomoMayo2,
            this.plomoJunio2,
            this.plomoJulio2,
            this.plomoAgosto2,
            this.plomoSeptiembre2,
            this.plomoOctubre2,
            this.plomoNoviembre2,
            this.plomoDiciembre2
        );
        this.plomo2Max = Math.max(
            this.plomoEnero2,
            this.plomoFebrero2,
            this.plomoMarzo2,
            this.plomoAbril2,
            this.plomoMayo2,
            this.plomoJunio2,
            this.plomoJulio2,
            this.plomoAgosto2,
            this.plomoSeptiembre2,
            this.plomoOctubre2,
            this.plomoNoviembre2,
            this.plomoDiciembre2
        );
        let suma =
            this.plomoEnero2 +
            this.plomoFebrero2 +
            this.plomoMarzo2 +
            this.plomoAbril2 +
            this.plomoMayo2 +
            this.plomoJunio2 +
            this.plomoJulio2 +
            this.plomoAgosto2 +
            this.plomoSeptiembre2 +
            this.plomoOctubre2 +
            this.plomoNoviembre2 +
            this.plomoDiciembre2;
        this.plomo2Promedio = suma / 12;
    }
    calculaPlomo3() {
        this.plomo3Min = Math.min(
            this.plomoEnero3,
            this.plomoFebrero3,
            this.plomoMarzo3,
            this.plomoAbril3,
            this.plomoMayo3,
            this.plomoJunio3,
            this.plomoJulio3,
            this.plomoAgosto3,
            this.plomoSeptiembre3,
            this.plomoOctubre3,
            this.plomoNoviembre3,
            this.plomoDiciembre3
        );
        this.plomo3Max = Math.max(
            this.plomoEnero3,
            this.plomoFebrero3,
            this.plomoMarzo3,
            this.plomoAbril3,
            this.plomoMayo3,
            this.plomoJunio3,
            this.plomoJulio3,
            this.plomoAgosto3,
            this.plomoSeptiembre3,
            this.plomoOctubre3,
            this.plomoNoviembre3,
            this.plomoDiciembre3
        );
        let suma =
            this.plomoEnero3 +
            this.plomoFebrero3 +
            this.plomoMarzo3 +
            this.plomoAbril3 +
            this.plomoMayo3 +
            this.plomoJunio3 +
            this.plomoJulio3 +
            this.plomoAgosto3 +
            this.plomoSeptiembre3 +
            this.plomoOctubre3 +
            this.plomoNoviembre3 +
            this.plomoDiciembre3;
        this.plomo3Promedio = suma / 12;
    }
    calculaZinc1() {
        this.zinc1Min = Math.min(
            this.zincEnero1,
            this.zincFebrero1,
            this.zincMarzo1,
            this.zincAbril1,
            this.zincMayo1,
            this.zincJunio1,
            this.zincJulio1,
            this.zincAgosto1,
            this.zincSeptiembre1,
            this.zincOctubre1,
            this.zincNoviembre1,
            this.zincDiciembre1
        );
        this.zinc1Max = Math.max(
            this.zincEnero1,
            this.zincFebrero1,
            this.zincMarzo1,
            this.zincAbril1,
            this.zincMayo1,
            this.zincJunio1,
            this.zincJulio1,
            this.zincAgosto1,
            this.zincSeptiembre1,
            this.zincOctubre1,
            this.zincNoviembre1,
            this.zincDiciembre1
        );
        let suma =
            this.zincEnero1 +
            this.zincFebrero1 +
            this.zincMarzo1 +
            this.zincAbril1 +
            this.zincMayo1 +
            this.zincJunio1 +
            this.zincJulio1 +
            this.zincAgosto1 +
            this.zincSeptiembre1 +
            this.zincOctubre1 +
            this.zincNoviembre1 +
            this.zincDiciembre1;
        this.zinc1Promedio = suma / 12;
    }
    calculaZinc2() {
        this.zinc2Min = Math.min(
            this.zincEnero2,
            this.zincFebrero2,
            this.zincMarzo2,
            this.zincAbril2,
            this.zincMayo2,
            this.zincJunio2,
            this.zincJulio2,
            this.zincAgosto2,
            this.zincSeptiembre2,
            this.zincOctubre2,
            this.zincNoviembre2,
            this.zincDiciembre2
        );
        this.zinc2Max = Math.max(
            this.zincEnero2,
            this.zincFebrero2,
            this.zincMarzo2,
            this.zincAbril2,
            this.zincMayo2,
            this.zincJunio2,
            this.zincJulio2,
            this.zincAgosto2,
            this.zincSeptiembre2,
            this.zincOctubre2,
            this.zincNoviembre2,
            this.zincDiciembre2
        );
        let suma =
            this.zincEnero2 +
            this.zincFebrero2 +
            this.zincMarzo2 +
            this.zincAbril2 +
            this.zincMayo2 +
            this.zincJunio2 +
            this.zincJulio2 +
            this.zincAgosto2 +
            this.zincSeptiembre2 +
            this.zincOctubre2 +
            this.zincNoviembre2 +
            this.zincDiciembre2;
        this.zinc2Promedio = suma / 12;
    }
    calculaZinc3() {
        this.zinc3Min = Math.min(
            this.zincEnero3,
            this.zincFebrero3,
            this.zincMarzo3,
            this.zincAbril3,
            this.zincMayo3,
            this.zincJunio3,
            this.zincJulio3,
            this.zincAgosto3,
            this.zincSeptiembre3,
            this.zincOctubre3,
            this.zincNoviembre3,
            this.zincDiciembre3
        );
        this.zinc3Max = Math.max(
            this.zincEnero3,
            this.zincFebrero3,
            this.zincMarzo3,
            this.zincAbril3,
            this.zincMayo3,
            this.zincJunio3,
            this.zincJulio3,
            this.zincAgosto3,
            this.zincSeptiembre3,
            this.zincOctubre3,
            this.zincNoviembre3,
            this.zincDiciembre3
        );
        let suma =
            this.zincEnero3 +
            this.zincFebrero3 +
            this.zincMarzo3 +
            this.zincAbril3 +
            this.zincMayo3 +
            this.zincJunio3 +
            this.zincJulio3 +
            this.zincAgosto3 +
            this.zincSeptiembre3 +
            this.zincOctubre3 +
            this.zincNoviembre3 +
            this.zincDiciembre3;
        this.zinc3Promedio = suma / 12;
    }
    calculaPentaclorofenol1() {
        this.pentaclorofenol1Min = Math.min(
            this.pentaclorofenolEnero1,
            this.pentaclorofenolFebrero1,
            this.pentaclorofenolMarzo1,
            this.pentaclorofenolAbril1,
            this.pentaclorofenolMayo1,
            this.pentaclorofenolJunio1,
            this.pentaclorofenolJulio1,
            this.pentaclorofenolAgosto1,
            this.pentaclorofenolSeptiembre1,
            this.pentaclorofenolOctubre1,
            this.pentaclorofenolNoviembre1,
            this.pentaclorofenolDiciembre1
        );
        this.pentaclorofenol1Max = Math.max(
            this.pentaclorofenolEnero1,
            this.pentaclorofenolFebrero1,
            this.pentaclorofenolMarzo1,
            this.pentaclorofenolAbril1,
            this.pentaclorofenolMayo1,
            this.pentaclorofenolJunio1,
            this.pentaclorofenolJulio1,
            this.pentaclorofenolAgosto1,
            this.pentaclorofenolSeptiembre1,
            this.pentaclorofenolOctubre1,
            this.pentaclorofenolNoviembre1,
            this.pentaclorofenolDiciembre1
        );
        let suma =
            this.pentaclorofenolEnero1 +
            this.pentaclorofenolFebrero1 +
            this.pentaclorofenolMarzo1 +
            this.pentaclorofenolAbril1 +
            this.pentaclorofenolMayo1 +
            this.pentaclorofenolJunio1 +
            this.pentaclorofenolJulio1 +
            this.pentaclorofenolAgosto1 +
            this.pentaclorofenolSeptiembre1 +
            this.pentaclorofenolOctubre1 +
            this.pentaclorofenolNoviembre1 +
            this.pentaclorofenolDiciembre1;
        this.pentaclorofenol1Promedio = suma / 12;
    }
    calculaPentaclorofenol2() {
        this.pentaclorofenol2Min = Math.min(
            this.pentaclorofenolEnero2,
            this.pentaclorofenolFebrero2,
            this.pentaclorofenolMarzo2,
            this.pentaclorofenolAbril2,
            this.pentaclorofenolMayo2,
            this.pentaclorofenolJunio2,
            this.pentaclorofenolJulio2,
            this.pentaclorofenolAgosto2,
            this.pentaclorofenolSeptiembre2,
            this.pentaclorofenolOctubre2,
            this.pentaclorofenolNoviembre2,
            this.pentaclorofenolDiciembre2
        );
        this.pentaclorofenol2Max = Math.max(
            this.pentaclorofenolEnero2,
            this.pentaclorofenolFebrero2,
            this.pentaclorofenolMarzo2,
            this.pentaclorofenolAbril2,
            this.pentaclorofenolMayo2,
            this.pentaclorofenolJunio2,
            this.pentaclorofenolJulio2,
            this.pentaclorofenolAgosto2,
            this.pentaclorofenolSeptiembre2,
            this.pentaclorofenolOctubre2,
            this.pentaclorofenolNoviembre2,
            this.pentaclorofenolDiciembre2
        );
        let suma =
            this.pentaclorofenolEnero2 +
            this.pentaclorofenolFebrero2 +
            this.pentaclorofenolMarzo2 +
            this.pentaclorofenolAbril2 +
            this.pentaclorofenolMayo2 +
            this.pentaclorofenolJunio2 +
            this.pentaclorofenolJulio2 +
            this.pentaclorofenolAgosto2 +
            this.pentaclorofenolSeptiembre2 +
            this.pentaclorofenolOctubre2 +
            this.pentaclorofenolNoviembre2 +
            this.pentaclorofenolDiciembre2;
        this.pentaclorofenol2Promedio = suma / 12;
    }
    calculaPentaclorofenol3() {
        this.pentaclorofenol3Min = Math.min(
            this.pentaclorofenolEnero3,
            this.pentaclorofenolFebrero3,
            this.pentaclorofenolMarzo3,
            this.pentaclorofenolAbril3,
            this.pentaclorofenolMayo3,
            this.pentaclorofenolJunio3,
            this.pentaclorofenolJulio3,
            this.pentaclorofenolAgosto3,
            this.pentaclorofenolSeptiembre3,
            this.pentaclorofenolOctubre3,
            this.pentaclorofenolNoviembre3,
            this.pentaclorofenolDiciembre3
        );
        this.pentaclorofenol3Max = Math.max(
            this.pentaclorofenolEnero3,
            this.pentaclorofenolFebrero3,
            this.pentaclorofenolMarzo3,
            this.pentaclorofenolAbril3,
            this.pentaclorofenolMayo3,
            this.pentaclorofenolJunio3,
            this.pentaclorofenolJulio3,
            this.pentaclorofenolAgosto3,
            this.pentaclorofenolSeptiembre3,
            this.pentaclorofenolOctubre3,
            this.pentaclorofenolNoviembre3,
            this.pentaclorofenolDiciembre3
        );
        let suma =
            this.pentaclorofenolEnero3 +
            this.pentaclorofenolFebrero3 +
            this.pentaclorofenolMarzo3 +
            this.pentaclorofenolAbril3 +
            this.pentaclorofenolMayo3 +
            this.pentaclorofenolJunio3 +
            this.pentaclorofenolJulio3 +
            this.pentaclorofenolAgosto3 +
            this.pentaclorofenolSeptiembre3 +
            this.pentaclorofenolOctubre3 +
            this.pentaclorofenolNoviembre3 +
            this.pentaclorofenolDiciembre3;
        this.pentaclorofenol3Promedio = suma / 12;
    }

    /* download() {
        // Si el usuario está autenticado, proceder a descargar las hojas seleccionadas
        this.googleSheetsService.handleAuthClick().then(() => {
            console.log('Usuario autenticado, ahora se guardarán los datos.');

            // Después de autenticar, guarda los datos
            return this.guardarDatos();
        });
        if (this.isLoggedIn) {
            const selectedSheets = [
                '3. INFORMACIÓN',
                '4. PRODUCCIÓN',
                '5. USO DIRECTO DE AGUA',
                '6. DESCRIPCIÓN',
                '7. CALIDAD DE AGUA',
                '8. INDICADORES EVALUADOS',
                '9. EMISIÓN CONTAMINANTES',
                '10. FC INDICADORES',
                '11. RESULTADOS HUELLA DIRECTA',
                '12. RESUMEN HUELLA DIRECTA',
            ];
            this.googleSheetsService
                .downloadExcel(selectedSheets)
                .then(() => {
                    console.log('Descarga de hojas seleccionadas completada.');
                })
                .catch((error: any) => {
                    console.error('Error al descargar las hojas seleccionadas:', error);
                });
        } else {
            console.error('El usuario no está autenticado. No se puede descargar.');
        }
    } */
}
