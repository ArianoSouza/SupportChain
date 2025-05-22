import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivitieContentPage } from './activitie-content.page';

const routes: Routes = [
  {
    path: '',
    component: ActivitieContentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivitieContentPageRoutingModule {}
