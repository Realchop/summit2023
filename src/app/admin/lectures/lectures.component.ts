import { Component, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.scss'],
})
export class LecturesComponent {
  public lectureName: string = '';
  private userService = inject(UserService);

  // Toast state
  public toastMessage: string = '';
  public openToast: boolean = false;
  public success: boolean = false;

  constructor() { }

  public async addLecture(uid: string | null): Promise<void> {

    this.success = false;

    if(uid == null) {
      this.toastMessage = "Skeniranje neuspešno!";
      this.openToast = true;
      return;
    }

    // const userRef = await firstValueFrom(this.userService.getUser(uid))
    
    // if(!userRef.length) {
    //   this.toastMessage = "Korisnik ne postoji??\nZovi Lazara.";
    //   this.openToast = true;
    //   return;
    // }

    this.userService.attendLecture(uid, this.lectureName);
    this.success = true;
    this.toastMessage = "Skeniranje uspešno.";
    this.openToast = true;
  }

}
