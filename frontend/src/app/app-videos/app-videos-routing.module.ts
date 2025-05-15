import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppVideosPage } from './app-videos.page';

const routes: Routes = [
  {
    path: '',
    component: AppVideosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppVideosPageRoutingModule {}
