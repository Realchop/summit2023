import { Injectable, inject } from '@angular/core';
import { Firestore, collection, query, collectionData, doc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private firestore = inject(Firestore);

  constructor() { }

  public getAgenda() {
    const q = query(
      collection(this.firestore, 'agenda'),
    )

    return collectionData(q, {idField: 'id'});
  }

  public updateAgenda(id: string, data: {activities: string[]}) {
    return updateDoc(doc(this.firestore, `agenda/${id}`), data);
  }

}
