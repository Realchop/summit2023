import { NgModule, inject } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LogoutGuard } from './core/logout.guard';
import { RoleGuard } from './core/role.guard';
import { Roles } from './core/roles';

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
    canMatch: [() => RoleGuard(Roles.SUMA)]
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
