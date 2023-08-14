import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { EventsComponent } from './events/events.component';
import { ProfileComponent } from './profile/profile.component';
import { NewsComponent } from './news/news.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule
  ],
  declarations: [
    MainPage, 
    EventsComponent, 
    ProfileComponent,
    NewsComponent
  ]
})
export class MainPageModule {}
