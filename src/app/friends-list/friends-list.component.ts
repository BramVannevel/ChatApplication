import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { ConversationDataService } from '../conversation-data.service'; 
import { Message } from '../models/message.model';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css'],
  providers: [ConversationDataService]
})
export class FriendsListComponent {
  private _friends: User[] = [];

  constructor(private _conversationDataService : ConversationDataService) { 
    let user1 = new User("Bram", "BramV");
    let user2 = new User("Sander", "SanderB");
    let user3 = new User("Tamas", "TamasV");

    this._friends.push(user1);
    this._friends.push(user2);
    this._friends.push(user3);
  }

  changeRecipient(){
    this._conversationDataService.msg("Sander");
  }

  get friends(){
    return this._friends;
  }

}
