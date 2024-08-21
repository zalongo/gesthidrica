import { Router } from "@angular/router";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    { nombre: 'Soc. Inv. Matristica', representante: 'Nombre Apellido', comuna: 'Comuna' },
    // { nombre: 'Agrícola Tomás Echavarri', representante: 'Nombre Apellido', comuna: 'Comuna' },
    // { nombre: 'Agrícola Domingo Guzmán', representante: 'Nombre Apellido', comuna: 'Comuna' },
    // { nombre: 'Agrícola AgroAngol', representante: 'Nombre Apellido', comuna: 'Comuna' },
    // { nombre: 'Agrícola Los Tatas', representante: 'Nombre Apellido', comuna: 'Comuna' },
    // { nombre: 'Agrícola Santa Marina', representante: 'Nombre Apellido', comuna: 'Comuna' },
    // { nombre: 'Agrícola David Estrada', representante: 'Nombre Apellido', comuna: 'Comuna' }
  ];

  constructor(private router: Router) {}

  navigateToDetail(empresa: any) {
    const id = this.empresas.indexOf(empresa);
    this.router.navigate(['/empresa', id]);
  }
}