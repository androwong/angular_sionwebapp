import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosRoutingComponent } from './usuarios-routing.component';
import { RegistroUsuariosComponent } from './registro-usuarios/registro-usuarios.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared_modules/material.module';


@NgModule({
  declarations: [UsuariosComponent, UsuariosRoutingComponent, RegistroUsuariosComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class UsuariosModule { }
