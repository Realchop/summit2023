import { NgModule, inject } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserService } from './services/user.service';
import { LogoutGuard } from './core/logout.guard';

const routes: Routes = [
  {
    path: 'main',
    // canLoad: [() => inject(Auth).currentUser ? true : false],
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'logout',
    canMatch: [LogoutGuard],
    // Can be whatever, route won't ever be accessed
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canMatch: [() => {return inject(UserService).isSuma()}]
  },
  // All bad paths lead to profile
  {
    path: '**',
    redirectTo: 'main/profile',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
