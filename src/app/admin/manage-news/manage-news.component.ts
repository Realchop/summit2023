import { Component, inject } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-manage-news',
  templateUrl: './manage-news.component.html',
  styleUrls: ['./manage-news.component.scss'],
})
export class ManageNewsComponent {
  private newsService = inject(NewsService);
  private notificationService = inject(NotificationService);
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
      this.success = true;
      this.openToast = true;
      this.toastMessage = "Vest objavljena!";
      this.notificationService.sendNotification(this.title, this.description);
      this.clear();
    })
    .catch((err) => {
      console.log(err);
      this.success = false;
      this.openToast = true;
      this.toastMessage = "Greska! Proveri konzolu";
    });
  }

  updateNews(): void {
    this.newsService.updateNews(this.selectedId!, {title: this.title, description: this.description})
    .then(()=>{
      this.clear();
      this.success = true;
      this.openToast = true;
      this.toastMessage = "Vest promenjena!";
    })
    .catch((err) => {
      console.log(err);
      this.success = false;
      this.openToast = true;
      this.toastMessage = "Greska! Proveri konzolu";
    });
  }

  deleteNews(): void {
    this.newsService.deleteNews(this.selectedId!)
    .then(()=>{
      this.clear();
      this.success = true;
      this.openToast = true;
      this.toastMessage = "Vest obrisana!";
    })
    .catch((err) => {
      console.log(err);
      this.success = false;
      this.openToast = true;
      this.toastMessage = "Greska! Proveri konzolu";
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
