import { Injectable, inject } from '@angular/core';
import { Messaging, getToken } from '@angular/fire/messaging';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private key = "BOo4VfR0iMDCS2bC5XalAFT5Xl5Z14VDxj9YU1uVDXVlMvwHF7mAtISoISH_h03Ni12hsOqGfMCckghrh9MnwIU";
  private fcm = inject(Messaging);


  constructor() { }

  public async init(): Promise<string | null> {
    try {
      const token = await getToken(this.fcm, {vapidKey: this.key});
      return token;
    }
    catch (e) {
      // console.log(e);
      return null;
    }
  }

  public async ask(): Promise<void> {
    Notification.requestPermission();
  }
}
