import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LogoutGuard } from './core/logout.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main/profile',
    pathMatch: 'full'
  },
  {
    path: 'main/:id',
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'logout',
    canActivate: [LogoutGuard],
    // Can be whatever, route won't ever be accessed
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
