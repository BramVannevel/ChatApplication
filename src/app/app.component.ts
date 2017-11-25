import { Component, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {

  loggedIn(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser){
      return true;
    }else{
      return false;
    }
  }
}
