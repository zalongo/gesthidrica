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
  styleUrls: ['./empresa-historico.component.css']
})
export class EmpresaHistoricoComponent implements AfterViewInit {
  options = [
    { nombre: 'Temperatura' },
    { nombre: 'Humedad' },
    { nombre: 'Velocidad Viento' },
  ];

  cards = [
    { id: 'lineChart1', title: 'Temperatura', visible: false },
    { id: 'lineChart2', title: 'Humedad Suelo', visible: false },
    { id: 'barChart1', title: 'Velocidad Viento', visible: false },
  ];

  tablaVisible: boolean = false;
  fechaInicio: string = '';
  fechaLimite: string = '';

  ultimosValoresData: { label: string, value: number, unit: string }[] = [];

  selectedOption: string = this.options[0].nombre;

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
    const filteredRecords = records.filter(record => {
      const date = this.convertDateFormat(record[0]);
      return date >= start && date <= end;
    });

    // Agrupar registros por día
    const recordsByDay: { [key: string]: any[] } = {};
    filteredRecords.forEach(record => {
      const date = this.convertDateFormat(record[0]);
      const dateStr = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      if (!recordsByDay[dateStr]) {
        recordsByDay[dateStr] = [];
      }
      recordsByDay[dateStr].push(record);
    });

    // Seleccionar una cantidad específica de datos por día
    const selectedRecords: any[] = [];
    Object.keys(recordsByDay).forEach(dateStr => {
      const dayRecords = recordsByDay[dateStr];
      // Limitar la cantidad de datos por día
      const limitedRecords = dayRecords.slice(0, 6); // Por ejemplo, tomar solo 6 registros por día
      selectedRecords.push(...limitedRecords);
    });

    return selectedRecords;
  }

  casosGraficos(opcion: string) {
    switch (opcion) {
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
    }
  }

  charts: { [key: string]: Chart } = {};

  constructor(private googleSheetsService: GoogleSheetsService) {
    Chart.register(...registerables);
  }

  async loadGoogleSheetsData() {
    this.googleSheetsService.authStatus.subscribe(async (authenticated) => {
      if (authenticated) {
        const sheetId = '1f1j-yBgvjxgeeIb6cDCrd3ucaV1cejKjsKkzs_B99BM';

        // Obtener datos de la hoja de Humedad
        const humidityRange = 'Humedad';
        const humidityRecords = await this.googleSheetsService.getRecords(sheetId, humidityRange);

        // Obtener datos de la hoja de Estación
        const stationRange = 'Estacion';
        const stationRecords = await this.googleSheetsService.getRecords(sheetId, stationRange);

        if (humidityRecords.length > 0 && stationRecords.length > 0) {
          this.updateChartsWithGoogleSheetsData(humidityRecords, stationRecords);
          this.updateTableWithGoogleSheetsData(humidityRecords, stationRecords); // Actualizar la tabla también
        }
      } else {
        this.googleSheetsService.handleAuthClick();
      }
    });
  }

  updateTableWithGoogleSheetsData(humidityRecords: any[], stationRecords: any[]) {
    const filteredHumidityRecords = this.filterRecordsByDate(humidityRecords);
    const filteredStationRecords = this.filterRecordsByDate(stationRecords);

    switch (this.selectedOption) {
      case 'Temperatura':
        this.ultimosValoresData = filteredStationRecords.map(record => ({
          label: record[0] + " " + record[1],
          value: parseFloat(record[2].replace(',', '.')),
          unit: '°C'
        }));
        break;
      case 'Humedad':
        this.ultimosValoresData = filteredHumidityRecords.map(record => ({
          label: record[0] + " " + record[1],
          value: parseFloat(record[1].replace(',', '.')),
          unit: '%'
        }));
        break;
      case 'Velocidad Viento':
        this.ultimosValoresData = filteredStationRecords.map(record => ({
          label: record[0] + " " + record[1],
          value: parseFloat(record[5].replace(',', '.')),
          unit: 'Km/h'
        }));
        break;
    }
  }

  updateChart(chart: Chart, labels: string[], data: number[], label: string) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.data.datasets[0].label = label;
    chart.update();
  }

  updateChartsWithGoogleSheetsData(humidityRecords: any[], stationRecords: any[]) {
    const filteredHumidityRecords = this.filterRecordsByDate(humidityRecords);
    const filteredStationRecords = this.filterRecordsByDate(stationRecords);

    const labelsHumidity = filteredHumidityRecords.map(record => record[0] + " " + record[1]);
    const humidityData = filteredHumidityRecords.map(record => parseFloat(record[1].replace(',', '.')));

    const labelsStation = filteredStationRecords.map(record => record[0] + " " + record[1]);
    const temperatureData = filteredStationRecords.map(record => parseFloat(record[2].replace(',', '.')));
    const windSpeedData = filteredStationRecords.map(record => parseFloat(record[5].replace(',', '.')));

    if (this.cards[0].visible) {
      this.createLineChart1();
      this.updateChart(this.charts['lineChart1'], labelsStation, temperatureData, '°C');
    }
    if (this.cards[1].visible) {
      this.createLineChart2();
      this.updateChart(this.charts['lineChart2'], labelsHumidity, humidityData, '%');
    }
    if (this.cards[2].visible) {
      this.createBarChart1();
      this.updateChart(this.charts['barChart1'], labelsStation, windSpeedData, 'Km/h');
    }
  }

  createLineChart1() {
    const existingChart = this.charts['lineChart1'];
    if (existingChart) {
      existingChart.destroy();
    }
    const ctx = document.getElementById('lineChart1') as HTMLCanvasElement;
    if (ctx) {
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
  }

  createLineChart2() {
    const existingChart = this.charts['lineChart2'];
    if (existingChart) {
      existingChart.destroy(); // Destruir el gráfico existente
    }

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
    const existingChart = this.charts['barChart1'];
    if (existingChart) {
      existingChart.destroy(); // Destruir el gráfico existente
    }

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
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
