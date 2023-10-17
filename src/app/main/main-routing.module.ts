import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';
import { ProfileComponent } from './profile/profile.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { AgendaComponent } from './agenda/agenda.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    pathMatch: 'full'
  },
  {
    path: 'agenda',
    component: AgendaComponent,
    pathMatch: 'full'
  },
  {
    path: 'news',
    component: NewsPageComponent,
    pathMatch: 'full'
  },
  // {
  //   path: 'map',
  //   component: MapComponent,
  //   pathMatch: 'full'
  // },
  {
    path: ':id',
    component: MainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
