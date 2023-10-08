import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { ProfileComponent } from './profile/profile.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { SharedModule } from '../shared/shared.module';
import { AgendaComponent } from './agenda/agenda.component';
import { SplitPipe } from '../core/split.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    SharedModule,
  ],
  declarations: [
    MainPage, 
    ProfileComponent,
    NewsPageComponent,
    AgendaComponent,
    SplitPipe
  ]
})
export class MainPageModule {}
