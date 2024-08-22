import { Component } from '@angular/core';
import { GoogleSheetsService } from '../services/google-sheets.service';
import { Chart, registerables, Title } from 'chart.js';


@Component({
  selector: 'app-empresa-historico',
  standalone: true,
  imports: [],
  templateUrl: './empresa-historico.component.html',
  styleUrl: './empresa-historico.component.css'
})
export class EmpresaHistoricoComponent {
  options = [
    { nombre: 'Temperatura' },
    { nombre: 'Humedad' },
    { nombre: 'Velocidad Viento' },
  ];

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
}
