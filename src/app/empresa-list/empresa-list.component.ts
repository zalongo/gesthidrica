import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {}

  navigateToDetail(empresa: string) {
    const id = this.empresas.indexOf(empresa);
    this.router.navigate(['/empresa', id]);
  }
}

