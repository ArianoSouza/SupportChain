import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailActivitiePageRoutingModule } from './detail-activitie-routing.module';

import { DetailActivitiePage } from './detail-activitie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailActivitiePageRoutingModule
  ],
  declarations: [DetailActivitiePage]
})
export class DetailActivitiePageModule {}
