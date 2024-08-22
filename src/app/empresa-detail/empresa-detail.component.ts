import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { EmpresaHistoricoComponent } from '../empresa-historico/empresa-historico.component';
import { BotonsComponent } from "../botons/botons.component";

@Component({
  selector: 'app-empresa-detail',
  standalone: true,
  imports: [CommonModule, DashboardComponent, BotonsComponent,EmpresaHistoricoComponent],
  templateUrl: './empresa-detail.component.html',
  styleUrls: ['./empresa-detail.component.css']
})
export class EmpresaDetailComponent implements OnInit {
  empresa: string = '';

  empresas = [
    'Soc. Inv. Matristica',
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const index = +id;
      if (index >= 0 && index < this.empresas.length) {
        this.empresa = this.empresas[index];
      } else {
        console.error('ID fuera de rango');
      }
    } else {
      console.error('ID es null');
    }
  }
}
