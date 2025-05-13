import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicalAssistancePageRoutingModule } from './medical-assistance-routing.module';

import { MedicalAssistancePage } from './medical-assistance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicalAssistancePageRoutingModule
  ],
  declarations: [MedicalAssistancePage]
})
export class MedicalAssistancePageModule {}
