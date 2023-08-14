import { Component, OnInit, inject } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-manage-news',
  templateUrl: './manage-news.component.html',
  styleUrls: ['./manage-news.component.scss'],
})
export class ManageNewsComponent  implements OnInit {
  private firestore = inject(Firestore);
  public title: string = '';
  public description: string = '';

  // Toast
  public success: boolean = false;
  public error: boolean = false;

  constructor() { }

  ngOnInit() {}

  createNew(): void {
    addDoc(
      collection(this.firestore, 'news'),
      {
       title: this.title,
       description: this.description,
       date: Timestamp.fromDate(new Date())
      }
     ).then(()=>{
      this.clear();
      this.success = true;
    })
     .catch((err) => {
      console.log(err);
      this.error = true;
    })
  }

  clear(): void {
    this.title = '';
    this.description = '';
  }

}
