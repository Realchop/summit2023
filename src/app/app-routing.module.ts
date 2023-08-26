import { NgModule, inject } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { StorageService } from './services/storage.service';
import { UserService } from './services/user.service';

const routes: Routes = [
  {
    path: 'main',
    // canLoad: [() => inject(Auth).currentUser ? true : false],
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'logout',
    canMatch: [async () => {
      await inject(StorageService).clear();
      await inject(Auth).signOut();
      location.reload();
    }],
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
