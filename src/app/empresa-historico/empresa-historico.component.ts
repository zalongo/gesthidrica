import { AfterViewInit, Component, ChangeDetectorRef } from '@angular/core';
import { GoogleSheetsService } from '../services/google-sheets.service';
import { Chart, registerables, Title, ChartTypeRegistry } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empresa-historico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empresa-historico.component.html',
  styleUrls: ['./empresa-historico.component.css'],
})
export class EmpresaHistoricoComponent implements AfterViewInit {
  options = [
    { nombre: 'Temperatura' },
    { nombre: 'Humedad' },
    { nombre: 'Velocidad Viento' },
  ];

  /*   cards = [
    { id: 'lineChart1', title: 'Temperatura', visible: false },
    { id: 'lineChart2', title: 'Humedad Suelo', visible: false },
    { id: 'barChart1', title: 'Velocidad Viento', visible: false },
  ]; */

  cards = [
    {
      id: 'chart_0',
      title: 'Temperatura',
      visible: false,
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
          visible: false,
        },
      ],
    },
    {
      id: 'chart_1',
      title: 'Humedad Suelo',
      visible: false,
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
          visible: false,
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
          visible: false,
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
          visible: false,
        },
      ],
    },
    {
      id: 'chart_2',
      title: 'Velocidad Viento',
      visible: false,
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
          visible: false,
        },
      ],
    },
    {
      id: 'chart_3',
      title: 'Bateria',
      visible: false,
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
          visible: false,
        },
      ],
    },
    {
      id: 'chart_4',
      title: 'Humedad aire',
      visible: false,
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
          visible: false,
        },
      ],
    },
    {
      id: 'chart_5',
      title: 'Precipitación',
      visible: false,
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
          visible: false,
        },
      ],
    },
    {
      id: 'chart_6',
      title: 'Caudalímetro',
      visible: false,
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
          visible: false,
        },
      ],
    },
  ];

  tablaVisible: boolean = false;
  fechaInicio: string = '';
  fechaLimite: string = '';

  ultimosValoresData: { label: string; value: number; unit: string }[] = [];

  selectedOption: string = this.cards[0].charts[0].id;

  dataByVariable: {
    [key: string]: {
      value: number;

      unit: string;
    }[];
  } = {};

  ngAfterViewInit(): void {
    this.loadGoogleSheetsData();
  }

  guardar() {
    if (!this.fechaInicio || !this.fechaLimite) {
      alert('Por favor, seleccione una fecha de inicio y una fecha límite.');
      return;
    }

    setTimeout(() => {
      this.casosGraficos(this.selectedOption);
      this.loadGoogleSheetsData();
      this.tablaVisible = true; // Mostrar la tabla después de presionar 'Guardar'
    }, 300);
  }

  convertDateFormat(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  filterRecordsByDate(records: any[]): any[] {
    if (!this.fechaInicio || !this.fechaLimite) {
      return records;
    }
    const start = new Date(this.fechaInicio);
    const end = new Date(this.fechaLimite);

    // Filtrar registros por fecha
    const filteredRecords = records.filter((record) => {
      const date = this.convertDateFormat(record[0]);
      return date >= start && date <= end;
    });

    // Agrupar registros por día
    const recordsByDay: { [key: string]: any[] } = {};
    filteredRecords.forEach((record) => {
      const date = this.convertDateFormat(record[0]);
      const dateStr = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      if (!recordsByDay[dateStr]) {
        recordsByDay[dateStr] = [];
      }
      recordsByDay[dateStr].push(record);
    });

    // Seleccionar una cantidad específica de datos por día
    const selectedRecords: any[] = [];
    Object.keys(recordsByDay).forEach((dateStr) => {
      const dayRecords = recordsByDay[dateStr];
      // Limitar la cantidad de datos por día
      const limitedRecords = dayRecords.slice(0, 6); // Por ejemplo, tomar solo 6 registros por día
      selectedRecords.push(...limitedRecords);
    });

    return selectedRecords;
  }

  casosGraficos(opcion: string) {
    this.cards.map((card) => {
      card.visible = card.id === opcion;
      card.charts.map((chart) => {
        chart.visible = chart.id === opcion;
      });
    });
    /* switch (opcion) {
      case 'Temperatura':
        this.cards[0].visible = true;
        this.cards[1].visible = false;
        this.cards[2].visible = false;
        this.createLineChart1();
        break;
      case 'Humedad':
        this.cards[1].visible = true;
        this.cards[0].visible = false;
        this.cards[2].visible = false;
        this.createLineChart2();
        break;
      case 'Velocidad Viento':
        this.cards[2].visible = true;
        this.cards[1].visible = false;
        this.cards[0].visible = false;
        this.createBarChart1();
        break;
    } */
  }

  charts: { [key: string]: Chart } = {};

  constructor(
    private googleSheetsService: GoogleSheetsService,
    private cdRef: ChangeDetectorRef
  ) {
    Chart.register(...registerables);
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
              let records = await this.googleSheetsService.getRecords(
                sheetId,
                range
              );

              if (this.fechaInicio && this.fechaLimite) {
                records = this.filterRecordsByDate(records);
              }

              if (typeof this.charts[chart.id] != 'undefined') {
                this.charts[chart.id].destroy();
              }

              if (records.length > 0) {
                this.updateChartsWithGoogleSheetsData(
                  chart,
                  records,
                  index,
                  unit
                );
              }


              this.cdRef.detectChanges(); // Forzar actualización de vista
            });
          }
        });

        /* const sheetId = '1f1j-yBgvjxgeeIb6cDCrd3ucaV1cejKjsKkzs_B99BM';

        // Obtener datos de la hoja de Humedad
        const humidityRange = 'Humedad';
        const humidityRecords = await this.googleSheetsService.getRecords(
          sheetId,
          humidityRange
        );

        // Obtener datos de la hoja de Estación
        const stationRange = 'Estacion';
        const stationRecords = await this.googleSheetsService.getRecords(
          sheetId,
          stationRange
        );

        if (humidityRecords.length > 0 && stationRecords.length > 0) {
          this.updateChartsWithGoogleSheetsData(
            humidityRecords,
            stationRecords
          );
          this.updateTableWithGoogleSheetsData(humidityRecords, stationRecords);
        } */
      } else {
        this.googleSheetsService.handleAuthClick();
      }
    });
  }

