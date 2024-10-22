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
    nitrogenoEnero: number = 0;
    nitrogenoFebrero: number = 0;
    nitrogenoMarzo: number = 0;
    nitrogenoAbril: number = 0;
    nitrogenoMayo: number = 0;
    nitrogenoJunio: number = 0;
    nitrogenoJulio: number = 0;
    nitrogenoAgosto: number = 0;
    nitrogenoSeptiembre: number = 0;
    nitrogenoOctubre: number = 0;
    nitrogenoNoviembre: number = 0;
    nitrogenoDiciembre: number = 0;
    //DatosUltimaPagF2
    nitrogenoKjeldahlEnero: number = 0;
    nitrogenoKjeldahlFebrero: number = 0;
    nitrogenoKjeldahlMarzo: number = 0;
    nitrogenoKjeldahlAbril: number = 0;
    nitrogenoKjeldahlMayo: number = 0;
    nitrogenoKjeldahlJunio: number = 0;
    nitrogenoKjeldahlJulio: number = 0;
    nitrogenoKjeldahlAgosto: number = 0;
    nitrogenoKjeldahlSeptiembre: number = 0;
    nitrogenoKjeldahlOctubre: number = 0;
    nitrogenoKjeldahlNoviembre: number = 0;
    nitrogenoKjeldahlDiciembre: number = 0;
    //DatosUltimaPagF3
    fosforoTotalEnero: number = 0;
    fosforoTotalFebrero: number = 0;
    fosforoTotalMarzo: number = 0;
    fosforoTotalAbril: number = 0;
    fosforoTotalMayo: number = 0;
    fosforoTotalJunio: number = 0;
    fosforoTotalJulio: number = 0;
    fosforoTotalAgosto: number = 0;
    fosforoTotalSeptiembre: number = 0;
    fosforoTotalOctubre: number = 0;
    fosforoTotalNoviembre: number = 0;
    fosforoTotalDiciembre: number = 0;
    //DatosUltimaPagF4
    fosfatoEnero: number = 0;
    fosfatoFebrero: number = 0;
    fosfatoMarzo: number = 0;
    fosfatoAbril: number = 0;
    fosfatoMayo: number = 0;
    fosfatoJunio: number = 0;
    fosfatoJulio: number = 0;
    fosfatoAgosto: number = 0;
    fosfatoSeptiembre: number = 0;
    fosfatoOctubre: number = 0;
    fosfatoNoviembre: number = 0;
    fosfatoDiciembre: number = 0;
    //DatosUltimaPagF5
    dqoEnero: number = 0;
    dqoFebrero: number = 0;
    dqoMarzo: number = 0;
    dqoAbril: number = 0;
    dqoMayo: number = 0;
    dqoJunio: number = 0;
    dqoJulio: number = 0;
    dqoAgosto: number = 0;
    dqoSeptiembre: number = 0;
    dqoOctubre: number = 0;
    dqoNoviembre: number = 0;
    dqoDiciembre: number = 0;
    //DatosUltimaPagF6
    dboEnero: number = 0;
    dboFebrero: number = 0;
    dboMarzo: number = 0;
    dboAbril: number = 0;
    dboMayo: number = 0;
    dboJunio: number = 0;
    dboJulio: number = 0;
    dboAgosto: number = 0;
    dboSeptiembre: number = 0;
    dboOctubre: number = 0;
    dboNoviembre: number = 0;
    dboDiciembre: number = 0;
    //DatosUltimaPagF7
    arsenicoEnero: number = 0;
    arsenicoFebrero: number = 0;
    arsenicoMarzo: number = 0;
    arsenicoAbril: number = 0;
    arsenicoMayo: number = 0;
    arsenicoJunio: number = 0;
    arsenicoJulio: number = 0;
    arsenicoAgosto: number = 0;
    arsenicoSeptiembre: number = 0;
    arsenicoOctubre: number = 0;
    arsenicoNoviembre: number = 0;
    arsenicoDiciembre: number = 0;
    //DatosUltimaPagF8
    cadmioEnero: number = 0;
    cadmioFebrero: number = 0;
    cadmioMarzo: number = 0;
    cadmioAbril: number = 0;
    cadmioMayo: number = 0;
    cadmioJunio: number = 0;
    cadmioJulio: number = 0;
    cadmioAgosto: number = 0;
    cadmioSeptiembre: number = 0;
    cadmioOctubre: number = 0;
    cadmioNoviembre: number = 0;
    cadmioDiciembre: number = 0;
    //DatosUltimaPagF9
    cromoEnero: number = 0;
    cromoFebrero: number = 0;
    cromoMarzo: number = 0;
    cromoAbril: number = 0;
    cromoMayo: number = 0;
    cromoJunio: number = 0;
    cromoJulio: number = 0;
    cromoAgosto: number = 0;
    cromoSeptiembre: number = 0;
    cromoOctubre: number = 0;
    cromoNoviembre: number = 0;
    cromoDiciembre: number = 0;
    //DatosUltimaPagF10
    cobreEnero: number = 0;
    cobreFebrero: number = 0;
    cobreMarzo: number = 0;
    cobreAbril: number = 0;
    cobreMayo: number = 0;
    cobreJunio: number = 0;
    cobreJulio: number = 0;
    cobreAgosto: number = 0;
    cobreSeptiembre: number = 0;
    cobreOctubre: number = 0;
    cobreNoviembre: number = 0;
    cobreDiciembre: number = 0;
    //DatosUltimaPagF11
    mercurioEnero: number = 0;
    mercurioFebrero: number = 0;
    mercurioMarzo: number = 0;
    mercurioAbril: number = 0;
    mercurioMayo: number = 0;
    mercurioJunio: number = 0;
    mercurioJulio: number = 0;
    mercurioAgosto: number = 0;
    mercurioSeptiembre: number = 0;
    mercurioOctubre: number = 0;
    mercurioNoviembre: number = 0;
    mercurioDiciembre: number = 0;
    //DatosUltimaPagF12
    niquelEnero: number = 0;
    niquelFebrero: number = 0;
    niquelMarzo: number = 0;
    niquelAbril: number = 0;
    niquelMayo: number = 0;
    niquelJunio: number = 0;
    niquelJulio: number = 0;
    niquelAgosto: number = 0;
    niquelSeptiembre: number = 0;
    niquelOctubre: number = 0;
    niquelNoviembre: number = 0;
    niquelDiciembre: number = 0;
    //DatosUltimaPagF13
    plomoEnero: number = 0;
    plomoFebrero: number = 0;
    plomoMarzo: number = 0;
    plomoAbril: number = 0;
    plomoMayo: number = 0;
    plomoJunio: number = 0;
    plomoJulio: number = 0;
    plomoAgosto: number = 0;
    plomoSeptiembre: number = 0;
    plomoOctubre: number = 0;
    plomoNoviembre: number = 0;
    plomoDiciembre: number = 0;
    //DatosUltimaPagF14
    zincEnero: number = 0;
    zincFebrero: number = 0;
    zincMarzo: number = 0;
    zincAbril: number = 0;
    zincMayo: number = 0;
    zincJunio: number = 0;
    zincJulio: number = 0;
    zincAgosto: number = 0;
    zincSeptiembre: number = 0;
    zincOctubre: number = 0;
    zincNoviembre: number = 0;
    zincDiciembre: number = 0;
    //DatosUltimaPagF15
    pentaclorofenolEnero: number = 0;
    pentaclorofenolFebrero: number = 0;
    pentaclorofenolMarzo: number = 0;
    pentaclorofenolAbril: number = 0;
    pentaclorofenolMayo: number = 0;
    pentaclorofenolJunio: number = 0;
    pentaclorofenolJulio: number = 0;
    pentaclorofenolAgosto: number = 0;
    pentaclorofenolSeptiembre: number = 0;
    pentaclorofenolOctubre: number = 0;
    pentaclorofenolNoviembre: number = 0;
    pentaclorofenolDiciembre: number = 0;
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

