import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppVideosPageRoutingModule } from './app-videos-routing.module';

import { AppVideosPage } from './app-videos.page';
import { OutOfServiceComponent } from "../components/out-of-service/out-of-service.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppVideosPageRoutingModule,
    OutOfServiceComponent
],
  declarations: [AppVideosPage]
})
export class AppVideosPageModule {}
