import { AfterViewInit, Component, ChangeDetectorRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { GoogleSheetsService } from '../services/google-sheets.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empresa-datos-cruzados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empresa-datos-cruzados.component.html',
  styleUrls: ['./empresa-datos-cruzados.component.css']
})

export class EmpresaDatosCruzadosComponent implements AfterViewInit {
  selectedData = {
    temperatura: true,
    humedad: true,
    velocidadViento: true
  };

  tableData: any[] = [];
  charts: { [key: string]: Chart } = {};

  constructor(private googleSheetsService: GoogleSheetsService, private cdr: ChangeDetectorRef) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.loadGoogleSheetsData();
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

        console.log('Humedad Records:', humidityRecords);
        console.log('Estación Records:', stationRecords);

        if (humidityRecords.length > 0 || stationRecords.length > 0) {
          this.updateChartData(humidityRecords, stationRecords);
        }
      } else {
        this.googleSheetsService.handleAuthClick();
      }
    });
  }

  filterRecordsByDate(records: any[], days: number): any[] {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(startOfToday);
    endOfToday.setHours(23, 59, 59, 999);

    const startOfPeriod = new Date(startOfToday);
    startOfPeriod.setDate(startOfToday.getDate() - days + 1);

    return records.filter(record => {
      const date = this.convertDateFormat(record[0]);
      return date >= startOfPeriod && date <= endOfToday;
    });
  }

  convertDateFormat(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return new Date(date.toLocaleString('en-US', { timeZone: 'America/Santiago' }));
  }

  formatDateTime(dateStr: string, timeStr: string): string {
    const [day, month, year] = dateStr.split('/').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date(year, month - 1, day, hours, minutes);
    return date.toLocaleString('es-ES', { timeZone: 'America/Santiago' });
  }

  // Nueva función para agrupar los datos de humedad por hora
  groupByHour(records: any[]): any[] {
    const grouped: { [key: string]: any } = {};

    records.forEach(record => {
      const [dateStr, timeStr, humidity] = record;
      const date = this.convertDateFormat(dateStr);
      const time = timeStr.split(':')[0]; // Obtener la hora
      const key = `${date.toISOString().split('T')[0]} ${time}:00`; // Agrupar por fecha y hora

      if (!grouped[key]) {
        grouped[key] = { date: key, humidity: parseFloat(humidity.replace(',', '.')) };
      }
    });

    return Object.values(grouped);
  }

  updateChartData(humidityRecords: any[] = [], stationRecords: any[] = []) {
    if (humidityRecords.length === 0 && stationRecords.length === 0) {
      this.loadGoogleSheetsData();
      return;
    }
  
    const filteredStationRecords = this.filterRecordsByDate(stationRecords, 2);
    const filteredHumidityRecords = this.filterRecordsByDate(humidityRecords, 2);
  
    const hourlyHumidityRecords = this.groupByHour(filteredHumidityRecords);
  
    const labelsStation = filteredStationRecords.map(record => this.formatDateTime(record[0], record[1]));
    const temperatureData = filteredStationRecords.map(record => parseFloat(record[2].replace(',', '.')));
    const windSpeedData = filteredStationRecords.map(record => parseFloat(record[5].replace(',', '.')));
    const labelsHumidity = hourlyHumidityRecords.map(record => record.date);
    const humidityData = hourlyHumidityRecords.map(record => record.humidity);
  
    const datasets: any[] = [];
  
    if (this.selectedData.temperatura) {
      datasets.push({
        label: 'Temperatura (°C)',
        data: temperatureData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2
      });
    }
  
    if (this.selectedData.humedad) {
      datasets.push({
        label: 'Humedad (%)',
        data: humidityData,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderWidth: 2
      });
    }
  
    if (this.selectedData.velocidadViento) {
      datasets.push({
        label: 'Velocidad del Viento (Km/h)',
        data: windSpeedData,
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderWidth: 2
      });
    }

    this.tableData = filteredStationRecords.reverse().map(record => ({
      fecha: record[0],
      hora: record[1],
      temperatura: record[2],
      velocidadViento: record[5],
      humedad: record[6] // Asegúrate que este índice sea correcto para los datos de humedad
    }));

    this.cdr.detectChanges();
  
    // Crear o actualizar el gráfico
    if (this.charts['dataChart']) {
      this.charts['dataChart'].destroy();
    }

    const ctx = document.getElementById('dataChart') as HTMLCanvasElement;
    if (ctx) {
      this.charts['dataChart'] = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labelsStation.length > 0 ? labelsStation : labelsHumidity,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: labelsStation.length > 0 ? 'Fecha y Hora' : 'Hora'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Valor'
              }
            }
          }
        }
      });
    }
    this.tableData = [];

    filteredStationRecords.forEach(record => {
      const formattedDate = this.formatDateTime(record[0], record[1]);
      const newRow: any = {
        fecha: formattedDate.split(', ')[0],
        hora: formattedDate.split(', ')[1],
      };
  
      if (this.selectedData.temperatura) {
        newRow.temperatura = parseFloat(record[2].replace(',', '.'));
      }
      if (this.selectedData.velocidadViento) {
        newRow.velocidadViento = parseFloat(record[5].replace(',', '.'));
      }
  
      this.tableData.push(newRow);
    });
  
    hourlyHumidityRecords.forEach(record => {
      const date = record.date.split(' ')[0];
      const hour = record.date.split(' ')[1];
  
      let row = this.tableData.find(r => r.fecha === date && r.hora === hour);
      if (!row) {
        row = { fecha: date, hora: hour };
        this.tableData.push(row);
      }
  
      if (this.selectedData.humedad) {
        row.humedad = record.humidity;
      }
    });
  }
}



