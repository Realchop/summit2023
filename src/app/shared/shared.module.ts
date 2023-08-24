import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news/news.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [NewsComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [NewsComponent]
})
export class SharedModule { }
