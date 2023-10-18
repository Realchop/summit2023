import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs';

// Check https://pushpad.xyz/docs/rest_api
type PushpadNotification = {
    body: string;
    title: string;
    ttl: number;
    require_interaction: boolean,
    silent: boolean;
    urgent: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private http: HttpClient = inject(HttpClient);
  private project_id: number = 8492 
  private API_ENDPOINT: string = `https://pushpad.xyz/api/v1/projects/${this.project_id}/notifications`;
  private token: string = '8WfQV7FlvAKyk4u70bsTRAfiLjXyNkQTDyu8LRpW';
  private URGENT_BODY: PushpadNotification = {
      "body": "",
      "title": "",
      "ttl": 7200,
      "require_interaction": true,
      "silent": false,
      "urgent": true,
  };
  private headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Token token=${this.token}`);
  
  private HEROku = 'https://summit-proxy-b4705396ea10.herokuapp.com/';


  constructor() {}

  sendNotification(title: string, message: string, urgent: boolean = true) {
    this.URGENT_BODY['body'] = message;
    this.URGENT_BODY['title'] = title;
    this.URGENT_BODY['urgent'] = urgent;
    this.http.post(this.HEROku+this.API_ENDPOINT, this.URGENT_BODY, {headers: this.headers})
    .pipe(take(1))
    .subscribe()
  }

}
