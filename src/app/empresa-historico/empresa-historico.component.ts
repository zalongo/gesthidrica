import { AfterViewInit, Component } from '@angular/core';
import { GoogleSheetsService } from '../services/google-sheets.service';
import { Chart, registerables, Title } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-empresa-historico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empresa-historico.component.html',
  styleUrl: './empresa-historico.component.css'
})
export class EmpresaHistoricoComponent implements AfterViewInit {
  options = [
    { nombre: 'Temperatura' },
    { nombre: 'Humedad' },
    { nombre: 'Velocidad Viento' },
  ];

  cards = [
    { id: 'lineChart1', title: 'Temperatura', visible: true },
    { id: 'lineChart2', title: 'Humedad Suelo', visible: true },
    { id: 'barChart1', title: 'Velocidad Viento', visible: true },
  ];

  ultimosValoresData: { label: string, value: number, unit: string }[] = [];

  selectedOption: string = this.options[0].nombre;

  ngAfterViewInit(): void {
  }

  casosGraficos(opcion: string) {
    switch (opcion) {
      case 'Temperatura': this.createLineChart1();
        break;
      case 'Humedad': this.createLineChart2();
        break;
      case 'Velocidad Viento': this.createBarChart1();
        break;
    }
  }

  guardar() {
    this.casosGraficos(this.selectedOption)
  }

  charts: { [key: string]: Chart } = {};

  constructor(private googleSheetsService: GoogleSheetsService) {

  }
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

  updateChart(chart: Chart, labels: string[], data: number[], label: string) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.data.datasets[0].label = label;
    chart.update();
  }

  updateChartsWithGoogleSheetsData(records: any[]) {
    const lastRecords = records.slice(-30);
    const labels = lastRecords.map(record => record[0] + " " + " " + record[1]);
    const temperatureData = lastRecords.map(record => parseFloat(record[1].replace(',', '.')));
    const humidityData = lastRecords.map(record => parseFloat(record[2].replace(',', '.')));
    const windSpeedData = lastRecords.map(record => parseFloat(record[3].replace(',', '.')));

    this.updateChart(this.charts['lineChart1'], labels, temperatureData, '°C');
    this.updateChart(this.charts['lineChart2'], labels, humidityData, '%');
    this.updateChart(this.charts['barChart1'], labels, windSpeedData, 'Km/h');
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
}
