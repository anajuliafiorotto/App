import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./tabs/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'tarefas',
    loadChildren: () => import('./tabs/tarefas/tarefas.module').then( m => m.TarefasPageModule)
  },
  {
    path: 'sobre',
    loadChildren: () => import('./tabs/sobre/sobre.module').then( m => m.SobrePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
