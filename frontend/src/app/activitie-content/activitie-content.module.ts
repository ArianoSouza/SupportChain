import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivitieContentPageRoutingModule } from './activitie-content-routing.module';

import { ActivitieContentPage } from './activitie-content.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivitieContentPageRoutingModule
  ],
  declarations: [ActivitieContentPage]
})
export class ActivitieContentPageModule {}
