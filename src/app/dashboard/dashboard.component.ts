import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables, Title } from 'chart.js';
import { GoogleSheetsService } from '../services/google-sheets.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  cards = [
    { id: 'lineChart1', title: 'Temperatura', visible: true },
    { id: 'lineChart2', title: 'Humedad Suelo', visible: true },
    { id: 'barChart1', title: 'Velocidad Viento', visible: true },
    { id: 'lineChart3', title: 'Precipitación', visible: false },
    { id: 'lineChart4', title: 'Radiación UV', visible: false }, 
    { id: 'lineChart5', title: 'Bateria', visible: true },
    { id: 'lineChart6', title: 'Caudal Q', visible: false },
    { id: 'ultimosValores', title: 'Ultimos Valores', visible: true }
  ];
  
  charts: { [key: string]: Chart } = {};

  activeIndex: number | null = null;

  toggleAccordion(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }


  constructor(private googleSheetsService: GoogleSheetsService, private sanitizer: DomSanitizer) {
    Chart.register(...registerables);
  }
  ultimosValoresData: { label: string, value: number, unit: string }[] = [];


  ngAfterViewInit() {
    this.generateRandomValues();
    this.initializeCharts();
    this.loadGoogleSheetsData();
    this.initializeUltimosValoresData();
  }

  initializeCharts() {
    this.cards.forEach(card => {
      if (card.visible) {
        switch (card.id) {
          case 'lineChart1': this.createLineChart1(); break;
          case 'lineChart2': this.createLineChart2(); break;
          case 'barChart1': this.createBarChart1(); break;
          case 'lineChart3': this.createLineChart3(); break;
          case 'lineChart4': this.createLineChart4(); break;
          case 'lineChart5': this.createLineChart5(); break;
          case 'lineChart6': this.createLineChart6(); break;
        }
      }
    });
  }

  randomValues: { label: string, value: number, nuevo: string, icon: SafeHtml }[] = [];


  async loadGoogleSheetsData() {
    this.googleSheetsService.authStatus.subscribe(async (authenticated) => {
      if (authenticated) {
        const sheetId = '1f1j-yBgvjxgeeIb6cDCrd3ucaV1cejKjsKkzs_B99BM';
        const range = 'Humedad';
        const records = await this.googleSheetsService.getRecords(sheetId, range);

        if (records.length > 0) {
          this.updateChartsWithGoogleSheetsData(records);
        }
      } else {
        this.googleSheetsService.handleAuthClick();
      }
    });
  }

  initializeUltimosValoresData() {
    this.ultimosValoresData = [
      { label: 'Temperatura', value: 19.35, unit: '°C' },
      { label: 'Humedad', value: 98.35, unit: '%' },
      { label: 'Velocidad Viento', value: 4.77, unit: 'Km/h' },
      { label: 'Precipitación', value: 0.00, unit: 'mm' },
      { label: 'Radiación UV', value: 0.46, unit: 'mW/cm²' },
      { label: 'Humedad Suelo', value: 52.01, unit: '%' },
      { label: 'Caudal Q', value: 0.10, unit: 'm³/s' }
    ];
  }

  updateChartsWithGoogleSheetsData(records: any[]) {
    const lastRecords = records.slice(-30);
    const labels = lastRecords.map(record => record[0]);
    const temperatureData = lastRecords.map(record => parseFloat(record[1].replace(',', '.')));
    const humidityData = lastRecords.map(record => parseFloat(record[2].replace(',', '.')));
    const windSpeedData = lastRecords.map(record => parseFloat(record[3].replace(',', '.')));

    this.updateChart(this.charts['lineChart1'], labels, temperatureData, '°C');
    this.updateChart(this.charts['lineChart2'], labels, humidityData, '%');
    this.updateChart(this.charts['barChart1'], labels, windSpeedData, 'Km/h');

    this.updateUltimosValoresData('Temperatura', temperatureData[temperatureData.length - 1], '°C');
    this.updateUltimosValoresData('Humedad', humidityData[humidityData.length - 1], '%');
    this.updateUltimosValoresData('Velocidad Viento', windSpeedData[windSpeedData.length - 1], 'Km/h');
  }

  updateChart(chart: Chart, labels: string[], data: number[], label: string) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.data.datasets[0].label = label;
    chart.update();
  }

  updateUltimosValoresData(label: string, value: number, unit: string) {
    const index = this.ultimosValoresData.findIndex(item => item.label === label);
    if (index !== -1) {
      this.ultimosValoresData[index].value = value;
      this.ultimosValoresData[index].unit = unit;
    } else {
      this.ultimosValoresData.push({ label, value, unit });
    }
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
