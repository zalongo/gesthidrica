import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { GoogleSheetsService } from '../services/google-sheets.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
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
    { id: 'lineChart1', title: 'Temperatura' },
    { id: 'lineChart2', title: 'Humedad' },
    { id: 'barChart1', title: 'Velocidad Viento' },
    { id: 'lineChart3', title: 'Precipitación' },
    { id: 'lineChart4', title: 'Radiación UV' },
    { id: 'lineChart5', title: 'Humedad Suelo' },
    { id: 'lineChart6', title: 'Caudal Q' }
  ];

  charts: { [key: string]: Chart } = {};

  constructor(private googleSheetsService: GoogleSheetsService,private sanitizer: DomSanitizer) {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.initializeCharts();
    this.loadGoogleSheetsData();
        this.generateRandomValues();

  }

  initializeCharts() {
    this.createLineChart1();
    this.createLineChart2();
    this.createBarChart1();
    this.createLineChart3();
    this.createLineChart4();
    this.createLineChart5();
    this.createLineChart6();

  }

  randomValues: { label: string, value: number, nuevo: string, icon: SafeHtml }[] = [];


  async loadGoogleSheetsData() {
    this.googleSheetsService.authStatus.subscribe(async (authenticated) => {
      if (authenticated) {
        const sheetId = '1f1j-yBgvjxgeeIb6cDCrd3ucaV1cejKjsKkzs_B99BM';
        const range = 'Mod_1!A:D';
        const records = await this.googleSheetsService.getRecords(sheetId, range);

        if (records.length > 0) {
          this.updateChartsWithGoogleSheetsData(records);
        }
      } else {
        this.googleSheetsService.handleAuthClick();
      }
    });
  }

  updateChartsWithGoogleSheetsData(records: any[]) {
    const lastRecords = records.slice(-30); // Get the last 10 records
    const labels = lastRecords.map(record => record[0]);
    const temperatureData = lastRecords.map(record => parseFloat(record[1].replace(',', '.')));
    const humidityData = lastRecords.map(record => parseFloat(record[2].replace(',', '.')));
    const windSpeedData = lastRecords.map(record => parseFloat(record[3].replace(',', '.')));

    this.updateChart(this.charts['lineChart1'], labels, temperatureData, '°C');
    this.updateChart(this.charts['lineChart2'], labels, humidityData, '%');
    this.updateChart(this.charts['barChart1'], labels, windSpeedData, 'Km/h');
  }

  updateChart(chart: Chart, labels: string[], data: number[], label: string) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.data.datasets[0].label = label;
    chart.update();
  }

  createLineChart1() {
    const ctx = document.getElementById('lineChart1') as HTMLCanvasElement;
    this.charts['lineChart1'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: '°C',
          data: [],
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
        labels: [],
        datasets: [{
          label: '%',
          data: [],
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
        labels: [],
        datasets: [{
          label: 'Km/h',
          data: [],
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
        labels: [],
        datasets: [{
          label: 'mm',
          data: [],
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
        labels: [],
        datasets: [{
          label: 'mW/cm²',
          data: [],
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
        labels: [],
        datasets: [{
          label: '%',
          data: [],
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
        labels: [],
        datasets: [{
          label: 'm³/s',
          data: [],
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
      {
        label: 'Temperatura', value: temperature, nuevo: '°C', icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-thermometer-half" viewBox="0 0 16 16">
          <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415"/>
          <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/>
        </svg>
      `)
      },
      {
        label: 'Humedad', value: humidity, nuevo: '%', icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moisture" viewBox="0 0 16 16">
  <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a29 29 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a29 29 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001zm0 0-.364-.343zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267"/>
</svg>
      `)
      },
      {
        label: 'Velocidad Viento', value: windSpeed, nuevo: 'Km/h', icon: this.sanitizer.bypassSecurityTrustHtml(`
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
  <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"/>
</svg>
      `)
      },
      {
        label: 'Variable 1', value:0, nuevo:'',icon:''
      },
      {
        label: 'Variable 2', value:3, nuevo:'',icon:''
      },
      
    ];
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
    const labels = chart.data.labels || [];

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
    const labels = chart.data.labels || [];

    const exportData = labels.map((label, index) => ({
      Label: label || `Label ${index + 1}`,
      Value: data[index],
      Unidad: chart.data.datasets[0].label
    }));

    const csvHeaders = 'Label,Value,Unidad\n';
    const csvRows = exportData.map(item => `${item.Label},${item.Value},${item.Unidad}`).join('\n');
    const csv = csvHeaders + csvRows;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'datos.csv');
  }

  exportToPDF(id: string) {
    const chart = this.charts[id];
    const data = chart.data.datasets[0].data;
    const labels = chart.data.labels || [];

    const exportData = labels.map((label, index) => [label || `Label ${index + 1}`, data[index], chart.data.datasets[0].label]);

    const doc = new jsPDF();

    const headers = [['Etiqueta', 'Valor', 'Medida']];

    (doc as any).autoTable({
      head: headers,
      body: exportData,
      startY: 10,
      styles: { halign: 'center' },
      headStyles: { fillColor: [22, 160, 133] }
    });

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
