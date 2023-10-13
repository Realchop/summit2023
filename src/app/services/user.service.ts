import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, arrayRemove, arrayUnion, collection, collectionData, doc, docData, limit, query, updateDoc, where } from '@angular/fire/firestore';
import { StorageService } from './storage.service';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firestore = inject(Firestore);
  private auth = inject(Auth)
  private ss = inject(StorageService);

  constructor() { }

  getCurrentUser() {
    return this.getUser(this.auth.currentUser!.uid);
  }

  getUser(uid: string) {
    const q = query(collection(this.firestore, 'users'), where('uid', '==', uid), limit(1));
  
    return collectionData(q, {idField: 'id'});
  }

  async getAllUsers() {
    const users = await this.ss.getSavedUsers();
    if(users) return of(users);
    const q = query(collection(this.firestore, 'users'));

    return collectionData(q, {idField: 'id'}).pipe(tap((value) => this.ss.saveUsers(value)));
  }

  attendLecture(documentId: string, lectureId: string) {
    updateDoc(doc(this.firestore, `users/${documentId}`), {attended: arrayUnion(lectureId)});
  }

  removeLecture(documentId: string, lectureId: string) {
    updateDoc(doc(this.firestore, `users/${documentId}`), {attended: arrayRemove(lectureId)});
  }

}
