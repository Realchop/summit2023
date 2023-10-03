import { Component } from '@angular/core';
import { SegmentCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent {
  public selectedSegment: number = 26;

  constructor() {
    let day = new Date().getDay();
    this.selectedSegment = day > this.selectedSegment ? day : this.selectedSegment;
  }

  switchSegment(event: any): void {
    event = event as SegmentCustomEvent;
    this.selectedSegment = event.detail.value as number;
  }

}
