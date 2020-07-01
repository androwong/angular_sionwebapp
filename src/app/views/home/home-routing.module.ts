import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './content/error-page/error-page.component';
import { BaseComponent } from './base/base.component';
import { AuthGuard } from '../auth/auth.guard';
// Auth


const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'usuarios',
        loadChildren: () => import('app/views/usuarios/usuarios.module').then(mod => mod.UsuariosModule)
      },
      {
        path: 'monitoreo',
        loadChildren: () => import('app/views/monitoreo/monitoreo.module').then(mod => mod.MonitoreoModule)
      },
      {
        path: 'error/403',
        component: ErrorPageComponent,
        data: {
          'type': 'error-v6',
          'code': 403,
          'title': '403... Access forbidden',
          'desc': 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
        }
      },
      { path: 'error/:type', component: ErrorPageComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
