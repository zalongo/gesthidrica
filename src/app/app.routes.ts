import { Routes } from '@angular/router';
import { EmpresaListComponent } from './empresa-list/empresa-list.component';
import { EmpresaDetailComponent } from './empresa-detail/empresa-detail.component';
import { EmpresaHistoricoComponent } from './empresa-historico/empresa-historico.component';
import { EmpresaDetailAdminComponent } from './empresa-detail-admin/empresa-detail-admin.component';
import { EmpresaDatosCruzadosComponent } from './empresa-datos-cruzados/empresa-datos-cruzados.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HuellaHidricaComponent } from './huella-hidrica/huella-hidrica.component';
import { CalcularHuellaComponent } from './calcular-huella/calcular-huella.component';
import { ResumenComponent } from './resumen/resumen.component';

export const routes: Routes = [
  { path: '', component: EmpresaListComponent },
  { path: 'empresa/:id', component: EmpresaDetailComponent },
  { path: 'adminDashboard', component: EmpresaDetailAdminComponent },
  { path: 'historicosEmpresa', component: EmpresaHistoricoComponent },
  { path: 'datosCruzadosEmpresa', component: EmpresaDatosCruzadosComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'huellaHidrica', component: HuellaHidricaComponent },
  { path: 'calcularHuella', component: CalcularHuellaComponent },
  { path: 'resumen', component: ResumenComponent },
];

export default routes;
