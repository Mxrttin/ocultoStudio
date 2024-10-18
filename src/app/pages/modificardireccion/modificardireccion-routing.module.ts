import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificardireccionPage } from './modificardireccion.page';

const routes: Routes = [
  {
    path: '',
    component: ModificardireccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificardireccionPageRoutingModule {}
