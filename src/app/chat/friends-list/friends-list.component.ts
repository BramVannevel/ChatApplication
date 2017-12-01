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

  public user: FormGroup;

  constructor(private _conversationDataService : ConversationDataService, private fb: FormBuilder) { }

  ngOnInit(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser')).username;
    console.log("Calling GETUSERBYID FROM FRIENDSLISTCOMPONENT");
    this._conversationDataService.getUserByName(currentUser).subscribe(user => {
      this._friends = user.friends;
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
    this._conversationDataService.changeConversation(user._id);
  }
}
