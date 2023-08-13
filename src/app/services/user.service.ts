import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Roles } from '../core/roles';
import { Subject, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private auth = inject(Auth);
  private role: Roles | null = null;
  public User$: Subject<{role: Roles} | null> = new Subject();

  constructor() {
    this.User$.pipe(
      shareReplay(1)
    );
    this.setRole();
    this.auth.onAuthStateChanged({
      next: (user) => {
        if(user)
            this.setRole();
        else {
          this.role = null;
          this.User$.next(null)
        }
      },
      error: () => {},
      complete: () => {}
    })
  }

  private setRole() {
    this.auth.currentUser?.getIdTokenResult(false).then((token) => {
      switch(token.claims['role']) {
        case "suma": this.role = Roles.SUMA; break;
        case "company": this.role = Roles.COMPANY; break;
        default: this.role = Roles.DELEGATE;
      };
      this.User$.next({role: this.role});
    });
  }

  public isSuma(): boolean {
    return this.role === Roles.SUMA;
  }

  public isCompany(): boolean {
    return this.role === Roles.COMPANY;
  }

  public isDelegate(): boolean {
    return this.role === Roles.DELEGATE;
  }

}
