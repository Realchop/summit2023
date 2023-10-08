import { Component, OnInit, inject } from '@angular/core';
import { MessagingService } from 'src/app/services/messaging.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private userService = inject(UserService);
  private messagingService = inject(MessagingService);
  
  public userData$; 
  public notificationErrorOccured: boolean = false;

  constructor() {
    this.userData$ = this.userService.getCurrentUser();
   }

   async ngOnInit(): Promise<void> {
    this.notificationErrorOccured = await this.messagingService.init() === null;
   }

   ask() {
    this.messagingService.ask();
   }

   // Actual functionality goes here
   onScan(data: string): void {
    alert(data);
   }
}
