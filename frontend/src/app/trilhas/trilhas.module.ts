import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrilhasPageRoutingModule } from './trilhas-routing.module';

import { TrilhasPage } from './trilhas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrilhasPageRoutingModule
  ],
  declarations: [TrilhasPage]
})
export class TrilhasPageModule {}
