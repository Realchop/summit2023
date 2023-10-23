import { Injectable, inject } from '@angular/core';
import { Firestore, collection, query, orderBy, collectionData, addDoc, Timestamp, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChallengesService {
  private firestore = inject(Firestore);

  constructor() { }

  public getChallenges() {
    const q = query(
      collection(this.firestore, 'challenges'),
      orderBy('date', 'desc')
    )

    return collectionData(q, {idField: 'id'});
  }

  public createChallenge(data: {title: string, description: string}) {
    return addDoc(
      collection(this.firestore, 'challenges'),
      {
       title: data.title,
       description: data.description,
       date: Timestamp.fromDate(new Date())
      }
     );
  }

  public updateChallenge(id: string, data: {title: string, description: string}) {
    return updateDoc(doc(this.firestore, `challenges/${id}`), data);
  }

  public deleteChallenge(id: string) {
    return deleteDoc(doc(this.firestore, `challenges/${id}`));
  }

}
