import { AfterViewInit, Component } from '@angular/core';
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

  charts: { [key: string]: Chart } = {};

  constructor(private googleSheetsService: GoogleSheetsService) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.loadGoogleSheetsData();
  }

  async loadGoogleSheetsData() {
    this.googleSheetsService.authStatus.subscribe(async (authenticated) => {
      if (authenticated) {
        const sheetId = '1f1j-yBgvjxgeeIb6cDCrd3ucaV1cejKjsKkzs_B99BM';
        const range = 'Humedad';
        const records = await this.googleSheetsService.getRecords(sheetId, range);
        if (records.length > 0) {
          this.updateChartData(records);
        }
      } else {
        this.googleSheetsService.handleAuthClick();
      }
    });
  }

  filterRecordsByDate(records: any[]): any[] {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(startOfToday);
    endOfToday.setHours(23, 59, 59, 999);
  
    const twoDaysAgo = new Date(startOfToday);
    twoDaysAgo.setDate(startOfToday.getDate() - 2);
  
    return records.filter(record => {
      const date = this.convertDateFormat(record[0]);
      return date >= twoDaysAgo && date <= endOfToday;
    });
  }
  

  convertDateFormat(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  updateChartData(records: any[] = []) {

    if (records.length === 0) {
      this.loadGoogleSheetsData();
      return;
    }

    const filteredRecords = this.filterRecordsByDate(records);
    const labels = filteredRecords.map(record => record[0] + " " + " " + record[1]);
    const temperatureData = filteredRecords.map(record => parseFloat(record[1].replace(',', '.')));
    const humidityData = filteredRecords.map(record => parseFloat(record[2].replace(',', '.')));
    const windSpeedData = filteredRecords.map(record => parseFloat(record[3].replace(',', '.')));

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

    if (this.charts['dataChart']) {
      this.charts['dataChart'].destroy();
    }

    const ctx = document.getElementById('dataChart') as HTMLCanvasElement;
    if (ctx) {
      this.charts['dataChart'] = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets
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

}
