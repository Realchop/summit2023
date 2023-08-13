import { Component } from '@angular/core';
import { SegmentCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public selectedSegment: string = "news";


  constructor() { }

  switchSegment(event: any): void {
    event = event as SegmentCustomEvent;
    this.selectedSegment = event.detail.value as string;
  }

}
