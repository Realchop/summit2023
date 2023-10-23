import { Component, inject } from '@angular/core';
import { ChallengesService } from 'src/app/services/challenges.service';

@Component({
  selector: 'app-challanges-page',
  templateUrl: './challanges-page.component.html',
  styleUrls: ['./challanges-page.component.scss'],
})
export class ChallangesPageComponent {
  public challenges$;
  private challengesService = inject(ChallengesService);

  constructor() { 
    this.challenges$ = this.challengesService.getChallenges();
  }


}
