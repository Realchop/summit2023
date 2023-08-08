import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/main/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/main/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/main/favorites', icon: 'heart' },
    { title: 'Archived', url: '/main/archived', icon: 'archive' },
    { title: 'Trash', url: '/main/trash', icon: 'trash' },
    { title: 'Spam', url: '/main/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
