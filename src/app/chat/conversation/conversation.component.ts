import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../models/message.model';
import { ChatRoom } from '../models/chat-room.model';
import { ConversationDataService } from '../conversation-data.service'; 
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  private _currentUser = JSON.parse(localStorage.getItem('currentUser')).username;
  private _conv_id;
  private _conversation;
  private message: FormGroup;

  private _msgs = new Array<Message[]>();

  constructor(private _conversationDataService : ConversationDataService, private fb: FormBuilder) {}
  
  ngOnInit(){
    this.message = this.fb.group({
      text: [''],
    });

    this._conversationDataService.active_conversation.subscribe(item => {
      this._conversationDataService.getUserByName(this._currentUser).subscribe(user => {
        if(item == null){
            if(user.privateCH.length > 0){
              this._conversationDataService.getConversation(user.privateCH[0]._id).subscribe(conv => {
                this.message.enable();
                this._conversation = conv;
              });
            }else{
              this.message.disable();
            }
        }else{
          let found = false;
          user.privateCH.array.forEach(element => {
            if(element._id === item){
              found = true;
            }
          });
          if(!found){
            this._conversationDataService.changeToGroupConversation("");
          }else{
            this._conversationDataService.getConversation(item).subscribe(conv => {
              this.message.enable();
              this._conversation = conv;
            });
          } 
        }
      });
    });
  }

  onSubmit(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser')).username;
    let message = new Message(this.message.value.text, currentUser);
    this._conversationDataService.saveMessage(message, this._conversation._id).subscribe(msg => {
      this._conversation.messages.push(msg);
      this.message.reset();
    });
  }

  get messages(){
    if(this._conversation !== undefined){
      return this._conversation.messages;
    }
    return null;
  }
}
