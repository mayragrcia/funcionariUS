import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component'

import { CargosCrudComponent } from './views/cargos-crud/cargos-crud.component';
import { CargosCreateComponent } from './components/cargos/cargos-create/cargos-create.component';
import { CargosDeleteComponent } from './components/cargos/cargos-delete/cargos-delete.component';
import { CargosUpdateComponent } from './components/cargos/cargos-update/cargos-update.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
