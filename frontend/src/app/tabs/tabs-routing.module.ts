import { AppVideosPageModule } from './../app-videos/app-videos.module';
import { MedicalAssistancePageModule } from './../medical-assistance/medical-assistance.module';
import { MedicalAssistancePage } from './../medical-assistance/medical-assistance.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { TrilhasPageModule } from '../trilhas/trilhas.module';

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
        path: 'medicalassistance',
        loadChildren: () => import('../medical-assistance/medical-assistance.module').then(m => m.MedicalAssistancePageModule)
      },
      {
        path: 'trilhas',
        loadChildren: () => import('../trilhas/trilhas.module').then( m => m.TrilhasPageModule)
      },
      {
        path: 'app-videos',
        loadChildren: () => import('../app-videos/app-videos.module').then( m => m.AppVideosPageModule)
      },
      {
        path: 'configuracoes',
        loadChildren: () => import('../configuracoes/configuracoes.module').then( m => m.ConfiguracoesPageModule)
      },
      {
        path: 'atividades',
        loadChildren: () => import('../atividades/atividades.module').then( m => m.AtividadesPageModule)
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
