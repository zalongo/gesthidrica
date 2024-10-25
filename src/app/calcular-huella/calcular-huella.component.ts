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

    nitrogenoKjeldahlEnero2: number = 0;
    nitrogenoKjeldahlFebrero2: number = 0;
    nitrogenoKjeldahlMarzo2: number = 0;
    nitrogenoKjeldahlAbril2: number = 0;
    nitrogenoKjeldahlMayo2: number = 0;
    nitrogenoKjeldahlJunio2: number = 0;
    nitrogenoKjeldahlJulio2: number = 0;
    nitrogenoKjeldahlAgosto2: number = 0;
    nitrogenoKjeldahlSeptiembre2: number = 0;
    nitrogenoKjeldahlOctubre2: number = 0;
    nitrogenoKjeldahlNoviembre2: number = 0;
    nitrogenoKjeldahlDiciembre2: number = 0;

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

    // Método para guardar los datos en Google Sheets
    guardarDatos() {
        this.guardarDatosHoja3();
        this.guardarDatosHoja4();
        this.guardarDatosHoja5();
        this.guardarDatosSalidaAgua();
        this.guardarDatosCalidadAgua();


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

            ]
        ];

        // Segunda tabla: Entrada Mensual de Agua de Pozo
        const rangoAguaPozo = '5. USO DIRECTO DE AGUA!A16:N16'; // Rango para la segunda tabla
        const valoresAguaPozo = [
            [
                this.aguaPozoFuenteUso, // A16
                '[m3]',                   //B16
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
                '[m3]',   // C26
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
                '[m3]',  // B6 (puedes ajustar este valor según sea necesario)
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
                '[m3]',  // B26 (ajustar según sea necesario)
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
                '[m3]',  // B16 (ajustar según sea necesario)
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

    private guardarDatosCalidadAgua() {
        const rangoNitrogeno = '7. CALIDAD DE AGUA!D6:O6'; // Rango para la tabla de agua descargada
        const valoresNitrogeno = [
            [
                this.nitrogenoEnero, // D6
                this.nitrogenoFebrero,  // E6 (puedes ajustar este valor según sea necesario)
                this.nitrogenoMarzo, // F6
                this.nitrogenoAbril, // G6
                this.nitrogenoMayo, // H6
                this.nitrogenoJunio, // I6
                this.nitrogenoJulio, // J6
                this.nitrogenoAgosto, // K6
                this.nitrogenoSeptiembre, // L6
                this.nitrogenoOctubre, // M6
                this.nitrogenoNoviembre, // N6
                this.nitrogenoDiciembre, // O6
            ]
        ];
        // Guardar en la Hoja 7
        this.googleSheetsService.addDataToSheet(rangoNitrogeno, valoresNitrogeno)
            .then((response: any) => {
                console.log('Datos guardados exitosamente en Hoja 7 - Calidad Agua', response);
            })
            .catch((error: any) => {
                console.error('Error al guardar los datos en Hoja 7 - Calidad Agua', error);
            });

        const rangoNitrogenoKjeldahl = '7. CALIDAD DE AGUA!D7:O7'; // Rango para la tabla de agua del nitrógeno Kjeldahl
        const valoresNitrogenoKjeldahl = [
            [
                this.nitrogenoKjeldahlEnero, // D7
                this.nitrogenoKjeldahlFebrero, // E7
                this.nitrogenoKjeldahlMarzo, // F7
                this.nitrogenoKjeldahlAbril, // G7
                this.nitrogenoKjeldahlMayo, // H7
                this.nitrogenoKjeldahlJunio, // I7
                this.nitrogenoKjeldahlJulio, // J7
                this.nitrogenoKjeldahlAgosto, // K7
                this.nitrogenoKjeldahlSeptiembre, // L7
                this.nitrogenoKjeldahlOctubre, // M7
                this.nitrogenoKjeldahlNoviembre, // N7
                this.nitrogenoKjeldahlDiciembre, // O7
            ]
        ];

        // Guardar en la Hoja 7
        this.googleSheetsService.addDataToSheet(rangoNitrogenoKjeldahl, valoresNitrogenoKjeldahl)
            .then((response: any) => {
                console.log('Datos guardados exitosamente en Hoja 7 - Calidad Agua', response);
            })
            .catch((error: any) => {
                console.error('Error al guardar los datos en Hoja 7 - Calidad Agua', error);
            });
        const rangoFosforo = '7. CALIDAD DE AGUA!D8:O8'; // Rango para el fosforo total
        const valoresFosforo = [
            [
                this.fosforoTotalEnero, // D8
                this.fosforoTotalFebrero, // E8
                this.fosforoTotalMarzo, // F8
                this.fosforoTotalAbril, // G8
                this.fosforoTotalMayo, // H8
                this.fosforoTotalJunio, // I8
                this.fosforoTotalJulio, // J8
                this.fosforoTotalAgosto, // K8
                this.fosforoTotalSeptiembre, // L8
                this.fosforoTotalOctubre, // M8
                this.fosforoTotalNoviembre, // N8
                this.fosforoTotalDiciembre, // O8
            ]
        ];
        // Guardar en la Hoja 7
        this.googleSheetsService.addDataToSheet(rangoFosforo, valoresFosforo)
            .then((response: any) => {
                console.log('Datos guardados exitosamente en Hoja 7 - Calidad Agua', response);
            })
            .catch((error: any) => {
                console.error('Error al guardar los datos en Hoja 7 - Calidad Agua', error);
            });
        const rangoFosfato = '7. CALIDAD DE AGUA!D9:O9'; // Rango para el fosfato
        const valoresFosfato = [
            [
                this.fosfatoEnero, // D9
                this.fosfatoFebrero, // E9
                this.fosfatoMarzo, // F9
                this.fosfatoAbril, // G9
                this.fosfatoMayo, // H9
                this.fosfatoJunio, // I9
                this.fosfatoJulio, // J9
                this.fosfatoAgosto, // K9
                this.fosfatoSeptiembre, // L9
                this.fosfatoOctubre, // M9
                this.fosfatoNoviembre, // N9
                this.fosfatoDiciembre, // O9
            ]
        ];
        this.googleSheetsService.addDataToSheet(rangoFosfato, valoresFosfato)
            .then((response: any) => {
                console.log('Datos guardados exitosamente en Hoja 7 - Calidad Agua', response);
            })
            .catch((error: any) => {
                console.error('Error al guardar los datos en Hoja 7 - Calidad Agua', error);
            });
        const rangoDqo = '7. CALIDAD DE AGUA!D10:O10'; // Rango para la DQO
        const valoresDqo = [
            [
                this.dqoEnero,
                this.dqoFebrero,
                this.dqoMarzo,
                this.dqoAbril,
                this.dqoMayo,
                this.dqoJunio,
                this.dqoJulio,
                this.dqoAgosto,
                this.dqoSeptiembre,
                this.dqoOctubre,
                this.dqoNoviembre,
                this.dqoDiciembre,
            ]
        ];
        this.googleSheetsService.addDataToSheet(rangoDqo, valoresDqo)
            .then((response: any) => {
                console.log('Datos guardados exitosamente en Hoja 7 - Calidad Agua', response);
            })
            .catch((error: any) => {
                console.error('Error al guardar los datos en Hoja 7 - Calidad Agua', error);
            });
        const rangoDbo = '7. CALIDAD DE AGUA!D11:O11'; // Rango para la DBO
        const valoresDbo = [
            [
                this.dboEnero,
                this.dboFebrero,
                this.dboMarzo,
                this.dboAbril,
                this.dboMayo,
                this.dboJunio,
                this.dboJulio,
                this.dboAgosto,
                this.dboSeptiembre,
                this.dboOctubre,
                this.dboNoviembre,
                this.dboDiciembre,
            ]
        ];
        this.googleSheetsService.addDataToSheet(rangoDbo, valoresDbo)
            .then((response: any) => {
                console.log('Datos guardados exitosamente en Hoja 7 - Calidad Agua', response);
            })
            .catch((error: any) => {
                console.error('Error al guardar los datos en Hoja 7 - Calidad Agua', error);
            });
        const rangoArsenico = '7. CALIDAD DE AGUA!D12:O12'; // Rango para el arsénico
        const valoresArsenico = [
            [
                this.arsenicoEnero,
                this.arsenicoFebrero,
                this.arsenicoMarzo,
                this.arsenicoAbril,
                this.arsenicoMayo,
                this.arsenicoJunio,
                this.arsenicoJulio,
                this.arsenicoAgosto,
                this.arsenicoSeptiembre,
                this.arsenicoOctubre,
                this.arsenicoNoviembre,
                this.arsenicoDiciembre,
            ]
        ];
        this.googleSheetsService.addDataToSheet(rangoArsenico, valoresArsenico)
            .then((response: any) => {
                console.log('Datos guardados exitosamente en Hoja 7 - Calidad Agua', response);
            })
            .catch((error: any) => {
                console.error('Error al guardar los datos en Hoja 7 - Calidad Agua', error);
            });
        const rangoCadmio = '7. CALIDAD DE AGUA!D13:O13'; // Rango para el cadmio
        const valoresCadmio = [
            [
                this.cadmioEnero,
                this.cadmioFebrero,
                this.cadmioMarzo,
                this.cadmioAbril,
                this.cadmioMayo,
                this.cadmioJunio,
                this.cadmioJulio,
                this.cadmioAgosto,
                this.cadmioSeptiembre,
                this.cadmioOctubre,
                this.cadmioNoviembre,
                this.cadmioDiciembre,
            ]
        ];
        this.googleSheetsService.addDataToSheet(rangoCadmio, valoresCadmio)
            .then((response: any) => {
                console.log('Datos guardados exitosamente en Hoja 7 - Calidad Agua', response);
            })
            .catch((error: any) => {
                console.error('Error al guardar los datos en Hoja 7 - Calidad Agua', error);
            });
        const rangoCromo = '7. CALIDAD DE AGUA!D14:O14'; // Rango para el cromo
        const valoresCromo = [
            [
                this.cromoEnero,
                this.cromoFebrero,
                this.cromoMarzo,
                this.cromoAbril,
                this.cromoMayo,
                this.cromoJunio,
                this.cromoJulio,
                this.cromoAgosto,
                this.cromoSeptiembre,
                this.cromoOctubre,
                this.cromoNoviembre,
                this.cromoDiciembre,
            ]
        ];
        this.googleSheetsService.addDataToSheet(rangoCromo, valoresCromo)
            .then((response: any) => {
                console.log('Datos guardados exitosamente en Hoja 7 - Calidad Agua', response);
            })
            .catch((error: any) => {
                console.error('Error al guardar los datos en Hoja 7 - Calidad Agua', error);
            });
        const rangoCobre = '7. CALIDAD DE AGUA!D15:O15'; // Rango para el cobre
        const valoresCobre = [
            [
                this.cobreEnero,
                this.cobreFebrero,
                this.cobreMarzo,
                this.cobreAbril,
                this.cobreMayo,
                this.cobreJunio,
                this.cobreJulio,
                this.cobreAgosto,
                this.cobreSeptiembre,
                this.cobreOctubre,
                this.cobreNoviembre,
                this.cobreDiciembre,
            ]
        ];
        this.googleSheetsService.addDataToSheet(rangoCobre, valoresCobre)
            .then((response: any) => {
                console.log('Datos guardados exitosamente en Hoja 7 - Calidad Agua', response);
            })
            .catch((error: any) => {
                console.error('Error al guardar los datos en Hoja 7 - Calidad Agua', error);
            });
        const rangoMercurio = '7. CALIDAD DE AGUA!D16:O16'; // Rango para el mercurio
        const valoresMercurio = [
            [
                this.mercurioEnero,
                this.mercurioFebrero,
                this.mercurioMarzo,
                this.mercurioAbril,
                this.mercurioMayo,
                this.mercurioJunio,
                this.mercurioJulio,
                this.mercurioAgosto,
                this.mercurioSeptiembre,
                this.mercurioOctubre,
                this.mercurioNoviembre,
                this.mercurioDiciembre,
            ]
        ];
        this.googleSheetsService.addDataToSheet(rangoMercurio, valoresMercurio)
            .then((response: any) => {
                console.log('Datos guardados exitosamente en Hoja 7 - Calidad Agua', response);
            })
            .catch((error: any) => {
                console.error('Error al guardar los datos en Hoja 7 - Calidad Agua', error);
            });
        const rangoNiquel = '7. CALIDAD DE AGUA!D17:O17'; // Rango para el níquel
        const valoresNiquel = [
            [
                this.niquelEnero,
                this.niquelFebrero,
                this.niquelMarzo,
                this.niquelAbril,
                this.niquelMayo,
                this.niquelJunio,
                this.niquelJulio,
                this.niquelAgosto,
                this.niquelSeptiembre,
                this.niquelOctubre,
                this.niquelNoviembre,
                this.niquelDiciembre,
            ]
        ];
        this.googleSheetsService.addDataToSheet(rangoNiquel, valoresNiquel)
            .then((response: any) => {
                console.log('Datos guardados exitosamente en Hoja 7 - Calidad Agua', response);
            })
            .catch((error: any) => {
                console.error('Error al guardar los datos en Hoja 7 - Calidad Agua', error);
            });
        const rangoPlomo = '7. CALIDAD DE AGUA!D18:O18'; // Rango para el plomo
        const valoresPlomo = [
            [
                this.plomoEnero,
                this.plomoFebrero,
                this.plomoMarzo,
                this.plomoAbril,
                this.plomoMayo,
                this.plomoJunio,
                this.plomoJulio,
                this.plomoAgosto,
                this.plomoSeptiembre,
                this.plomoOctubre,
                this.plomoNoviembre,
                this.plomoDiciembre,
            ]
        ];
        this.googleSheetsService.addDataToSheet(rangoPlomo, valoresPlomo)
            .then((response: any) => {
                console.log('Datos guardados exitosamente en Hoja 7 - Calidad Agua', response);
            })
            .catch((error: any) => {
                console.error('Error al guardar los datos en Hoja 7 - Calidad Agua', error);
            });
        const rangoZinc = '7. CALIDAD DE AGUA!D19:O19'; // Rango para el zinc
        const valoresZinc = [
            [
                this.zincEnero,
                this.zincFebrero,
                this.zincMarzo,
                this.zincAbril,
                this.zincMayo,
                this.zincJunio,
                this.zincJulio,
                this.zincAgosto,
                this.zincSeptiembre,
                this.zincOctubre,
                this.zincNoviembre,
                this.zincDiciembre,
            ]
        ];
        this.googleSheetsService.addDataToSheet(rangoZinc, valoresZinc)
            .then((response: any) => {
                console.log('Datos guardados exitosamente en Hoja 7 - Calidad Agua', response);
            })
            .catch((error: any) => {
                console.error('Error al guardar los datos en Hoja 7 - Calidad Agua', error);
            });
        const rangoPentaclorofenol = '7. CALIDAD DE AGUA!D20:O20'; // Rango para el pentaclorofenol
        const valoresPentaclorofenol = [
            [
                this.pentaclorofenolEnero,
                this.pentaclorofenolFebrero,
                this.pentaclorofenolMarzo,
                this.pentaclorofenolAbril,
                this.pentaclorofenolMayo,
                this.pentaclorofenolJunio,
                this.pentaclorofenolJulio,
                this.pentaclorofenolAgosto,
                this.pentaclorofenolSeptiembre,
                this.pentaclorofenolOctubre,
                this.pentaclorofenolNoviembre,
                this.pentaclorofenolDiciembre,
            ]
        ];
        this.googleSheetsService.addDataToSheet(rangoPentaclorofenol, valoresPentaclorofenol)
            .then((response: any) => {
                console.log('Datos guardados exitosamente en Hoja 7 - Calidad Agua', response);
            })
            .catch((error: any) => {
                console.error('Error al guardar los datos en Hoja 7 - Calidad Agua', error);
            });
    }
    // Método para cálculos adicionales si es necesario

    calcular() {
        this.googleSheetsService.handleAuthClick()
            .then(() => {
                console.log('Usuario autenticado, ahora se guardarán los datos.');

                // Después de autenticar, guarda los datos
                return this.guardarDatos();
            })
            .then(() => {
                console.log('Datos guardados exitosamente. Ahora se habilitará el botón de descarga.');
                this.isLoggedIn = true; // Actualiza el estado de autenticación
                this.guardarDatos();
            })
            .catch((error) => {
                console.error('Error durante el proceso de autenticación o guardado:', error);
            });
    }

      download() {
        // Si el usuario está autenticado, proceder a descargar las hojas seleccionadas
        this.googleSheetsService.handleAuthClick()
            .then(() => {
                console.log('Usuario autenticado, ahora se guardarán los datos.');

                // Después de autenticar, guarda los datos
                return this.guardarDatos();
            })
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
            '12. RESUMEN HUELLA DIRECTA'
          ];
          this.googleSheetsService.downloadExcel(selectedSheets)
            .then(() => {
              console.log('Descarga de hojas seleccionadas completada.');
            })
            .catch((error: any) => {
              console.error('Error al descargar las hojas seleccionadas:', error);
            });
        } else {
          console.error('El usuario no está autenticado. No se puede descargar.');
        }
      }
}

