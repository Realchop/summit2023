import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, arrayRemove, arrayUnion, collection, collectionData, doc, docData, limit, query, updateDoc, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firestore = inject(Firestore);
  private auth = inject(Auth)

  constructor() { }

  getCurrentUser() {
    return this.getUser(this.auth.currentUser!.uid);
  }

  getUser(uid: string) {
    const q = query(collection(this.firestore, 'users'), where('uid', '==', uid), limit(1));
  
    return collectionData(q, {idField: 'id'});
  }

  getAllUsers() {
    const q = query(collection(this.firestore, 'users'));

    return collectionData(q, {idField: 'id'});
  }

  attendEvent(documentId: string, eventId: string) {
    updateDoc(doc(this.firestore, `users/${documentId}`), {attended: arrayUnion(eventId)});
  }

  leaveEvent(documentId: string, eventId: string) {
    updateDoc(doc(this.firestore, `users/${documentId}`), {attended: arrayRemove(eventId)});
  }

}
