import { Router } from "@angular/router";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-empresa-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.css']
})

export class EmpresaListComponent {
  empresas = [
    // { nombre: 'Agrícola los Pellines', representante: 'Nombre Apellido', comuna: 'Comuna' },
    // { nombre: 'Agricola Jorge Borgeaud', representante: 'Nombre Apellido', comuna: 'Comuna' },
    // { nombre: 'Agrícola Los Puntales', representante: 'Nombre Apellido', comuna: 'Comuna' },
    // { nombre: 'Soc. Inv. Matristica', representante: 'Nombre Apellido', comuna: 'Comuna' },
    // { nombre: 'Agrícola Tomás Echavarri', representante: 'Nombre Apellido', comuna: 'Comuna' },
    // { nombre: 'Agrícola Domingo Guzmán', representante: 'Nombre Apellido', comuna: 'Comuna' },
    // { nombre: 'Agrícola AgroAngol', representante: 'Nombre Apellido', comuna: 'Comuna' },
    { nombre: 'Agrícola Los Tatas', representante: 'Nombre Apellido', comuna: 'Comuna' },
    // { nombre: 'Agrícola Santa Marina', representante: 'Nombre Apellido', comuna: 'Comuna' },
    // { nombre: 'Agrícola David Estrada', representante: 'Nombre Apellido', comuna: 'Comuna' }
  ];

  selectedEmpresa: any;


  constructor(private router: Router) {}

  openModal(empresa: any) {
    this.selectedEmpresa = empresa;
    const modalElement = document.getElementById('empresaModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  navigateTo(option: string) {
    const modalElement = document.getElementById('empresaModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);  // Obtén la instancia del modal
      if (modal) {
        modal.hide();  // Cierra el modal
      }
    }

    if (this.selectedEmpresa) {
      switch (option) {
        case 'datosHistoricos':
          this.router.navigate(['/historicosEmpresa']);
          break;
        case 'datosCruzados':
          this.router.navigate(['/datosCruzadosEmpresa']);
          break;
        case 'tiempoReal':
          this.router.navigate(['/dashboard']);
          break;
        default:
          break;
      }
    }
  }
}