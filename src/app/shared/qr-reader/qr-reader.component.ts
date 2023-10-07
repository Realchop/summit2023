import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-qr-reader',
  templateUrl: './qr-reader.component.html',
  styleUrls: ['./qr-reader.component.scss'],
})
export class QrReaderComponent {
  @Input("text") text: string = "Skeniraj";
  @Output("scanned") scanned: EventEmitter<string> = new EventEmitter<string>();
  public scanning: boolean = false;

  constructor(private modalCtrl: ModalController) { }

  async startScan(): Promise<void> {
    this.scanning = true;
    const modalSettings: ModalOptions = {
                                          component: ModalComponent,
                                          backdropDismiss: false
                                        };
    const modal = await this.modalCtrl.create(modalSettings);
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    this.scanning = false;
    this.scanned.emit(data);
  }

}
