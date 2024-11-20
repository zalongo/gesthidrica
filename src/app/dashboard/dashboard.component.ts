import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables, ChartTypeRegistry } from 'chart.js';
import { GoogleSheetsService } from '../services/google-sheets.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit {
  cards = [
    {
      id: 'chart_0',
      title: 'Temperatura',
      visible: true,
      charts: [
        {
          id: 'chart_0',
          title: 'Temperatura',
          type: 'line',
          unit: '°C',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          sheet: '1f1j-yBgvjxgeeIb6cDCrd3ucaV1cejKjsKkzs_B99BM',
          tab: 'Estacion!A:H',
          index: 2,
        },
      ],
    },
    {
      id: 'chart_1',
      title: 'Humedad Suelo',
      visible: true,
      charts: [
        {
          id: 'chart_1',
          title: 'Humedad Suelo Lector 1',
          type: 'line',
          unit: '%',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          sheet: '1f1j-yBgvjxgeeIb6cDCrd3ucaV1cejKjsKkzs_B99BM',
          tab: 'Humedad!A:D',
          index: 2,
        },
        {
          id: 'chart_1.1',
          title: 'Humedad Suelo Lector 2',
          type: 'line',
          unit: '%',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          sheet: '1f1j-yBgvjxgeeIb6cDCrd3ucaV1cejKjsKkzs_B99BM',
          tab: 'Humedad!A:D',
          index: 2,
        },
        {
          id: 'chart_1.2',
          title: 'Humedad Suelo Lector 3',
          type: 'line',
          unit: '%',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          sheet: '1f1j-yBgvjxgeeIb6cDCrd3ucaV1cejKjsKkzs_B99BM',
          tab: 'Humedad!A:D',
          index: 2,
        },
      ],
    },
    {
      id: 'chart_2',
      title: 'Velocidad Viento',
      visible: true,
      charts: [
        {
          id: 'chart_2',
          title: 'Velocidad Viento',
          type: 'bar',
          unit: 'Km/h',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          sheet: '1f1j-yBgvjxgeeIb6cDCrd3ucaV1cejKjsKkzs_B99BM',
          tab: 'Estacion!A:H',
          index: 5,
        },
      ],
    },
    {
      id: 'chart_3',
      title: 'Bateria',
      visible: true,
      charts: [
        {
          id: 'chart_3',
          title: 'Bateria',
          type: 'line',
          unit: 'V',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          sheet: '1f1j-yBgvjxgeeIb6cDCrd3ucaV1cejKjsKkzs_B99BM',
          tab: 'Humedad!A:D',
          index: 3,
        },
      ],
    },
    {
      id: 'chart_4',
      title: 'Humedad aire',
      visible: true,
      charts: [
        {
          id: 'chart_4',
          title: 'Humedad aire',
          type: 'line',
          unit: '%',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          sheet: '1f1j-yBgvjxgeeIb6cDCrd3ucaV1cejKjsKkzs_B99BM',
          tab: 'Estacion!A:H',
          index: 3,
        },
      ],
    },
    {
      id: 'chart_5',
      title: 'Precipitación',
      visible: true,
      charts: [
        {
          id: 'chart_5',
          title: 'Precipitación',
          type: 'line',
          unit: 'mm',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          sheet: '1f1j-yBgvjxgeeIb6cDCrd3ucaV1cejKjsKkzs_B99BM',
          tab: 'Estacion!A:H',
          index: 7,
        },
      ],
    },
    {
      id: 'chart_6',
      title: 'Caudalímetro',
      visible: true,
      charts: [
        {
          id: 'chart_6',
          title: 'Caudalímetro',
          type: 'line',
          unit: 'L/min',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          sheet: '1f1j-yBgvjxgeeIb6cDCrd3ucaV1cejKjsKkzs_B99BM',
          tab: 'Caudal!A:E',
          index: 2,
        },
      ],
    },
  ];

  charts: { [key: string]: Chart } = {};
  activeIndex: number | null = null;

  // Almacenamos todos los datos históricos para cada variable
  dataByVariable: {
    [key: string]: {
      value: number;
      fecha: string;
      hora: string;
      unit: string;
    }[];
  } = {};

  constructor(
    private googleSheetsService: GoogleSheetsService,
    private cdRef: ChangeDetectorRef
  ) {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.initializeCharts();
    this.loadGoogleSheetsData();
  }

  toggleAccordion(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  initializeCharts() {
    this.cards.forEach((card) => {
      if (card.visible) {
        card.charts.map((chart) => {
          this.createChart(
            chart.id,
            chart.title,
            chart.type as keyof ChartTypeRegistry,
            chart.backgroundColor,
            chart.borderColor
          );
        });

        /* switch (card.id) {
          case 'chart_0':
            this.createLineChart1();
            break;
          case 'chart_1':
            this.createLineChart2();
            break;
          case 'chart_2':
            this.createBarChart1();
            break;
          case 'chart_3':
            this.createLineChart5();
            break;
          case 'chart_4':
            this.createLineChart7();
            break;
          case 'chart_5':
            this.createLineChart8();
            break;
          case 'chart_6':
            this.createLineChart9();
            break;
          default:
            console.warn(`Unknown chart ID: ${card.id}`);
        } */
      }
    });
  }

  async loadGoogleSheetsData() {
    this.googleSheetsService.authStatus.subscribe(async (authenticated) => {
      if (authenticated) {
        this.cards.map((card) => {
          if (card.visible) {
            card.charts.map(async (chart) => {
              const sheetId = chart.sheet;
              const range = chart.tab;
              const index = chart.index;
              const unit = chart.unit;
              const records = await this.googleSheetsService.getRecords(
                sheetId,
                range
              );
              if (records.length > 0) {
                this.updateChartsWithGoogleSheetsData(
                  chart.id,
                  records,
                  index,
                  unit
                );
              }
              this.cdRef.detectChanges(); // Forzar actualización de vista
            });
          }
        });
      } else {
        this.googleSheetsService.handleAuthClick();
      }
    });
  }

  // Funciones de ayuda para extraer fecha y hora del formato 'YYYY-MM-DD HH:MM'
  extractDate(dateTime: string): string {
    return dateTime.split(' ')[0];
  }

  extractTime(dateTime: string): string {
    return dateTime.split(' ')[1];
  }

  // Función para actualizar los gráficos con los datos obtenidos
  updateChartsWithGoogleSheetsData(
    id: string,
    records: [string],
    index: number,
    unit: string
  ) {
    const lastRecords = records.slice(-30);
    const labels = lastRecords.map(
      (record: string) => record[0] + ' ' + record[1]
    );
    const data = lastRecords.map((record: string) =>
      parseFloat(record[index].replace(',', '.'))
    );

    if (data && data.length) {
      this.storeVariableData(id, labels, data, unit);
    }

    // Actualizar los gráficos con los datos
    this.updateChart(this.charts[id], labels, data, unit);
  }

  // Función para almacenar datos históricos de cada variable con validación
  storeVariableData(
    label: string,
    labels: string[],
    data: number[],
    unit: string = ''
  ) {
    if (data && data.length) {
      this.dataByVariable[label] = labels.map((dateTime, index) => ({
        value: data[index],
        fecha: this.extractDate(dateTime),
        hora: this.extractTime(dateTime),
        unit: unit, // Asegura que la unidad esté presente
      }));
    } else {
      console.warn(`No hay datos para almacenar en la variable ${label}`);
    }
  }

  // Función para obtener el último valor de una variable
  getLastValue(
    id: string
  ): { value: number; unit: string; fecha: string; hora: string } | null {
    const data = this.dataByVariable[id];
    return data && data.length ? data[data.length - 1] : null;
  }

  // Función para actualizar el gráfico con nuevos datos
  updateChart(
    chart: Chart | undefined,
    labels: string[],
    data: number[],
    label: string
  ) {
    if (chart) {
      chart.data.labels = labels;
      chart.data.datasets[0].data = data;
      chart.data.datasets[0].label = label;
      chart.update();
    } else {
      console.error('Chart is not defined or not initialized properly');
    }
  }

  // Funciones para crear los gráficos individuales

  createChart(
    id: string,
    title: string,
    chartTipe: keyof ChartTypeRegistry,
    backgroundColor: string,
    borderColor: string
  ) {
    const ctx = document.getElementById(id) as HTMLCanvasElement;
    if (ctx) {
      this.charts[id] = new Chart(ctx, {
        type: chartTipe,
        data: {
          labels: [],
          datasets: [
            {
              label: title,
              data: [],
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: { beginAtZero: true },
          },
        },
      });
    }
  }

  // Función para obtener datos filtrados según el título de la tarjeta
  getFilteredData(
    id: string
  ): { value: number; fecha: string; hora: string }[] {
    const data = this.dataByVariable[id] || [];
    // Retornar los últimos 10 registros
    return data.slice(-10);
  }
}
