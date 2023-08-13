import { Component, inject } from '@angular/core';
import { Firestore, collectionData, DocumentData, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent {
  private firestore = inject(Firestore);
  private eventsCollection;
  public events$: Observable<DocumentData[]>;


  constructor() {
    this.eventsCollection = collection(this.firestore, 'events');
    this.events$ = collectionData(this.eventsCollection, {idField: 'id'});
  }

  registerForEvent(eventData: any) {} // <- Ideally this should get a reference to a document

}