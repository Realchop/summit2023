import { Component, inject } from '@angular/core';
import { SegmentCustomEvent } from '@ionic/angular';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent {
  public selectedSegment: number = 26;
  public data;
  private agendaService = inject(AgendaService);

  constructor() {
    let day = new Date().getDay();
    this.selectedSegment = day > this.selectedSegment ? day : this.selectedSegment;
    this.data = this.agendaService.getAgenda();
  }

  switchSegment(event: any): void {
    event = event as SegmentCustomEvent;
    this.selectedSegment = event.detail.value as number;
  }

  isSecond(index: number): boolean {
    return index === 1;
  }

}
