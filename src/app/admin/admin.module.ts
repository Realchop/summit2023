import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IonicModule } from '@ionic/angular';
import { ManageNewsComponent } from './manage-news/manage-news.component';
import { ManageEventsComponent } from './manage-events/manage-events.component';
import { ManageAgendaComponent } from './manage-agenda/manage-agenda.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent, 
    ManageNewsComponent,
    ManageEventsComponent,
    ManageAgendaComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    IonicModule,
    FormsModule
  ]
})
export class AdminModule { }
