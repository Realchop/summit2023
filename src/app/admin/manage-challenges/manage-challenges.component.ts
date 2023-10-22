import { Component, inject } from '@angular/core';
import { ChallengesService } from 'src/app/services/challenges.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-manage-challenges',
  templateUrl: './manage-challenges.component.html',
  styleUrls: ['./manage-challenges.component.scss'],
})
export class ManageChallengesComponent {
  private challengesService = inject(ChallengesService);
  private notificationService = inject(NotificationService);
  public selectedId: string | null = null;
  public title: string = '';
  public description: string = '';
  public challenges$;

  // Toast
  public openToast: boolean = false;
  public toastMessage: string = '';
  public success: boolean = false;

  constructor() {
    this.challenges$ = this.challengesService.getChallenges();
  }

  createNew(): void {
    this.challengesService.createChallenge(
      {
        title: this.title, 
        description: this.description
      })
    .then(()=>{
      this.success = true;
      this.openToast = true;
      this.toastMessage = "Vest objavljena!";
      this.notificationService.sendNotification(this.title, this.description);
      this.clear();
    })
    .catch((err) => {
      console.log(err);
      this.success = false;
      this.openToast = true;
      this.toastMessage = "Greska! Proveri konzolu";
    });
  }

  updateChallenge(): void {
    this.challengesService.updateChallenge(this.selectedId!, {title: this.title, description: this.description})
    .then(()=>{
      this.clear();
      this.success = true;
      this.openToast = true;
      this.toastMessage = "Vest promenjena!";
    })
    .catch((err) => {
      console.log(err);
      this.success = false;
      this.openToast = true;
      this.toastMessage = "Greska! Proveri konzolu";
    });
  }

  deleteChallenge(): void {
    this.challengesService.deleteChallenge(this.selectedId!)
    .then(()=>{
      this.clear();
      this.success = true;
      this.openToast = true;
      this.toastMessage = "Vest obrisana!";
    })
    .catch((err) => {
      console.log(err);
      this.success = false;
      this.openToast = true;
      this.toastMessage = "Greska! Proveri konzolu";
    });
  }

  selectChallenge(data: any): void {
    this.title = data['title'];
    this.description = data['description'];
    this.selectedId = data['id'];
  }

  clear(): void {
    this.title = '';
    this.description = '';
    this.selectedId = null;
  }

}
