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
  private storageService = inject(StorageService);
  public role: Roles = Roles.DELEGATE;

  public appPages = [
    { title: 'Profil', url: '/main/profile', icon: 'person', role: Roles.DELEGATE },
    { title: 'Admin', url: '/admin', icon: 'shield', role: Roles.SUMA },
    { title: 'Vesti', url: '/main/news', icon: 'megaphone', role: Roles.DELEGATE },
    { title: 'Agenda', url: '/main/agenda', icon: 'calendar', role: Roles.DELEGATE },
    { title: 'Mapa', url: '/main/map', icon: 'map', role: Roles.DELEGATE },
    { title: 'Podesavanja', url: '/main/settings', icon: 'settings', role: Roles.DELEGATE },
    { title: 'Odjavi se', url: 'logout', icon: 'exit', role: Roles.DELEGATE }
  ];

  public email: string = '';
  public password: string = '';
  public loading: boolean = true;
  public success: boolean = false;
  public toastMessage: string = '';
  public openToast: boolean = false;

  constructor() {}

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
      this.success = true;
      this.storageService.saveLogin(email, password);
      this.toastMessage = "Uspešno ste se ulogovali!"
      userCred.user.getIdTokenResult(false)
                   .then((token) => {
                    switch(token.claims['role']) {
                      case "suma": this.role = Roles.SUMA; break;
                      case "company": this.role = Roles.COMPANY; break;
                      default: this.role = Roles.DELEGATE;
                    }
                   });
    })
    .catch((e)=>{
      this.modal.isOpen = true;
      this.modal.canDismiss = false;
      switch(e.code) {
        case "auth/invalid-email": this.toastMessage = "Nepravilan email!"; break;
        case "auth/wrong-password": this.toastMessage = "Pogrešna šifra!"; break;
        case "auth/network-request-failed": this.toastMessage = "Nema interneta!"; break;
        case "auth/user-not-found": this.toastMessage = "Email nije registrovan!"; break;
        default: console.log(e); this.toastMessage = "Nepoznata greška!";
      }
    })
    .finally(() => {
      this.loading = false;
      this.openToast = true;
    })
  }
}
