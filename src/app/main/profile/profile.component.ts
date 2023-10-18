import { Component, inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  private userService = inject(UserService);
  public userData$; 

  constructor() {
    this.userData$ = this.userService.getCurrentUser();
   }
}
