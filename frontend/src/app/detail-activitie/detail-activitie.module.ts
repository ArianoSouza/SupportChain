import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailActivitiePageRoutingModule } from './detail-activitie-routing.module';

import { DetailActivitiePage } from './detail-activitie.page';
import { OutOfServiceComponent } from "../components/out-of-service/out-of-service.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailActivitiePageRoutingModule,
    OutOfServiceComponent
],
  declarations: [DetailActivitiePage]
})
export class DetailActivitiePageModule {}
