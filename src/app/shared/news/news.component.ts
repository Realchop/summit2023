import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent {
  @Input("data") data: any;
  @Input("titleOnly") titleOnly: boolean = false;
  @Input("selected") selected: boolean = false;

  constructor() { }

}
