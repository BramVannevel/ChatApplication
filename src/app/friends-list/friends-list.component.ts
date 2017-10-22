import { Component } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent {
  private _friends: User[] = [];

  constructor() { 
    let user1 = new User("Bram", "BramV");
    let user2 = new User("Sander", "SanderB");
    let user3 = new User("Tamas", "TamasV");

    this._friends.push(user1);
    this._friends.push(user2);
    this._friends.push(user3);
  }

  get friends(){
    return this._friends;
  }

}
