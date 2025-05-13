import { MedicalAssistancePageModule } from './../medical-assistance/medical-assistance.module';
import { MedicalAssistancePage } from './../medical-assistance/medical-assistance.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'notes',
        loadChildren: () => import('../notes/notes.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'infoModules',
        loadChildren: () => import('../infoModules/infoModules.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'medicalassistance',
        loadChildren: () => import('../medical-assistance/medical-assistance.module').then(m => m.MedicalAssistancePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
