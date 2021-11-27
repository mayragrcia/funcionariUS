import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component'

import { FuncionariosCrudComponent } from './views/funcionarios-crud/funcionarios-crud.component';
import { FuncionariosCreateComponent } from './components/funcionarios/funcionarios-create/funcionarios-create.component';
import { FuncionariosDeleteComponent } from './components/funcionarios/funcionarios-delete/funcionarios-delete.component';
import { FuncionariosUpdateComponent } from './components/funcionarios/funcionarios-update/funcionarios-update.component';

import { CargosCrudComponent } from './views/cargos-crud/cargos-crud.component';
import { CargosCreateComponent } from './components/cargos/cargos-create/cargos-create.component';
import { CargosDeleteComponent } from './components/cargos/cargos-delete/cargos-delete.component';
import { CargosUpdateComponent } from './components/cargos/cargos-update/cargos-update.component';

import { FuncionarioReadComponent } from './components/funcionarios/funcionario-read/funcionario-read.component';
import { FolhaCreateComponent } from './components/funcionarios/folha-create/folha-create.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "funcionarios",
    component: FuncionariosCrudComponent
  },
  {
    path: "funcionarios/create",
    component: FuncionariosCreateComponent
  },
  {
    path: "funcionarios/update/:id",
    component: FuncionariosUpdateComponent
  },
  {
    path: "funcionarios/delete/:id",
    component: FuncionariosDeleteComponent
  },
  {
    path: "cargos",
    component: CargosCrudComponent
  },
  {
    path: "cargos/create",
    component: CargosCreateComponent
  },
  {
    path: "cargos/update/:id",
    component: CargosUpdateComponent
  },
  {
    path: "cargos/delete/:id",
    component: CargosDeleteComponent
  },
  {
    path: "funcionario/:id",
    component: FuncionarioReadComponent
  },
  {
    path: "folha/:id",
    component: FolhaCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
