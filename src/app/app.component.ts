import { OnInit, Component, ViewChild, inject } from '@angular/core';
import { StorageService } from './services/storage.service';
import { IonModal } from '@ionic/angular';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(IonModal, {static: true}) modal!: IonModal;
  private auth = inject(Auth);

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
  public loading: boolean = true;
  public success: boolean = false;

  constructor(private storageService: StorageService) {}

  async ngOnInit(): Promise<void> {
    const user = this.auth.currentUser;
    if(!user) {
      const savedLogin = await this.storageService.getSavedLogin();
      if(savedLogin) 
        signInWithEmailAndPassword(this.auth, savedLogin["email"], savedLogin["password"])
        .then((userCred)=>{
          this.loading = false;
          this.success = true;
        })
        .catch(()=>{
          this.loading = false;
          this.modal.isOpen = true;
        })
      else this.modal.isOpen = true;  
      } 
  }

  confirm() {
    // State
    this.loading = true;
    this.modal.canDismiss = true;
    this.modal.isOpen = false;
    
    // Login attempt
    signInWithEmailAndPassword(this.auth, this.email, this.password)
    .then((userCred)=>{
      this.loading = false;
      this.success = true;
      this.storageService.saveLogin(this.email, this.password);
    })
    .catch(()=>{
      this.loading = false;
      this.modal.isOpen = true;
      this.modal.canDismiss = false;
    })
  }
}
