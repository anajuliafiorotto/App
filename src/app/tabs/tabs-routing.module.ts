import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('../tabs/inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'tarefas',
        loadChildren: () => import('../tabs/tarefas/tarefas.module').then(m => m.TarefasPageModule)
      },
      {
        path: 'sobre',
        loadChildren: () => import('../tabs/sobre/sobre.module').then(m => m.SobrePageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
