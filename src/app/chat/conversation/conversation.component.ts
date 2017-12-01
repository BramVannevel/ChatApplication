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
  private country;

  private _msgs = new Array<Message[]>();

  constructor(private _conversationDataService : ConversationDataService, private fb: FormBuilder) {}
  
  ngOnInit(){
    this.message = this.fb.group({
      text: [''],
    });

    //SUBBING ON ACTIVE CONVO
    this._conversationDataService.active_conversation.subscribe(item => {
      // RETRIEVING CURRENT USER
      this._conversationDataService.getUserByName(this._currentUser).subscribe(user => {
        console.log("CALLLED GETUSERBYID from CONVO COMPONENT")
        this.country = user.country;
        // IF ACTIVE CONVO === NULL OR ""
        if(item === null || item === ""){
          // IF USER HAS PM
            if(user.privateCH.length > 0){
              this._conversationDataService.getConversation(user.privateCH[0]._id).subscribe(conv => {
                this.message.enable();
                this._conversation = conv;
              });
            }else{
              // DISABLE CHAT
              this.message.disable();
            }
        }else{
          // ITEM !=== NULL OR ""
          let found = false;
          // CHECK IF FOUND IN PM
          for(let element of user.privateCH){
            if(element._id === item){
              found = true;
            }
          };
          // CHECK IF FOUND IN GM
          for(let element of user.groupCH){
            if(element._id === item){
              found = true;
            }
          };
          if(!found){
            // IF NOTHING FOUND RESET BHSubject
            this._conversationDataService.changeToGroupConversation("");
          }else{
            // IF FOUND CHANGE TO LAST ACTIVE CONVO
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
    if(this.message.value.text !== ""){
      let currentUser = JSON.parse(localStorage.getItem('currentUser')).username;
      let message = new Message(this.message.value.text, currentUser, this.country);
      //console.log(message);
      this._conversationDataService.saveMessage(message, this._conversation._id).subscribe(msg => {
        this._conversation.messages.push(msg);
        this.message.reset();
      });
    }
  }

  get messages(){
    if(this._conversation !== undefined){
      return this._conversation.messages;
    }
    return null;
  }
}
