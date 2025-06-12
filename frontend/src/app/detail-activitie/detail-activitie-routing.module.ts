import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailActivitiePage } from './detail-activitie.page';

const routes: Routes = [
  {
    path: '',
    component: DetailActivitiePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailActivitiePageRoutingModule {}
