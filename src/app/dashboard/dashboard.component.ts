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

  randomValues: { label: string, value: number, nuevo: string, icon: SafeHtml }[] = [];

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
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 29 }, (_, i) => `Pulso ${i + 1}`),
        datasets: [{
          label: 'Temperatura (°C)',
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
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 30 }, (_, i) => `Pulso ${i + 1}`),
        datasets: [{
          label: 'Humedad (%)',
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
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Array.from({ length: 30 }, (_, i) => `Pulso ${i + 1}`),
        datasets: [{
          label: 'Velocidad Viento (Km/h)',
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
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 30 }, (_, i) => `Pulso ${i + 1}`),
        datasets: [{
          label: 'Precipitación (mm)',
          data: [
            0.14, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00,
            0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00,
            0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00
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
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 30 }, (_, i) => `Pulso ${i + 1}`),
        datasets: [{
          label: 'Radiación UV (mW/cm²)',
          data: [
            0.14, 0.85, 0.77, 0.77, 0.77, 0.85, 1.00, 0.92, 0.85, 1.15, 1.08,
            1.08, 1.15, 1.08, 1.00, 1.00, 0.62, 0.69, 1.08, 0.92, 0.92, 0.85,
            1.00, 1.00, 0.92, 1.08, 1.08, 0.85, 0.85, 0.46
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

  createLineChart5() {
    const ctx = document.getElementById('lineChart5') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 29 }, (_, i) => `Pulso ${i + 1}`),
        datasets: [{
          label: 'Humedad Suelo (%)',
          data: [
            91.00, 80.68, 77.20, 77.67, 76.45, 74.67, 74.54, 75.18, 77.48, 66.88,
            66.78, 64.42, 64.15, 66.10, 61.48, 60.00, 60.62, 63.75, 62.22, 59.09,
            59.70, 54.63, 55.29, 55.90, 53.89, 56.05, 51.34, 52.17, 52.01
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

  createLineChart6() {
    const ctx = document.getElementById('lineChart6') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 29 }, (_, i) => `Pulso ${i + 1}`),
        datasets: [{
          label: 'Q (lt/s)',
          data: [
            0.50, 0.67, 0.71, 0.80, 0.50, 1.25, 0.50, 0.50, 3.00, 1.40, 3.00,
            0.86, 0.75, 0.40, 0.30, 0.20, 0.50, 0.83, 0.63, 0.56, 0.50, 0.40,
            0.40, 1.33, 0.30, 0.30, 0.20, 0.20, 0.10
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

  generateRandomValues() {
    const temperature = 19.35;
    const humidity = 98.35;
    const windSpeed = 4.77;
    const precipitation = 0.00;
    const uvRadiation = 0.46;
    const soilMoisture = 52.01;
    const flowQ = 0.10;
  
    this.randomValues = [
      { label: 'Temperatura', value: temperature, nuevo: '°C', icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-thermometer-half" viewBox="0 0 16 16">
          <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415"/>
          <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/>
        </svg>
      `) },
      { label: 'Humedad', value: humidity, nuevo: '%', icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moisture" viewBox="0 0 16 16">
  <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a29 29 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a29 29 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001zm0 0-.364-.343zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267"/>
</svg>
      `) },
      { label: 'Velocidad Viento', value: windSpeed, nuevo: 'Km/h', icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
  <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"/>
</svg>
      `) },
      { label: 'Precipitación', value: precipitation, nuevo: 'mm', icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-drizzle" viewBox="0 0 16 16">
  <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973M8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4 4 0 0 1 8.5 2"/>
</svg>
      `) },
      { label: 'Radiación UV', value: uvRadiation, nuevo: 'mW/cm²', icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
  <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
</svg>
      `) },
      { label: 'Humedad Suelo', value: soilMoisture, nuevo: '%', icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-fog2" viewBox="0 0 16 16">
  <path d="M8.5 4a4 4 0 0 0-3.8 2.745.5.5 0 1 1-.949-.313 5.002 5.002 0 0 1 9.654.595A3 3 0 0 1 13 13H.5a.5.5 0 0 1 0-1H13a2 2 0 0 0 .001-4h-.026a.5.5 0 0 1-.5-.445A4 4 0 0 0 8.5 4M0 8.5A.5.5 0 0 1 .5 8h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"/>
</svg>
      `) }
    ];
  }

  getRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
  exportAs(format: string, cardId: string) {
    switch (format) {
      case 'excel':
        this.exportToExcel(cardId);
        break;
      case 'csv':
        this.exportToCSV(cardId);
        break;
      case 'pdf':
        this.exportToPDF(cardId);
        break;
      default:
        console.log('Formato no soportado');
    }
  }

  exportToExcel(cardId: string) {
    const card = this.cards.find(c => c.id === cardId);

    if (card) {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.getCardData(cardId));
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, card.title);
      XLSX.writeFile(wb, `${card.title}.xlsx`);
    } else {
      console.error(`No se encontró ninguna tarjeta con el id '${cardId}'`);
    }
  }

  exportToCSV(cardId: string) {
    const card = this.cards.find(c => c.id === cardId);

    if (card) {
      const csv = Papa.unparse(this.getCardData(cardId));
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, `${card.title}.csv`);
    } else {
      console.error(`No se encontró ninguna tarjeta con el id '${cardId}'`);
    }
  }

  exportToPDF(cardId: string) {
    const card = this.cards.find(c => c.id === cardId);

    if (card) {
      const doc = new jsPDF();
      doc.text(card.title, 10, 10);
      const data = this.getCardData(cardId);
      const columns = Object.keys(data[0]);
      const rows = data.map(item => Object.values(item));

      (doc as any).autoTable({ head: [columns], body: rows });

      doc.save(`${card.title}.pdf`);
    } else {
      console.error(`No se encontró ninguna tarjeta con el id '${cardId}'`);
    }
  }

  getCardData(cardId: string): any[] {
    switch (cardId) {
      case 'barChart1':
        return [
          { Pulso: 1, Humedad: 25 }, { Pulso: 2, Humedad: 27 }, { Pulso: 3, Humedad: 29 },
          { Pulso: 4, Humedad: 31 }, { Pulso: 5, Humedad: 33 }, { Pulso: 6, Humedad: 35 },
          { Pulso: 7, Humedad: 37 }, { Pulso: 8, Humedad: 39 }, { Pulso: 9, Humedad: 41 },
          { Pulso: 10, Humedad: 43 }, { Pulso: 11, Humedad: 45 }, { Pulso: 12, Humedad: 47 },
          { Pulso: 13, Humedad: 49 }, { Pulso: 14, Humedad: 51 }, { Pulso: 15, Humedad: 53 },
          { Pulso: 16, Humedad: 55 }, { Pulso: 17, Humedad: 57 }, { Pulso: 18, Humedad: 59 },
          { Pulso: 19, Humedad: 61 }, { Pulso: 20, Humedad: 63 }, { Pulso: 21, Humedad: 65 },
          { Pulso: 22, Humedad: 67 }, { Pulso: 23, Humedad: 69 }, { Pulso: 24, Humedad: 71 },
          { Pulso: 25, Humedad: 73 }, { Pulso: 26, Humedad: 75 }, { Pulso: 27, Humedad: 77 },
          { Pulso: 28, Humedad: 79 }, { Pulso: 29, Humedad: 81 }, { Pulso: 30, Humedad: 83 }
        ];
      case 'barChart2':
        return [
          { Pulso: 1, Volumen: 0.5 }, { Pulso: 2, Volumen: 0.4 }, { Pulso: 3, Volumen: 0.5 },
          { Pulso: 4, Volumen: 0.4 }, { Pulso: 5, Volumen: 0.5 }, { Pulso: 6, Volumen: 0.5 },
          { Pulso: 7, Volumen: 0.5 }, { Pulso: 8, Volumen: 0.5 }, { Pulso: 9, Volumen: 0.6 },
          { Pulso: 10, Volumen: 0.7 }, { Pulso: 11, Volumen: 0.6 }, { Pulso: 12, Volumen: 0.6 },
          { Pulso: 13, Volumen: 0.6 }, { Pulso: 14, Volumen: 0.4 }, { Pulso: 15, Volumen: 0.3 },
          { Pulso: 16, Volumen: 0.2 }, { Pulso: 17, Volumen: 0.5 }, { Pulso: 18, Volumen: 0.5 },
          { Pulso: 19, Volumen: 0.5 }, { Pulso: 20, Volumen: 0.5 }, { Pulso: 21, Volumen: 0.5 },
          { Pulso: 22, Volumen: 0.4 }, { Pulso: 23, Volumen: 0.4 }, { Pulso: 24, Volumen: 0.4 },
          { Pulso: 25, Volumen: 0.3 }, { Pulso: 26, Volumen: 0.3 }, { Pulso: 27, Volumen: 0.2 },
          { Pulso: 28, Volumen: 0.2 }, { Pulso: 29, Volumen: 0.1 }, { Pulso: 30, Volumen: 0 }
        ];
      case 'lineChart1':
        return [
          { Pulso: 1, Temperatura: 14 }, { Pulso: 2, Temperatura: 13 }, { Pulso: 3, Temperatura: 16 },
          { Pulso: 4, Temperatura: 12 }, { Pulso: 5, Temperatura: 13 }, { Pulso: 6, Temperatura: 12.7 },
          { Pulso: 7, Temperatura: 12.4 }, { Pulso: 8, Temperatura: 12.1 }, { Pulso: 9, Temperatura: 11.8 },
          { Pulso: 10, Temperatura: 11.5 }, { Pulso: 11, Temperatura: 11.2 }, { Pulso: 12, Temperatura: 10.9 },
          { Pulso: 13, Temperatura: 10.6 }, { Pulso: 14, Temperatura: 10.3 }, { Pulso: 15, Temperatura: 10 },
          { Pulso: 16, Temperatura: 9.7 }, { Pulso: 17, Temperatura: 9.4 }, { Pulso: 18, Temperatura: 9.1 },
          { Pulso: 19, Temperatura: 8.8 }, { Pulso: 20, Temperatura: 8.5 }, { Pulso: 21, Temperatura: 8.2 },
          { Pulso: 22, Temperatura: 7.9 }, { Pulso: 23, Temperatura: 7.6 }, { Pulso: 24, Temperatura: 7.3 },
          { Pulso: 25, Temperatura: 7 }, { Pulso: 26, Temperatura: 6.7 }, { Pulso: 27, Temperatura: 6.4 },
          { Pulso: 28, Temperatura: 6.1 }, { Pulso: 29, Temperatura: 5.8 }, { Pulso: 30, Temperatura: 5.5 }
        ];
      case 'lineChart2':
        return [
          { Pulso: 1, Q: 0.5 }, { Pulso: 2, Q: 0.67 }, { Pulso: 3, Q: 0.71 },
          { Pulso: 4, Q: 0.8 }, { Pulso: 5, Q: 0.5 }, { Pulso: 6, Q: 1.25 },
          { Pulso: 7, Q: 0.5 }, { Pulso: 8, Q: 0.5 }, { Pulso: 9, Q: 3 },
          { Pulso: 10, Q: 1.4 }, { Pulso: 11, Q: 3 }, { Pulso: 12, Q: 0.86 },
          { Pulso: 13, Q: 0.75 }, { Pulso: 14, Q: 0.4 }, { Pulso: 15, Q: 0.3 },
          { Pulso: 16, Q: 0.2 }, { Pulso: 17, Q: 0.5 }, { Pulso: 18, Q: 0.83 },
          { Pulso: 19, Q: 0.63 }, { Pulso: 20, Q: 0.56 }, { Pulso: 21, Q: 0.5 },
          { Pulso: 22, Q: 0.4 }, { Pulso: 23, Q: 0.4 }, { Pulso: 24, Q: 1.33 },
          { Pulso: 25, Q: 0.3 }, { Pulso: 26, Q: 0.3 }, { Pulso: 27, Q: 0.2 },
          { Pulso: 28, Q: 0.2 }, { Pulso: 29, Q: 0.1 }, { Pulso: 30, Q: 0 }
        ];
      case 'barChart3':
        return [
          { Pulso: 1, Tiempo: 1 }, { Pulso: 2, Tiempo: 0.6 }, { Pulso: 3, Tiempo: 0.7 },
          { Pulso: 4, Tiempo: 0.5 }, { Pulso: 5, Tiempo: 1 }, { Pulso: 6, Tiempo: 0.4 },
          { Pulso: 7, Tiempo: 1 }, { Pulso: 8, Tiempo: 1 }, { Pulso: 9, Tiempo: 0.2 },
          { Pulso: 10, Tiempo: 0.5 }, { Pulso: 11, Tiempo: 0.2 }, { Pulso: 12, Tiempo: 0.7 },
          { Pulso: 13, Tiempo: 0.8 }, { Pulso: 14, Tiempo: 1 }, { Pulso: 15, Tiempo: 1 },
          { Pulso: 16, Tiempo: 1 }, { Pulso: 17, Tiempo: 1 }, { Pulso: 18, Tiempo: 0.6 },
          { Pulso: 19, Tiempo: 0.8 }, { Pulso: 20, Tiempo: 0.9 }, { Pulso: 21, Tiempo: 1 },
          { Pulso: 22, Tiempo: 1 }, { Pulso: 23, Tiempo: 1 }, { Pulso: 24, Tiempo: 0.3 },
          { Pulso: 25, Tiempo: 1 }, { Pulso: 26, Tiempo: 1 }, { Pulso: 27, Tiempo: 1 },
          { Pulso: 28, Tiempo: 1 }, { Pulso: 29, Tiempo: 1 }, { Pulso: 30, Tiempo: 1 }
        ];
      case 'randomValues':
        return this.randomValues.map(value => ({ Label: value.label, Value: value.value }));
      default:
        return [];
    }
  }
}
