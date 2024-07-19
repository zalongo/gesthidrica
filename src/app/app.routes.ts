import { Routes } from '@angular/router';
import { EmpresaListComponent } from './empresa-list/empresa-list.component';
import { EmpresaDetailComponent } from './empresa-detail/empresa-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmpresaDetailAdminComponent } from './empresa-detail-admin/empresa-detail-admin.component';

export const routes: Routes = [
  { path: '', component: EmpresaListComponent },
  { path: 'empresa/:id', component: EmpresaDetailComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'adminDashboard', component: EmpresaDetailAdminComponent}
];
export default routes;

