import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./externTabPages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./externTabPages/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'modulos',
    loadChildren: () => import('./externTabPages/modulos/modulos.module').then( m => m.ModulosPageModule)
  },
  {
    path: 'full-video',
    loadChildren: () => import('./full-video/full-video.module').then( m => m.FullVideoPageModule)
  }
 

  


  


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
