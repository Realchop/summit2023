import { Component, OnInit, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, collectionData, limit, orderBy, query, where } from '@angular/fire/firestore';
import { Messaging, getToken } from '@angular/fire/messaging';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private fcm = inject(Messaging);
  private key = "BOo4VfR0iMDCS2bC5XalAFT5Xl5Z14VDxj9YU1uVDXVlMvwHF7mAtISoISH_h03Ni12hsOqGfMCckghrh9MnwIU";
  
  public userData$; 
  public notificationErrorOccured: boolean = false;

  constructor() {
    const q = query(
                    collection(this.firestore, 'users'), 
                    where('uid', '==', this.auth.currentUser?.uid),
                    limit(1),
                    // orderBy('fullName')
                  );

    this.userData$ = collectionData(q);
   }

   ngOnInit(): void {
    getToken(this.fcm, {vapidKey: this.key})
    .then((currentToken)=> {
      // if(!currentToken) Notification.requestPermission();
      // if(!currentToken) this.notificationErrorOccured=true;
    })
    .catch((err)=> {
      // this.notificationErrorOccured=true;
    });
   }

   showNotifError(show: boolean): void {
    this.notificationErrorOccured = show;
   }

   ask(): void {
    Notification.requestPermission()
                .then(async () => {
                    this.notificationErrorOccured = false;
                    await getToken(this.fcm, {vapidKey: this.key})
                  });
   }

   // Actual functionality goes here
   onScan(data: string): void {
    alert(data);
   }
}
