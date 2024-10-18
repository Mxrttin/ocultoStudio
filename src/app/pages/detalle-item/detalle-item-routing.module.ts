import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleItemPage } from './detalle-item.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleItemPageRoutingModule {}
