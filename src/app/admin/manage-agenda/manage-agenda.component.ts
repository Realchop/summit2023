import { Component, inject } from '@angular/core';
import { AgendaService } from 'src/app/services/agenda.service';

@Component({
  selector: 'app-manage-agenda',
  templateUrl: './manage-agenda.component.html',
  styleUrls: ['./manage-agenda.component.scss'],
})
export class ManageAgendaComponent {
  public time: string = '';
  public name: string = '';
  public description: string = '';

  private agendaService = inject(AgendaService);

  constructor() { }

}
