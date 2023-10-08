import { Component, inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  private userService = inject(UserService);
  public users$;
  public filter: string = '';

  constructor() { 
    this.users$ = this.userService.getAllUsers();
  }

  filterOut(fullName: string) {
    return fullName.includes(this.filter);
  }

  changeFilter(filter: any) {
    this.filter = filter.detail.value as string;
  }

  call(phone: string) {
    location.href = `tel:${phone}`;
  }

  message(phone: string) {
    location.href = `sms:${phone}`;
  }

}
