import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

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

  randomValues: { label: string, value: number, nuevo: string }[] = [];

  constructor() {
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
      { label: 'Temperatura', value: temperature, nuevo: '°C' },
      { label: 'Humedad', value: humidity, nuevo: '%' },
      { label: 'Velocidad Viento', value: windSpeed, nuevo: 'Km/h' },
      { label: 'Precipitación', value: precipitation, nuevo: 'mm' },
      { label: 'Radiación UV', value: uvRadiation, nuevo: 'mW/cm²' },
      { label: 'Humedad Suelo', value: soilMoisture, nuevo: '%' },
      { label: 'Q', value: flowQ, nuevo: 'lt/s' }
    ];
  }

  getRandomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
