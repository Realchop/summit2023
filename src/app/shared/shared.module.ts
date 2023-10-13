import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news/news.component';
import { IonicModule } from '@ionic/angular';
import { QrReaderComponent } from './qr-reader/qr-reader.component';
import { QrGeneratorComponent } from './qr-generator/qr-generator.component';
import { ModalComponent } from './qr-reader/modal/modal.component';
import { LinkPipe } from '../core/link.pipe';



@NgModule({
  declarations: [
    NewsComponent, 
    QrReaderComponent,
    ModalComponent, // FOR QR READER ONLY
    QrGeneratorComponent,
    LinkPipe
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NewsComponent, 
    QrReaderComponent,
    QrGeneratorComponent,
  ]
})
export class SharedModule { }
