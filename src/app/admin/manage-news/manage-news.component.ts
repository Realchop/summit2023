import { Component, inject } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-manage-news',
  templateUrl: './manage-news.component.html',
  styleUrls: ['./manage-news.component.scss'],
})
export class ManageNewsComponent {
  private newsService = inject(NewsService);
  public title: string = '';
  public description: string = '';
  public news$;

  // Toast
  public success: boolean = false;
  public error: boolean = false;

  constructor() {
    this.news$ = this.newsService.getNews();
  }

  createNew(): void {
    this.newsService.createNews(
      {
        title: this.title, 
        description: this.description
      })
    .then(()=>{
      this.clear();
      this.success = true;
    })
    .catch((err) => {
      console.log(err);
      this.error = true;
    });
  }

  clear(): void {
    this.title = '';
    this.description = '';
  }

}