/*   updateTableWithGoogleSheetsData(
    humidityRecords: any[],
    stationRecords: any[]
  ) {
    const filteredHumidityRecords = this.filterRecordsByDate(humidityRecords);
    const filteredStationRecords = this.filterRecordsByDate(stationRecords);

    switch (this.selectedOption) {
      case 'Temperatura':
        this.ultimosValoresData = filteredStationRecords.map((record) => ({
          label: record[0] + ' ' + record[1],
          value: parseFloat(record[2].replace(',', '.')),
          unit: '°C',
        }));
        break;
      case 'Humedad':
        this.ultimosValoresData = filteredHumidityRecords.map((record) => ({
          label: record[0] + ' ' + record[1],
          value: parseFloat(record[1].replace(',', '.')),
          unit: '%',
        }));
        break;
      case 'Velocidad Viento':
        this.ultimosValoresData = filteredStationRecords.map((record) => ({
          label: record[0] + ' ' + record[1],
          value: parseFloat(record[5].replace(',', '.')),
          unit: 'Km/h',
        }));
        break;
    }
  } */

  /*   updateChart(chart: Chart, labels: string[], data: number[], label: string) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.data.datasets[0].label = label;
    chart.update();
  } */

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

  updateChartsWithGoogleSheetsData(
    chart: any,
    records: [string],
    index: number,
    unit: string
    /* humidityRecords: any[],
    stationRecords: any[] */
  ) {
    const lastRecords = records.slice(-30);
    const labels = lastRecords.map(
      (record: string) => record[0] + ' ' + record[1]
    );
    const data = lastRecords.map((record: string) =>
      parseFloat(record[index].replace(',', '.'))
    );

    if (data && data.length) {
      this.storeVariableData(chart.id, labels, data, unit);
    }

    this.createChart(
      chart.id,
      chart.title,
      chart.type,
      chart.backgroundColor,
      chart.borderColor
    );

    // Actualizar los gráficos con los datos
    this.updateChart(this.charts[chart.id], labels, data, unit);

    /* const filteredHumidityRecords = this.filterRecordsByDate(humidityRecords);
    const filteredStationRecords = this.filterRecordsByDate(stationRecords);

    const labelsHumidity = filteredHumidityRecords.map(
      (record) => record[0] + ' ' + record[1]
    );
    const humidityData = filteredHumidityRecords.map((record) =>
      parseFloat(record[1].replace(',', '.'))
    );

    const labelsStation = filteredStationRecords.map(
      (record) => record[0] + ' ' + record[1]
    );
    const temperatureData = filteredStationRecords.map((record) =>
      parseFloat(record[2].replace(',', '.'))
    );
    const windSpeedData = filteredStationRecords.map((record) =>
      parseFloat(record[5].replace(',', '.'))
    );

    if (this.cards[0].visible) {
      this.createLineChart1();
      this.updateChart(
        this.charts['lineChart1'],
        labelsStation,
        temperatureData,
        '°C'
      );
    }
    if (this.cards[1].visible) {
      this.createLineChart2();
      this.updateChart(
        this.charts['lineChart2'],
        labelsHumidity,
        humidityData,
        '%'
      );
    }
    if (this.cards[2].visible) {
      this.createBarChart1();
      this.updateChart(
        this.charts['barChart1'],
        labelsStation,
        windSpeedData,
        'Km/h'
      );
    } */
  }

  storeVariableData(
    label: string,
    labels: string[],
    data: number[],
    unit: string = ''
  ) {
    if (data && data.length) {
      this.dataByVariable[label] = labels.map((dateTime, index) => ({
        value: data[index],
        unit: unit, // Asegura que la unidad esté presente
      }));
    } else {
      console.warn(`No hay datos para almacenar en la variable ${label}`);
    }
  }

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





}
