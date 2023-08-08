import { OnInit, Component, ViewChild } from '@angular/core';
import { StorageService } from './services/storage.service';
import { IonModal } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(IonModal, {static: true}) modal!: IonModal;

  public appPages = [
    { title: 'Profile', url: '/main/profile', icon: 'person' },
    { title: 'Agenda', url: '/main/agenda', icon: 'calendar' },
    { title: 'Events', url: '/main/events', icon: 'flame' },
    { title: 'Map', url: '/main/map', icon: 'map' },
    { title: 'Settings', url: '/main/settings', icon: 'settings' },
    {title: 'Logout', url: 'logout', icon: 'exit'}
  ];

  public email: string = '';
  public password: string = '';
  public message: string = 'Message will appear here.'

  constructor(private storageService: StorageService) {}

  async ngOnInit(): Promise<void> {
    const creds = JSON.parse(await this.storageService.get("credentials"));
    console.log(creds);
    if(!creds) this.modal.isOpen = true;
  }

  confirm() {
    this.modal.canDismiss = true;
    this.modal.dismiss(null, 'confirm');
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async onWillDismiss(event: any) {
    if (event.detail.role === 'confirm') {
      await this.storageService.set("credentials", JSON.stringify({email: this.email, password: this.password}));
    }
  }

}
