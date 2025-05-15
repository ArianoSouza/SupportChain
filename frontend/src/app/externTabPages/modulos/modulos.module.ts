import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModulosPageRoutingModule } from './modulos-routing.module';

import { ModulosPage } from './modulos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModulosPageRoutingModule
  ],
  declarations: [ModulosPage]
})
export class ModulosPageModule {}
