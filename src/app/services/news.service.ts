import { Injectable, inject } from '@angular/core';
import { Firestore, collection, query, orderBy, collectionData, addDoc, Timestamp, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private firestore = inject(Firestore);

  constructor() { }

  public getNews() {
    const q = query(
      collection(this.firestore, 'news'),
      orderBy('date', 'desc')
    )

    return collectionData(q, {idField: 'id'});
  }

  public createNews(data: {title: string, description: string}) {
    return addDoc(
      collection(this.firestore, 'news'),
      {
       title: data.title,
       description: data.description,
       date: Timestamp.fromDate(new Date())
      }
     );
  }

  public updateNews(id: string, data: {title: string, description: string}) {
    return updateDoc(doc(this.firestore, `news/${id}`), data);
  }

  public deleteNews(id: string) {
    return deleteDoc(doc(this.firestore, `news/${id}`));
  }

}
