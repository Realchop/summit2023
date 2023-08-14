import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData, orderBy, query } from '@angular/fire/firestore';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent {
  private firestore = inject(Firestore);
  public news$;

  constructor() {
    const q = query(
                    collection(this.firestore, 'news'), 
                    orderBy('date', 'desc')
                  );
    this.news$ = collectionData(q);
  }
}
