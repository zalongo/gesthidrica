import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { GoogleSheetsService } from '../services/google-sheets.service';
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

  constructor(private googleSheetsService: GoogleSheetsService) {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.initializeCharts();
    this.loadGoogleSheetsData();
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
