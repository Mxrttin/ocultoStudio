import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleItemPageRoutingModule } from './detalle-item-routing.module';

import { DetalleItemPage } from './detalle-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleItemPageRoutingModule
  ],
  declarations: [DetalleItemPage]
})
export class DetalleItemPageModule {}
