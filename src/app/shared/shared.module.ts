import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news/news.component';
import { IonicModule } from '@ionic/angular';
import { QrReaderComponent } from './qr-reader/qr-reader.component';



@NgModule({
  declarations: [NewsComponent, QrReaderComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [NewsComponent, QrReaderComponent]
})
export class SharedModule { }
