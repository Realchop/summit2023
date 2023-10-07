import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import jsQR from 'jsqr';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @ViewChild("video") video!: ElementRef<HTMLVideoElement>;
  @ViewChild("canvas") canvas!: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D | null = null;
  private stream!: MediaStream;
  private scanning: boolean = false;


  constructor(private modalCtrl: ModalController) { }

  async ngOnInit(): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({video: {facingMode: "environment"}});
    }
    catch {
      return this.stop();
    }
    this.video.nativeElement.srcObject = this.stream;
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
        this.stop(code.data);
      }
    }
    if(this.scanning)
      requestAnimationFrame(this.scan.bind(this));
  }

  stop(code: string | null = null): void {
    if(this.scanning) {
      this.scanning = false;
      this.video.nativeElement.srcObject = null;
      this.stream.getTracks().forEach((track) => track.stop());
    }
    this.modalCtrl.dismiss(code);
  }

}
