import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmpresaListComponent } from '../empresa-list/empresa-list.component';
import { FormsModule } from '@angular/forms';
import { EmpresaService } from './empresa-service.service';

@Component({
  selector: 'app-empresa-detail-admin',
  standalone: true,
  imports: [CommonModule, EmpresaListComponent, FormsModule],
  templateUrl: './empresa-detail-admin.component.html',
  styleUrls: ['./empresa-detail-admin.component.css']
})
export class EmpresaDetailAdminComponent {
  graficos = [
    { id: 1, texto: 'Grafico 1', isSelected: true },
    { id: 2, texto: 'Grafico 2', isSelected: true },
    { id: 3, texto: 'Grafico 3', isSelected: true },
    { id: 4, texto: 'Grafico 4', isSelected: true },
    { id: 5, texto: 'Grafico 5', isSelected: true },
    { id: 6, texto: 'Grafico 6', isSelected: true },
  ];

  empresas = [
    'Agrícola los Pellines',
    'Agricola Jorge Borgeaud',
    'Agrícola Los Puntales',
    'Soc. Inv. Matristica',
    'Agrícola Tomás Echavarri',
    'Agrícola Domingo Guzmán',
    'Agrícola AgroAngol',
    'Agrícola Los Tatas',
    'Agrícola Santa Marina',
    'Agrícola David Estrada'
  ];

  empresaGraficos: { [key: string]: any[] } = {};

  constructor(public router: Router, private empresaService: EmpresaService) {
    this.loadEmpresaGraficos();
    if (Object.keys(this.empresaGraficos).length === 0) {
      this.empresaService.setEmpresaGraficos(this.empresas, this.graficos);
      this.empresaGraficos = this.empresaService.getEmpresaGraficos();
    }
  }

  navigateToDetail(empresa: string) {
    const id = this.empresas.indexOf(empresa);
    this.router.navigate(['/empresa', id]);
  }

  onCheckboxChange(empresa: string) {
    this.empresaService.updateEmpresaGraficos(empresa, this.empresaGraficos[empresa]);
  }

  guardarDatos() {
    // Guarda los datos en localStorage
    localStorage.setItem('empresaGraficos', JSON.stringify(this.empresaGraficos));
    console.log('Datos guardados:', this.empresaGraficos);
    // Recarga la página
    location.reload();
  }

  loadEmpresaGraficos() {
    // Carga los datos desde localStorage
    const savedData = localStorage.getItem('empresaGraficos');
    if (savedData) {
      this.empresaGraficos = JSON.parse(savedData);
    }
  }
}