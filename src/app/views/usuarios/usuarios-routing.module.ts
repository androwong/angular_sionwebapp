import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosRoutingComponent } from './usuarios-routing.component';
import { RegistroUsuariosComponent } from './registro-usuarios/registro-usuarios.component';


const routes: Routes = [
  {
    path: '',
    component: UsuariosRoutingComponent,
    children: [
      {
        path: 'usuarios',
        component: UsuariosComponent
      },
      {
        path: 'registro-usuarios',
        component: RegistroUsuariosComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
