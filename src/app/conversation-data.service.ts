import { Injectable } from '@angular/core';
import { Message } from './models/message.model';

@Injectable()
export class ConversationDataService {
  private _messages = new Array<Message>();

  constructor() { 
    let msg1 = new Message("sander hier", "Sander");
    let msg2 = new Message("dag sander", "Me");
    this._messages.push(msg1);
    this._messages.push(msg2);
  }

  get messages(){
    return this._messages;
  }

  sendMessage(message){
    this._messages.push(message);
  }

  msg(name) {
    let msgs = new Array<Message>();
    
    let msg1 = new Message("dag dev", "Bram");
    let msg2 = new Message("dag bram", "Me");
    msgs.push(msg1);
    msgs.push(msg2);
    
    this._messages = msgs;
  }

}
