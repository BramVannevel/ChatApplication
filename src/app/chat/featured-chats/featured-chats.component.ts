import { Component, OnInit } from '@angular/core';
import { ConversationDataService } from '../conversation-data.service';
import { ChatRoom } from '../models/chat-room.model';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-featured-chats',
  templateUrl: './featured-chats.component.html',
  styleUrls: ['./featured-chats.component.css']
})
export class FeaturedChatsComponent implements OnInit{
  private _groups;
  
  public group: FormGroup;

  constructor(private _conversationDataService : ConversationDataService, private fb: FormBuilder) { }

  ngOnInit(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser')).username;
    //console.log("REQUESTING USERBYNAME FROM GROUPLIST");
    this._conversationDataService.getUserByName(currentUser).subscribe(user => {
      this._groups = user.groupCH;
    });

    this.group = this.fb.group({
      group: [''],
    });
  }

  onSubmit(){
    let group = this.group.value.group;
    this._conversationDataService.connectGroup(group).subscribe(group => {
      //console.log(group);
      this._groups.push(group);
    });
  }

  get groups(){
    return this._groups;
  }

  changeConversation(room){
    this._conversationDataService.changeToGroupConversation(room._id);
  }
}
