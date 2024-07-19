import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private empresaGraficos: { [key: string]: any[] } = {};

  constructor() { }

  setEmpresaGraficos(empresas: string[], graficos: any[]) {
    empresas.forEach(empresa => {
      this.empresaGraficos[empresa] = graficos.map(grafico => ({ ...grafico }));
    });
  }

  getEmpresaGraficos(): { [key: string]: any[] } {
    return this.empresaGraficos;
  }

  getGraficosForEmpresa(empresa: string): any[] {
    return this.empresaGraficos[empresa] || [];
  }

  updateEmpresaGraficos(empresa: string, graficos: any[]) {
    this.empresaGraficos[empresa] = graficos;
  }
}
