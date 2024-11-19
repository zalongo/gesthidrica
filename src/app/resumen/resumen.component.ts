import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
// import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css'],
})
export class ResumenComponent implements OnInit {
  @ViewChild('resumen', { static: false }) pdfContent!: ElementRef;

  data: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Acceder a los datos pasados
    this.data = history.state.data; // Obtener 'data' del estado de la navegación
    console.log(this.data); // Verificar que los datos se recibieron correctamente
  }

  generaPdf() {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [300, 1500], // Tamaño personalizado: 210 mm de alto por 2970 mm de ancho
      putOnlyUsedFonts: true,
      floatPrecision: 16,
    });

    const resumen = this.pdfContent.nativeElement;

    doc.setFontSize(22);
    doc.text('HUELLA DE AGUA DIRECTA', 10, 20); // Ajusta la posición del título según sea necesario

    html2canvas(resumen).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 1485; // Ancho de la imagen en el PDF
      const pageHeight = 300; // Altura de la página en el PDF
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 30;

      // Agrega la imagen al PDF
      doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Si la imagen es más alta que una página, agrega páginas adicionales
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      doc.save('tabla_huella_agua.pdf');
      console.log('guarda');
      // Guarda el PDF
    });

    /* const tableData: string[][] = [];

    const rows = document.querySelectorAll('.tabla-inventario table tbody tr');
    rows.forEach(row => {
      const cols = row.querySelectorAll('td');
      const rowData: string[] = [];
      cols.forEach(col => {
        rowData.push(col.innerText);
      });
      tableData.push(rowData);
    });

    const tipo = [
      { content: "HUELLA DE AGUA DIRECTA", colSpan: 2, rowSpan: 2 },
      { content: "INVENTARIO", colSpan: 19 },
      { content: "PUNTO MEDIO", colSpan: 4 },
      { content: "PUNTO FINAL", colSpan: 6 }
    ];
    const headers = [
      // INNVENATRIO
      'Entrada Agua Potable', 'Entrada Agua Pozo', 'Entrada Agua Superficial',
      'Salida Agua Descargada', 'Salida Agua Infiltrada', 'Agua Dulce Consumida',
      'Nitrógeno Total', 'Nitrógeno Total Kjeldahl', 'Fosfato', 'Demanda Química de Oxígeno',
      'Demanda Biológica de Oxígeno', 'Arsénico', 'Cadmio', 'Cromo', 'Cobre',
      'Níquel', 'Plomo', 'Zinc', 'Pentaclorofenol',

      // PUNTO MEDIO
      'Available WAter REmaining_AWARE 100', 'TOXICIDAD HUMANA_TOTAL',
      'ECOTOXICIDAD DE AGUA DULCE', ' EUTROFIZACIÓN DE AGUA DULCE ',

      //PUNTO FINAL
      'POTENCIALES IMPACTOS A LA SALUD HUMANA POR ESCASEZ DE AGUA DULCE', 'ENFERMEDADES CAUSADAS POR TOXICIDAD DE AGUA DULCE',
      'DISMINUCIÓN DE LA BIODIVERSIDAD TERRESTRE DEBIDO AL CONSUMO DE AGUA DULCE', 'DISMINUCIÓN DE LA BIODIVERSIDAD DE PLANTAS TERRESTRES DEBIDO A LA EXTRACCIÓN DE AGUA SUBTERRÁNEA',
      'ECOSISTEMAS ACUÁTICOS AFECTADOS POR ECOTOXICIDAD DE AGUA DULCE', ' ECOSISTEMAS ACUÁTICOS AFECTADOS POR EUTROFIZACIÓN DE AGUA DULCE'

    ];
    const units = [
      'Ubicación', 'Nombre fllujo de agua',
      //INVENTARIO
      '[m3/UF]', '[m3/UF]', '[m3/UF]', '[m3/UF]', '[m3/UF]',
      '[kg N/UF]', '[kg NKT/UF]', '[kg P/UF]', '[kg PO4/UF]',
      '[kg DQO/UF]', '[kg DBO/UF]', '[kg As/UF]', '[kg Cd/UF]',
      '[kg Cr/UF]', '[kg Cu/UF]', '[kg Hg/UF]', '[kg Ni/UF]',
      '[kg Pb/UF]', '[kg Zn/UF]', '[kg C6OHCL5/UF]',
      // PUNTO MEDIO
      '[m3 eq. global/UF]', '[CTUh/UF] ', "'[CTUe/UF] ", '[kg Peq/UF] ',
      //PUNTO FINAL
      '[DALY/UF]', '[DALY/UF]', '[PDF*m2*año/UF]', '[PDF*m2*año/UF]', '[PDF*m2*año/UF]', '[PDF*m2*año/UF]'
    ];

    const tfootData = [
      [{ content: "TOTALES", colSpan: 2 }, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    autoTable(doc, {
      head: [tipo, headers, units],
      body: tableData,
      foot: tfootData, // Agregar el tfoot
      styles: {
        halign: 'center',
        lineColor: [0, 0, 0],  // Color negro para los bordes de las celdas
        lineWidth: 0.2         // Grosor de los bordes de las celdas
      }
    });

    doc.save('tabla_huella_agua.pdf'); */
  }
}
