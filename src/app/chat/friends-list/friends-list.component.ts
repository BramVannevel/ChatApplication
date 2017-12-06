import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ConversationDataService } from '../conversation-data.service'; 
import { Message } from '../models/message.model';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit{
  
  private _friends;
  private a_user;

  public user: FormGroup;

  constructor(private _conversationDataService : ConversationDataService, private fb: FormBuilder) { }

  ngOnInit(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser')).username;
    this._conversationDataService.getUserByName(currentUser).subscribe(user => {
      this._friends = user.friends;
      this.a_user = user;
    });

    this.user = this.fb.group({
      friend: [''],
    });
  }

  get friends(){
    return this._friends;
  }

  onSubmit(){
    let friend = this.user.value.friend;
    this._conversationDataService.addFriend(friend).subscribe(fr => {
      this._friends.push(fr);
    });
  }

  changeConversation(user){
    for(let conv of this.a_user.privateCH){
      if(conv.users.find(found => found === user._id)){
        this._conversationDataService.changeConversationId(conv._id);
      }
    }
    //this._conversationDataService.changeConversation(user._id);
  }
}
