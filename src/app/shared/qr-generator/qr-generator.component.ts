import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as qrcode from 'qrcode-generator';

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.scss'],
})
export class QrGeneratorComponent implements AfterViewInit {
  @Input("data") data!: string;
  @ViewChild("codeHolder") codeHolder!: ElementRef<HTMLDivElement>; 

  constructor() {}

  ngAfterViewInit(): void {
    const QRCode = qrcode(4, "L");
    QRCode.addData(this.data);
    QRCode.make();
    this.codeHolder.nativeElement.innerHTML = QRCode.createImgTag(5);
  }

}
