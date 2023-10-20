import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { AgendaComponent } from './agenda/agenda.component';
import { TimeGuard } from '../core/time.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    pathMatch: 'full',
    canActivate: [TimeGuard]
  },
  {
    path: 'agenda',
    component: AgendaComponent,
    pathMatch: 'full',
    canActivate: [TimeGuard]
  },
  {
    path: 'news',
    component: NewsPageComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'profile',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
