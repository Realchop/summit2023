import { Component, inject } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-manage-news',
  templateUrl: './manage-news.component.html',
  styleUrls: ['./manage-news.component.scss'],
})
export class ManageNewsComponent {
  private newsService = inject(NewsService);
  public selectedId: string | null = null;
  public title: string = '';
  public description: string = '';
  public news$;

  // Toast
  public openToast: boolean = false;
  public toastMessage: string = '';
  public success: boolean = false;

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
      this.openToast = true;
      this.toastMessage = "Notification published!";
    })
    .catch((err) => {
      console.log(err);
      this.success = false;
      this.openToast = true;
      this.toastMessage = "Error! Check console";
    });
  }

  updateNews(): void {
    this.newsService.updateNews(this.selectedId!, {title: this.title, description: this.description})
    .then(()=>{
      this.clear();
      this.success = true;
      this.openToast = true;
      this.toastMessage = "Notification updated!";
    })
    .catch((err) => {
      console.log(err);
      this.success = false;
      this.openToast = true;
      this.toastMessage = "Error! Check console";
    });
  }

  deleteNews(): void {
    this.newsService.deleteNews(this.selectedId!)
    .then(()=>{
      this.clear();
      this.success = true;
      this.openToast = true;
      this.toastMessage = "Notification deleted!";
    })
    .catch((err) => {
      console.log(err);
      this.success = false;
      this.openToast = true;
      this.toastMessage = "Error! Check console";
    });
  }

  selectNews(data: any): void {
    this.title = data['title'];
    this.description = data['description'];
    this.selectedId = data['id'];
  }

  clear(): void {
    this.title = '';
    this.description = '';
    this.selectedId = null;
  }

}
