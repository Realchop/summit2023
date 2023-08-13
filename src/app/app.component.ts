import { OnInit, Component, ViewChild, inject } from '@angular/core';
import { StorageService } from './services/storage.service';
import { IonModal } from '@ionic/angular';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Roles } from './core/roles';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(IonModal, {static: true}) modal!: IonModal;
  private auth = inject(Auth);
  public role: Roles = Roles.DELEGATE;

  public appPages = [
    { title: 'Profile', url: '/main/profile', icon: 'person', role: Roles.DELEGATE },
    { title: 'Admin panel', url: 'main/admin', icon: 'shield', role: Roles.SUMA },
    { title: 'News', url: '/main/news', icon: 'megaphone', role: Roles.DELEGATE },
    { title: 'Agenda', url: '/main/agenda', icon: 'calendar', role: Roles.DELEGATE },
    { title: 'Events', url: '/main/events', icon: 'flame', role: Roles.DELEGATE },
    { title: 'Map', url: '/main/map', icon: 'map', role: Roles.DELEGATE },
    { title: 'Settings', url: '/main/settings', icon: 'settings', role: Roles.DELEGATE },
    { title: 'Logout', url: 'logout', icon: 'exit', role: Roles.DELEGATE }
  ];

  public email: string = '';
  public password: string = '';
  public loading: boolean = true;
  public success: boolean = false;

  constructor(private storageService: StorageService) {
    this.auth.onAuthStateChanged({
      next: (user) => {
        user?.getIdTokenResult(false)
        .then((token) => {
          switch(token.claims['role']) {
            case "suma": this.role = Roles.SUMA; break;
            case "company": this.role = Roles.COMPANY; break;
            default: this.role = Roles.DELEGATE;
          }
      });
      },
      error: () => {},
      complete: () => {}
    })
  }

  async ngOnInit(): Promise<void> {
    const user = this.auth.currentUser;
    if(!user) {
      const savedLogin = await this.storageService.getSavedLogin();
      if(savedLogin) 
        this.loginAttempt(savedLogin['email'], savedLogin['password']);
      else this.modal.isOpen = true;  
      } 
  }

  confirm() {
    this.loading = true;
    this.modal.canDismiss = true;
    this.modal.isOpen = false;
    
    this.loginAttempt(this.email, this.password);
  }

  loginAttempt(email: string, password: string): void {
    signInWithEmailAndPassword(this.auth, email, password)
    .then((userCred)=>{
      this.loading = false;
      this.success = true;
      this.storageService.saveLogin(email, password);
    })
    .catch(()=>{
      this.loading = false;
      this.modal.isOpen = true;
      this.modal.canDismiss = false;
    })
  }
}
