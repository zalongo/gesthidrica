import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare var gapi: any;
declare var google: any;
@Injectable({
  providedIn: 'root'
})
export class GoogleSheetsService {
  private CLIENT_ID = '599544962025-ub5lm6j50g0dlg15c6ps77pubsnmuv5h.apps.googleusercontent.com';
  private API_KEY = 'AIzaSyDkxDDVxkMV9UerEdr85IL-hxXYXjqF5pA';
  private DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
  private SCOPES = 'https://www.googleapis.com/auth/spreadsheets';
  public spreadsheetId = '1f1j-yBgvjxgeeIb6cDCrd3ucaV1cejKjsKkzs_B99BM';


  private tokenClient: any;
  private gapiInited = false;
  private gisInited = false;

  public authStatus = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loadGapi();
    this.loadGis();
  }

  private loadGapi() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      console.log('GAPI script loaded successfully.');
      this.gapiLoaded();
    };
    script.onerror = () => {
      console.error('Failed to load GAPI script.');
    };
    document.body.appendChild(script);
  }

  private loadGis() {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = () => {
      console.log('Google Identity Services script loaded successfully.');
      this.gisLoaded();
    };
    script.onerror = () => {
      console.error('Failed to load Google Identity Services script.');
    };
    document.body.appendChild(script);
  }

  private gapiLoaded() {
    gapi.load('client', () => {
      console.log('GAPI client loaded.');
      this.initializeGapiClient();
    });
  }

  private async initializeGapiClient() {
    await gapi.client.init({
      apiKey: this.API_KEY,
      discoveryDocs: [this.DISCOVERY_DOC],
    });
    console.log('GAPI client initialized.');
    this.gapiInited = true;
    this.maybeEnableButtons();
  }

  private gisLoaded() {
    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: this.CLIENT_ID,
      scope: this.SCOPES,
      callback: (resp: any) => this.handleTokenResponse(resp),
    });
    console.log('Google Identity Services client initialized.');
    this.gisInited = true;
    this.maybeEnableButtons();
  }

  private handleTokenResponse(resp: any) {
    if (resp.error !== undefined) {
      console.error('Error during token response:', resp);
      throw (resp);
    }
    console.log('Token response received:', resp);
    this.authStatus.next(true);
    
    // Almacena el token si es necesario
    const accessToken = resp.access_token;
    // Puedes almacenar el token en un lugar seguro o en el estado de tu aplicación
  }

  private maybeEnableButtons() {
    if (this.gapiInited && this.gisInited) {
      console.log('Both GAPI and GIS clients are initialized.');
      this.authStatus.next(true);
    }
  }

  public async handleAuthClick() {
    if (!this.tokenClient) {
      console.error('Token client is not initialized.');
      return;
    }
  
    this.tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        console.error('Error during token request:', resp);
        throw (resp);
      }
      this.authStatus.next(true);
    };
  
    // Usa el flujo de redirección para la autenticación
    if (gapi.client.getToken() === null) {
      this.tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      this.tokenClient.requestAccessToken({ prompt: '' });
    }
  }

  public handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
      this.authStatus.next(false);
      console.log('User signed out.');
    } else {
      console.log('No token found, user is already signed out.');
    }
  }

  public async getRecords(sheetId: string, range: string) {
    try {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: range,
      });
      console.log('Records fetched from Google Sheets:', response.result.values);
      return response.result.values;
    } catch (err) {
      console.error('Error fetching records:', err);
      return [];
    }
  }

  async writeRecords(sheetId: string, range: string, values: any[][]): Promise<void> {
    try {
      const response = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: range,
        valueInputOption: 'RAW',
        resource: {
          values: values,
        },
      });
      console.log('Datos escritos en la hoja:', response);
    } catch (error) {
      console.error('Error al escribir datos en la hoja de cálculo:', error);
    }
  }
  addDataToSheet(range: string, values: any[]) {
    const token = gapi.client.getToken();
  
    if (!token) {
      console.error('No token found. Please authenticate first.');
      return Promise.reject('No token found. Please authenticate first.');
    }

  // Asegúrate de que values sea un array de arrays
  if (!Array.isArray(values) || !Array.isArray(values[0])) {
    console.error('Invalid values format. It should be an array of arrays.');
    return Promise.reject('Invalid values format. It should be an array of arrays.');
  }
  
    return gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range: range,
      valueInputOption: 'RAW',
      resource: {
        values: values,
      },
    });
  }
  
  
}
