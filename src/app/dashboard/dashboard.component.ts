import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  cards = [
    { id: 'randomValues', title: 'Últimos Valores' },
    { id: 'lineChart1', title: 'Temperatura' },
    { id: 'lineChart2', title: 'Humedad' },
    { id: 'barChart1', title: 'Velocidad Viento' },
    { id: 'lineChart3', title: 'Precipitación' },
    { id: 'lineChart4', title: 'Radiación UV' },
    { id: 'lineChart5', title: 'Humedad Suelo' },
    { id: 'lineChart6', title: 'Caudal Q' }
  ];

  randomValues: { label: string, value: number, medida: string, icon: SafeHtml }[] = [];
  charts: { [key: string]: Chart } = {};

  

  constructor(private sanitizer: DomSanitizer) {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.createLineChart1();
    this.createLineChart2();
    this.createBarChart1();
    this.createLineChart3();
    this.createLineChart4();
    this.createLineChart5();
    this.createLineChart6();
    this.generateRandomValues();
  }

  createLineChart1() {
    const ctx = document.getElementById('lineChart1') as HTMLCanvasElement;
    this.charts['lineChart1'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 29 }, (_, i) => `Pulso ${i + 1}`),
        datasets: [{
          label: '°C',
          data: [
            21.81, 16.06, 16.20, 16.32, 16.20, 15.63, 15.85, 15.92, 17.04, 17.56,
            17.23, 18.13, 17.83, 18.51, 18.03, 18.62, 18.16, 17.87, 18.41, 19.17,
            19.35, 18.24, 19.39, 19.02, 19.23, 19.34, 20.35, 20.69, 19.35
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createLineChart2() {
    const ctx = document.getElementById('lineChart2') as HTMLCanvasElement;
    this.charts['lineChart2'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 30 }, (_, i) => `Pulso ${i + 1}`),
        datasets: [{
          label: '%',
          data: [
            91.00, 80.68, 77.20, 77.67, 76.45, 74.67, 74.54, 75.18, 77.48, 66.88,
            66.78, 64.42, 64.15, 66.10, 61.48, 60.00, 60.62, 63.75, 62.22, 59.09,
            59.70, 54.63, 55.29, 55.90, 53.89, 56.05, 51.34, 52.17, 52.01, 98.35
          ],
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createBarChart1() {
    const ctx = document.getElementById('barChart1') as HTMLCanvasElement;
    this.charts['barChart1'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Array.from({ length: 30 }, (_, i) => `Pulso ${i + 1}`),
        datasets: [{
          label: 'Km/h',
          data: [
            2.39, 4.77, 0.00, 0.00, 2.39, 2.39, 0.00, 4.77, 7.16, 2.39, 4.77,
            9.55, 7.16, 2.39, 7.16, 4.77, 4.77, 2.39, 0.00, 2.39, 0.00, 7.16,
            2.39, 2.39, 11.94, 9.55, 4.77, 7.16, 2.39, 4.77
          ],
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createLineChart3() {
    const ctx = document.getElementById('lineChart3') as HTMLCanvasElement;
    this.charts['lineChart3'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 30 }, (_, i) => `Pulso ${i + 1}`),
        datasets: [{
          label: 'mm',
          data: [
            0.14, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00,
            0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00,
            0.00, 0.00, 0.00, 0.00, 0.00, 0.00
          ],
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createLineChart4() {
    const ctx = document.getElementById('lineChart4') as HTMLCanvasElement;
    this.charts['lineChart4'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 30 }, (_, i) => `Pulso ${i + 1}`),
        datasets: [{
          label: 'mW/cm²',
          data: [
            1.77, 3.56, 3.57, 3.56, 2.36, 3.56, 3.56, 3.57, 3.56, 3.56, 3.57,
            2.36, 3.57, 2.37, 2.36, 3.56, 2.36, 2.37, 3.56, 2.37, 2.36, 3.56,
            2.37, 2.36, 3.57, 2.36, 3.56, 2.36, 2.37, 2.36
          ],
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createLineChart5() {
    const ctx = document.getElementById('lineChart5') as HTMLCanvasElement;
    this.charts['lineChart5'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 30 }, (_, i) => `Pulso ${i + 1}`),
        datasets: [{
          label: '%',
          data: [
            1.77, 3.56, 3.57, 3.56, 2.36, 3.56, 3.56, 3.57, 3.56, 3.56, 3.57,
            2.36, 3.57, 2.37, 2.36, 3.56, 2.36, 2.37, 3.56, 2.37, 2.36, 3.56,
            2.37, 2.36, 3.57, 2.36, 3.56, 2.36, 2.37, 2.36
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createLineChart6() {
    const ctx = document.getElementById('lineChart6') as HTMLCanvasElement;
    this.charts['lineChart6'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 30 }, (_, i) => `Pulso ${i + 1}`),
        datasets: [{
          label: 'm³/s',
          data: [
            1.77, 3.56, 3.57, 3.56, 2.36, 3.56, 3.56, 3.57, 3.56, 3.56, 3.57,
            2.36, 3.57, 2.37, 2.36, 3.56, 2.36, 2.37, 3.56, 2.37, 2.36, 3.56,
            2.37, 2.36, 3.57, 2.36, 3.56, 2.36, 2.37, 2.36
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  generateRandomValues() {
    const temperature = 19.35;
    const humidity = 98.35;
    const windSpeed = 4.77;
    const precipitation = 0.00;
    const uvRadiation = 0.46;
    const soilMoisture = 52.01;
    const flowQ = 0.10;
  
    this.randomValues = [
      { label: 'Temperatura', value: temperature, medida: '°C', icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-thermometer-half" viewBox="0 0 16 16">
          <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415"/>
          <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/>
        </svg>
      `) },
      { label: 'Humedad', value: humidity, medida: '%', icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moisture" viewBox="0 0 16 16">
  <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a29 29 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a29 29 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001zm0 0-.364-.343zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267"/>
</svg>
      `) },
      { label: 'Velocidad Viento', value: windSpeed, medida: 'Km/h', icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
  <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"/>
</svg>
      `) },
      { label: 'Precipitación', value: precipitation, medida: 'mm', icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-drizzle" viewBox="0 0 16 16">
  <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973M8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4 4 0 0 1 8.5 2"/>
</svg>
      `) },
      { label: 'Radiación UV', value: uvRadiation, medida: 'mW/cm²', icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
  <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
</svg>
      `) },
      { label: 'Humedad Suelo', value: soilMoisture, medida: '%', icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-fog2" viewBox="0 0 16 16">
  <path d="M8.5 4a4 4 0 0 0-3.8 2.745.5.5 0 1 1-.949-.313 5.002 5.002 0 0 1 9.654.595A3 3 0 0 1 13 13H.5a.5.5 0 0 1 0-1H13a2 2 0 0 0 .001-4h-.026a.5.5 0 0 1-.5-.445A4 4 0 0 0 8.5 4M0 8.5A.5.5 0 0 1 .5 8h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"/>
</svg>
      `) }
    ];
  }


  randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getIcon(iconClass: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(`<i class="${iconClass}"></i>`);
  }

  exportAs(type: string, id: string) {
    switch (type) {
      case 'excel':
        this.exportToExcel(id);
        break;
      case 'csv':
        this.exportToCSV(id);
        break;
      case 'pdf':
        this.exportToPDF(id);
        break;
      default:
        console.error('Tipo de exportación no soportado');
    }
  }

  exportToExcel(id: string) {
    const chart = this.charts[id];
    const data = chart.data.datasets[0].data;
    const labels = chart.data.labels || []; // Asignar un array vacío si labels es undefined
  
    const exportData = labels.map((label, index) => ({
      Label: label || `Label ${index + 1}`,
      Value: data[index],
      Unidad: chart.data.datasets[0].label
    }));
  
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'datos.xlsx');
  }
  
  exportToCSV(id: string) {
    const chart = this.charts[id];
    const data = chart.data.datasets[0].data;
    const labels = chart.data.labels || []; // Asignar un array vacío si labels es undefined
  
    const exportData = labels.map((label, index) => ({
      Label: label || `Label ${index + 1}`,
      Value: data[index],
      Unidad: chart.data.datasets[0].label
    }));
  
    // Formatear los datos como una cadena CSV
    const csvHeaders = 'Label,Value,Unidad\n';
    const csvRows = exportData.map(item => `${item.Label},${item.Value},${item.Unidad}`).join('\n');
    const csv = csvHeaders + csvRows;
  
    // Crear y guardar el archivo CSV
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'datos.csv');
  }
  

  exportToPDF(id: string) {
    const chart = this.charts[id];
    const data = chart.data.datasets[0].data;
    const labels = chart.data.labels || []; // Asignar un array vacío si labels es undefined
  
    const exportData = labels.map((label, index) => [label || `Label ${index + 1}`, data[index], chart.data.datasets[0].label]);
  
    const doc = new jsPDF();
  
    // Encabezados de la tabla
    const headers = [['Etiqueta', 'Valor', 'Medida']];
  
    // Creación de la tabla
    (doc as any).autoTable({
      head: headers,
      body: exportData,
      startY: 10,
      styles: { halign: 'center' },  // Alineación horizontal
      headStyles: { fillColor: [22, 160, 133] }  // Color de fondo del encabezado
    });
  
    // Guardar el PDF
    doc.save('datos.pdf');
  }
  

  getChartData(id: string) {
    const chart = this.charts[id];
    if (!chart) return [];

    const labels = chart.data.labels || [];
    const data = chart.data.datasets[0].data || [];

    return labels.map((label: any, index: number) => ({
      label,
      value: data[index]
    }));
  }
}
