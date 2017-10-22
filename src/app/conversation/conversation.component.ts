import { Component } from '@angular/core';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent {
  private _messages: Message[] = [];

  constructor() {
    let message = new Message("hallo", "Me");
    let message2 = new Message("back at ya", "You");
    this._messages.push(message);
    this._messages.push(message2);
   }

  get messages(){
    return this._messages;
  }

  sendSender(textSender : HTMLInputElement) : boolean {
    let message = new Message(textSender.value, "Me");
    this._messages.push(message);
    return false;
  }

  sendReceiver(textReceiver : HTMLInputElement) : boolean {
    let message = new Message(textReceiver.value, "You");
    this._messages.push(message);
    return false;
  }
}
