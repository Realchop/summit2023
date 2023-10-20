import { Component, inject } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent {
  private newsService = inject(NewsService);
  public news$;

  public live: boolean = true;

  constructor() {
    this.news$ = this.newsService.getNews();
    this.live = new Date().getDay() >= 26;
  }
}
