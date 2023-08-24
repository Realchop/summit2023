import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData, orderBy, query } from '@angular/fire/firestore';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent {
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
