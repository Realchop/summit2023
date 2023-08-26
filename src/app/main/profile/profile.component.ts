import { Component, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, collectionData, limit, orderBy, query, where } from '@angular/fire/firestore';
import { Messaging, getToken } from '@angular/fire/messaging';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private fcm = inject(Messaging);
  private key = "BOo4VfR0iMDCS2bC5XalAFT5Xl5Z14VDxj9YU1uVDXVlMvwHF7mAtISoISH_h03Ni12hsOqGfMCckghrh9MnwIU";
  
  public userData$; 
  public notificationErrorOccured: boolean = false;

  constructor() {
    getToken(this.fcm, {vapidKey: this.key})
    .then((currentToken)=> {
      if(!currentToken) Notification.requestPermission();
    })
    .catch((err)=> this.notificationErrorOccured=true);

    const q = query(
                    collection(this.firestore, 'users'), 
                    where('uid', '==', this.auth.currentUser?.uid),
                    limit(1),
                    // orderBy('fullName')
                  );

    this.userData$ = collectionData(q);
   }

   showNotifError(show: boolean): void {
    this.notificationErrorOccured = show;
   }

   // Actual functionality goes here
   onScan(data: string): void {
    console.log(data);
   }
}
