import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FullVideoPageRoutingModule } from './full-video-routing.module';

import { FullVideoPage } from './full-video.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullVideoPageRoutingModule
  ],
  declarations: [FullVideoPage]
})
export class FullVideoPageModule {}
