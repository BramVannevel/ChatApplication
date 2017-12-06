import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Message } from '../models/message.model';
import { ChatRoom } from '../models/chat-room.model';
import { ConversationDataService } from '../conversation-data.service'; 
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit, OnDestroy {
  private _conv_id;
  private _conversation;
  private message: FormGroup;
  private country;

  private _active_user;

  private _msgs = new Array<Message[]>();
  private myUnsubscribe: Subject<boolean> = new Subject<boolean>();
  
  constructor(private _conversationDataService : ConversationDataService, private fb: FormBuilder) {}
  
  ngOnInit(){
    

    this.message = this.fb.group({
      text: [''],
    });

    /*this._conversationDataService.getUserByNameNoPopulate(currentUser).subscribe(user => {
      this.country = user.country;
      this._conversationDataService.active_conversation.subscribe(item => {

        if(item == null){
          if(user.privateCH.length > 0){
            this._conversationDataService.changeConversationId(user.privateCH[0]);
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
    });*/



    //SUBBING ON ACTIVE CONVO
    this._conversationDataService.active_conversation.takeUntil(this.myUnsubscribe).subscribe(item => {
      let currentUser = JSON.parse(localStorage.getItem('currentUser')).username;
      // RETRIEVING CURRENT USER
      //console.log(`getUserByName item '${item}' '${currentUser}'`);
      this._conversationDataService.getUserByNameNoPopulate(currentUser).takeUntil(this.myUnsubscribe).subscribe(user => {
        this.country = user.country;
        // IF ACTIVE CONVO === NULL OR ""
        if(item === null){
          // IF USER HAS PM
            if(user.privateCH.length > 0){
              setTimeout(this._conversationDataService.changeConversationId(user.privateCH[0]));
            }else{
              // DISABLE CHAT
              this.message.disable();
            }
        }else{
          // ITEM !== NULL
          let found = false;

          // CHECK IF FOUND IN PRIVATE MESSAGESs
          for(let element of user.privateCH){
            if(element === item){
              found = true;
            }
          };
          // CHECK IF FOUND IN GROUP MESSAGES
          for(let element of user.groupCH){
            if(element === item){
              found = true;
            }
          };

          if(found === false){
            // IF NOTHING FOUND RESET BHSubject
            setTimeout(this._conversationDataService.changeConversationId(null));
          }else{
            // IF FOUND CHANGE TO LAST ACTIVE CONVO
            this._conversationDataService.getConversation(item).takeUntil(this.myUnsubscribe).subscribe(conv => {
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
  
  ngOnDestroy() {
    this.myUnsubscribe.next(true);
    this.myUnsubscribe.complete();
  }

}
