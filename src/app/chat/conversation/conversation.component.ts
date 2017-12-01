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
  private _conv_id;
  private _conversation;
  private message: FormGroup;
  private country;

  private _msgs = new Array<Message[]>();

  constructor(private _conversationDataService : ConversationDataService, private fb: FormBuilder) {}
  
  ngOnInit(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser')).username;

    this.message = this.fb.group({
      text: [''],
    });


    this._conversationDataService.getUserByName(currentUser).subscribe(user => {
      this.country = user.country;
      this._conversationDataService.active_conversation.subscribe(item => {
        if(item == null){
          if(user.privateCH.length > 0){
            this._conversationDataService.changeConversationId(user.privateCH[0]._id);
          }else{
            this.message.disable();
          }
        }else{
          this._conversationDataService.getConversation(item).subscribe(conv => {
            this.message.enable();
            this._conversation = conv;
          });
        }
      });
    });
    /*this._conversationDataService.active_conversation.subscribe(item => {
      if(item === null){
        this._conversationDataService.getUserByName(currentUser).subscribe(user => {
          this.country = user.country;
          if(user.privateCH.length > 0){
            this._conversationDataService.changeConversationId(user.privateCH[0]._id);
          }else{
            this.message.disable();
          }
        });
      }else{
        this._conversationDataService.getUserByName(currentUser).subscribe(user => {
          let found = false;

          for(let element of user.privateCH){
            if(element._id === item){
              found = true;
            }
          };

          for(let element of user.groupCH){
            if(element._id === item){
              found = true;
            }
          };

          if(found === false){
            this._conversationDataService.changeConversationId(null);
          }else{
            this._conversationDataService.getConversation(item).subscribe(conv => {
              this.message.enable();
              this._conversation = conv;
            });
          } 
        });
      }
    });*/

    //SUBBING ON ACTIVE CONVO
    /*this._conversationDataService.active_conversation.subscribe(item => {
      // RETRIEVING CURRENT USER
      this._conversationDataService.getUserByName(currentUser).subscribe(user => {
        this.country = user.country;
        // IF ACTIVE CONVO === NULL OR ""
        if(item === null){
          // IF USER HAS PM
            if(user.privateCH.length > 0){
              this._conversationDataService.changeConversationId(user.privateCH[0]._id);
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
          if(found === false){
            // IF NOTHING FOUND RESET BHSubject
            this._conversationDataService.changeConversationId(null);
          }else{
            // IF FOUND CHANGE TO LAST ACTIVE CONVO
            this._conversationDataService.getConversation(item).subscribe(conv => {
              this.message.enable();
              this._conversation = conv;
            });
          } 
        }
      });
    });*/
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
