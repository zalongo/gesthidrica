import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [],
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css'] // Corrige 'styleUrl' a 'styleUrls'
})
export class ResumenComponent {
  // Aquí puedes definir las propiedades necesarias para la tabla
  aguaSuperficialFuenteUso: string = ''; // Ejemplo de propiedad
  aguaSuperficialEnero: number = 0; // Ejemplo de propiedad
  // ... otras propiedades ...

  // Método para generar el PDF
  generaPdf() {
    const doc = new jsPDF({
      orientation: 'portrait', // o 'landscape' si prefieres
      unit: 'mm',
      format: [1050, 1485], // Ancho y alto del PDF
      putOnlyUsedFonts: true,
      floatPrecision: 16 // Precisión de punto flotante
    });

    const tableData: string[][] = []; // Declarar el tipo explícito

    // Obtener las filas de la tabla
    const rows = document.querySelectorAll('.table-responsive table tbody tr');
    rows.forEach(row => {
      const cols = row.querySelectorAll('td');
      const rowData: string[] = []; // Declarar el tipo explícito
      cols.forEach(col => {
        rowData.push(col.innerText); // Extraer el texto de cada celda
      });
      tableData.push(rowData); // Agregar la fila al array de datos
    });

    // Agregar encabezados de la tabla
    const headers = [
      'Ubicación', 'Nombre Flujo de Agua', 'Entrada Agua Potable', 'Entrada Agua Pozo',
      'Entrada Agua Superficial', 'Salida Agua Descargada', 'Salida Agua Infiltrada',
      'Agua Dulce Consumida', 'Nitrógeno Total', 'Nitrógeno Total Kjeldahl',
      'Fosfato', 'Demanda Química de Oxígeno', 'Demanda Biológica de Oxígeno',
      'Arsénico', 'Cadmio', 'Cromo', 'Cobre', 'Níquel', 'Plomo', 'Zinc',
      'Pentaclorofenol'
    ];

    // Generar la tabla en el PDF
    autoTable(doc, {
      head: [headers],
      body: tableData,
    });

    doc.save('tabla_huella_agua.pdf'); // Nombre del archivo PDF
  }
}
