import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IonicModule } from '@ionic/angular';
import { ManageNewsComponent } from './manage-news/manage-news.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';
import { LecturesComponent } from './lectures/lectures.component';


@NgModule({
  declarations: [
    DashboardComponent, 
    ManageNewsComponent,
    SearchComponent,
    LecturesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    IonicModule,
    FormsModule,
    SharedModule
  ]
})
export class AdminModule { }
