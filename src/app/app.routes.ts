import { Routes } from '@angular/router';
import { EmpresaListComponent } from './empresa-list/empresa-list.component';
import { EmpresaDetailComponent } from './empresa-detail/empresa-detail.component';
import { EmpresaHistoricoComponent } from './empresa-historico/empresa-historico.component';
import { EmpresaDetailAdminComponent } from './empresa-detail-admin/empresa-detail-admin.component';
import { EmpresaDatosCruzadosComponent } from './empresa-datos-cruzados/empresa-datos-cruzados.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: EmpresaListComponent },
  { path: 'empresa/:id', component: EmpresaDetailComponent},
  { path: 'adminDashboard', component: EmpresaDetailAdminComponent},
  { path: 'historicosEmpresa', component: EmpresaHistoricoComponent },
  { path: 'datosCruzadosEmpresa', component: EmpresaDatosCruzadosComponent },
  { path: 'dashboard', component: DashboardComponent}
];
export default routes;

