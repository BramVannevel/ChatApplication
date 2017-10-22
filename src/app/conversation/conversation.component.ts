import { Component, Input } from '@angular/core';
import { Message } from '../models/message.model';
import { ConversationDataService } from '../conversation-data.service'; 

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
  providers: [ConversationDataService]
})
export class ConversationComponent {
  private _messages: Message[] = [];

  constructor(private _conversationDataService : ConversationDataService) {
    this._messages = this._conversationDataService.messages;
  }

  get messages(){
    return this._messages;
  }

  sendSender(textSender : HTMLInputElement) : boolean {
    let message = new Message(textSender.value, "Me");
    this._conversationDataService.sendMessage(message);
    return false;
  }

  sendReceiver(textReceiver : HTMLInputElement) : boolean {
    let message = new Message(textReceiver.value, "You");
    this._conversationDataService.sendMessage(message);
    return false;
  }
}
