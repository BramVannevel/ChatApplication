import { Component, OnChanges, OnInit } from '@angular/core';
import { AuthenticationService } from './user/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})

export class AppComponent {

  constructor(private auth : AuthenticationService){}

  get currentUser(){
    return this.auth.user$;
  }
}
