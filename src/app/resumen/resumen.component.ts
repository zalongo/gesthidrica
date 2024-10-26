import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  data: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Acceder a los datos pasados
    this.data = history.state.data; // Obtener 'data' del estado de la navegación
    console.log(this.data); // Verificar que los datos se recibieron correctamente
  }

  generaPdf() {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [1050, 1485],
      putOnlyUsedFonts: true,
      floatPrecision: 16
    });

    const tableData: string[][] = [];

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

    doc.save('tabla_huella_agua.pdf');
  }
}
