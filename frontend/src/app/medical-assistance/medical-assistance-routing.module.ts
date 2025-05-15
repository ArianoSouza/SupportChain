import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalAssistancePage } from './medical-assistance.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalAssistancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalAssistancePageRoutingModule {}
