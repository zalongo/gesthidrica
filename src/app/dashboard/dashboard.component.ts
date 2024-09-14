import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { GoogleSheetsService } from '../services/google-sheets.service';

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
    { id: 'lineChart7', title: 'Humedad aire', visible: true }
  ];

  charts: { [key: string]: Chart } = {};

  activeIndex: number | null = null;

  ultimosValoresData: { label: string; value: number; unit: string; fecha: string; hora: string }[] = [];
  

  constructor(private googleSheetsService: GoogleSheetsService) {
    Chart.register(...registerables);
  }

  getFilteredData(label: string) {
    const filteredData = this.ultimosValoresData.filter(item => item.label === label);
    console.log(`Filtrando por ${label}: `, filteredData);
    return filteredData.slice(-5); // Devuelve los últimos 5 elementos
  }

  getUltimosValores(label: string) {
    // Aquí devolverá los datos solo para la variable seleccionada 'ultimosValores'
    return this.ultimosValoresData.find(item => item.label === label);
  }

  ngAfterViewInit() {
    this.initializeCharts();
    this.loadGoogleSheetsData();
  }

  toggleAccordion(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
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
          case 'lineChart7': this.createLineChart7(); break;
          default: console.warn(`Unknown chart ID: ${card.id}`);
        }
      }
    });
  }
  

  async loadGoogleSheetsData() {
    this.googleSheetsService.authStatus.subscribe(async (authenticated) => {
      if (authenticated) {
        const sheetId = '1f1j-yBgvjxgeeIb6cDCrd3ucaV1cejKjsKkzs_B99BM';

        // Load data from 'Humedad' sheet
        const humedadRange = 'Humedad!A:D'; // Include all relevant columns
        const humedadRecords = await this.googleSheetsService.getRecords(sheetId, humedadRange);

        // Load data from 'Estacion' sheet
        const estacionRange = 'Estacion!A:F'; // Include all relevant columns
        const estacionRecords = await this.googleSheetsService.getRecords(sheetId, estacionRange);

        if (humedadRecords.length > 0 && estacionRecords.length > 0) {
          this.updateChartsWithGoogleSheetsData(humedadRecords, estacionRecords);
        }
      } else {
        this.googleSheetsService.handleAuthClick();
      }
    });
  }

  extractDate(dateTime: string): string {
    // Suponiendo que el formato es 'YYYY-MM-DD HH:MM'
    return dateTime.split(' ')[0]; // Devuelve solo la parte de la fecha
  }

  extractTime(dateTime: string): string {
    // Suponiendo que el formato es 'YYYY-MM-DD HH:MM'
    return dateTime.split(' ')[1]; // Devuelve solo la parte de la hora
  }



  updateChartsWithGoogleSheetsData(humedadRecords: any[], estacionRecords: any[]) {
    const lastHumedadRecords = humedadRecords.slice(-30);
    const lastEstacionRecords = estacionRecords.slice(-30);

    const labelsHumedad = lastHumedadRecords.map(record => record[0] + " " + record[1]);
    const labelsEstacion = lastEstacionRecords.map(record => record[0] + " " + record[1]);

    const humedadData = lastHumedadRecords.map(record => parseFloat(record[2].replace(',', '.')));
    const voltageData = lastHumedadRecords.map(record => parseFloat(record[3].replace(',', '.')));

    const temperatureData = lastEstacionRecords.map(record => parseFloat(record[2].replace(',', '.')));
    const humidityAirData = lastEstacionRecords.map(record => parseFloat(record[3].replace(',', '.')));
    const windSpeedData = lastEstacionRecords.map(record => parseFloat(record[5].replace(',', '.')));

    this.updateChart(this.charts['lineChart1'], labelsEstacion, temperatureData, '°C');
    this.updateChart(this.charts['lineChart2'], labelsHumedad, humedadData, '%');
    this.updateChart(this.charts['barChart1'], labelsEstacion, windSpeedData, 'Km/h');
    this.updateChart(this.charts['lineChart3'], labelsEstacion, humidityAirData, '%');
    this.updateChart(this.charts['lineChart5'], labelsHumedad, voltageData, 'V');

    this.updateUltimosValoresData('Temperatura', temperatureData[temperatureData.length - 1], '°C',
      this.extractDate(labelsEstacion[labelsEstacion.length - 1]),
      this.extractTime(labelsEstacion[labelsEstacion.length - 1]));

    this.updateUltimosValoresData('Humedad Suelo', humedadData[humedadData.length - 1], '%',
      this.extractDate(labelsHumedad[labelsHumedad.length - 1]),
      this.extractTime(labelsHumedad[labelsHumedad.length - 1]));

    this.updateUltimosValoresData('Velocidad Viento', windSpeedData[windSpeedData.length - 1], 'Km/h',
      this.extractDate(labelsEstacion[labelsEstacion.length - 1]),
      this.extractTime(labelsEstacion[labelsEstacion.length - 1]));

    this.updateUltimosValoresData('Humedad aire', humidityAirData[humidityAirData.length - 1], '%',
      this.extractDate(labelsEstacion[labelsEstacion.length - 1]),
      this.extractTime(labelsEstacion[labelsEstacion.length - 1]));
      
    this.updateUltimosValoresData('Bateria', voltageData[voltageData.length - 1], 'V',
      this.extractDate(labelsEstacion[labelsEstacion.length - 1]),
      this.extractTime(labelsEstacion[labelsEstacion.length - 1]));
      
  }

  updateChart(chart: Chart | undefined, labels: string[], data: number[], label: string) {
    if (chart) {
      chart.data.labels = labels;
      chart.data.datasets[0].data = data;
      chart.data.datasets[0].label = label;
      chart.update();
    } else {
      console.error('Chart is not defined or not initialized properly');
    }
  }

  updateUltimosValoresData(label: string, value: number, unit: string, fecha: string, hora: string) {
    const index = this.ultimosValoresData.findIndex(item => item.label === label);
    if (index !== -1) {
      this.ultimosValoresData[index].value = value;
      this.ultimosValoresData[index].unit = unit;
      this.ultimosValoresData[index].hora = hora;
    } else {
      this.ultimosValoresData.push({ label, value, unit, fecha, hora });
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
          label: 'UV Index',
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

  createLineChart5() {
    const ctx = document.getElementById('lineChart5') as HTMLCanvasElement;
    this.charts['lineChart5'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Bateria %',
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
          label: 'Caudal Q',
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

  createLineChart7() {
    const ctx = document.getElementById('lineChart7') as HTMLCanvasElement;
    this.charts['lineChart7'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Humedad aire',
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
}
