import { Component, inject } from '@angular/core';
import { Auth, connectAuthEmulator } from '@angular/fire/auth';
import { Firestore, collection, collectionData, connectFirestoreEmulator, limit, orderBy, query, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  public userData$; 

  constructor() {
    const q = query(
                    collection(this.firestore, 'users'), 
                    where('uid', '==', this.auth.currentUser?.uid),
                    limit(1),
                    // orderBy('fullName')
                  );

    this.userData$ = collectionData(q);
   }

   eventDetails(eventData: any): void {
    console.log(eventData);
   }

}
