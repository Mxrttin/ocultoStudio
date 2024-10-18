import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificardireccionPageRoutingModule } from './modificardireccion-routing.module';

import { ModificardireccionPage } from './modificardireccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificardireccionPageRoutingModule
  ],
  declarations: [ModificardireccionPage]
})
export class ModificardireccionPageModule {}
