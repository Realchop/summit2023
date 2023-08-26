import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import jsQR from 'jsqr';

@Component({
  selector: 'app-qr-reader',
  templateUrl: './qr-reader.component.html',
  styleUrls: ['./qr-reader.component.scss'],
})
export class QrReaderComponent {
  @ViewChild("video") video!: ElementRef<HTMLVideoElement>;
  @ViewChild("canvas") canvas!: ElementRef<HTMLCanvasElement>;
  @Output("scanned") scanned: EventEmitter<string> = new EventEmitter<string>();

  public scanning: boolean = false;
  private ctx: CanvasRenderingContext2D | null = null;

  constructor() { }

  async startScan(): Promise<void> {
    const stream = await navigator.mediaDevices.getUserMedia({video: true});
    this.video.nativeElement.srcObject = stream;
    this.video.nativeElement.play();
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.scanning = true;
    requestAnimationFrame(this.scan.bind(this));
  }

  scan(): void {
    if(this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA) {
      this.canvas.nativeElement.width = this.video.nativeElement.videoWidth;
      this.canvas.nativeElement.height = this.video.nativeElement.videoHeight;

      // typescript bs; ctx should never be null
      if(this.ctx === null) return;

      this.ctx.drawImage(
              this.video.nativeElement, 
              0, 
              0, 
              this.canvas.nativeElement.width, 
              this.canvas.nativeElement.height
              );

      const imageData = this.ctx.getImageData(
        0, 
        0, 
        this.canvas.nativeElement.width, 
        this.canvas.nativeElement.height
      );

      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if(code) {
        this.scanned.emit(code.data);
        this.stop();
      }
    }
    if(this.scanning)
      requestAnimationFrame(this.scan.bind(this));
  }

  stop(): void {
    this.scanning = false;
    this.video.nativeElement.srcObject = null;
  }

}
