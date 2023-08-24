import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';
import { EventsComponent } from './events/events.component';
import { ProfileComponent } from './profile/profile.component';
import { NewsComponent } from './news/news.component';

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
  // {
  //   path: 'agenda',
  //   component: AgendaComponent,
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'events',
  //   component: EventsComponent,
  //   pathMatch: 'full'
  // },
  {
    path: 'news',
    component: NewsComponent,
    pathMatch: 'full'
  },
  // {
  //   path: 'map',
  //   component: MapComponent,
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'settings',
  //   component: SettingsComponent,
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
