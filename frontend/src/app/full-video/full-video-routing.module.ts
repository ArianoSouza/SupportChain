import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullVideoPage } from './full-video.page';

const routes: Routes = [
  {
    path: '',
    component: FullVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullVideoPageRoutingModule {}
