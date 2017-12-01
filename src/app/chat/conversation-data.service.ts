import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { User } from './models/user.model';
import { ChatRoom } from './models/chat-room.model';
import { Message } from './models/message.model';

import { AuthenticationService } from '../user/authentication.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class ConversationDataService {

  private _currentUser = JSON.parse(localStorage.getItem('currentUser')).username;

  private _userUrl = 'http://localhost:4200/API/users/';
  private _msgUrl = 'http://localhost:4200/API/messages/';
  private _chatroomUrl = '/API/chatrooms';

  private _conversations = new BehaviorSubject<string>(null);
  private _active_conversation = this._conversations.asObservable();

  private myHeaders = new Headers(
    {
      Authorization: `Bearer ${this.auth.token}`,
      'Content-Type': 'application/json'
    }
  )
  private postHeader = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http : Http, private auth: AuthenticationService) {
  }

  get active_conversation(){
    return this._active_conversation;
  }

  changeConversation(name){
    this.getUserByName(this._currentUser).subscribe(user => {
      for(let conv of user.privateCH){
        if(conv.users.find(user => user === name)){
          console.log(conv);
          this._conversations.next(conv._id);
        }
      }
    });
  }

  changeToGroupConversation(id){
    this._conversations.next(id);
  }

  addGroup(groupHash){
    let cU = this._currentUser.toLowerCase();
    return this.http.post(`${this._chatroomUrl}/createroom/${cU}`, groupHash,{headers: this.myHeaders})
      .map(res => res.json());
  }

  saveMessage(message, conv){
    console.log(JSON.stringify(message));
    return this.http.post(`${this._chatroomUrl}/postmessage/${conv}`, 
      JSON.stringify(message), {headers : this.myHeaders}).map(res => res.json());
  }

  getUserByName(name){
    return this.http.get(`http://localhost:4200/API/users/findbyname/${name.toLowerCase()}`, {headers: this.myHeaders})
      .map(response => response.json()).map(json => User.fromJSON(json));
  }

  getConversation(id): Observable<ChatRoom>{
      return this.http.get(`http://localhost:4200/API/chatrooms/${id}`, {headers: this.myHeaders})
        .map(response => response.json());
  }

  addFriend(friend){
    let cU = this._currentUser.toLowerCase();
    return this.http.post(`http://localhost:4200/API/users/addfriend/${cU}`, {username: friend}, {headers: this.myHeaders})
     .map(response => response.json());
  }

  connectGroup(group){
    let cU = this._currentUser.toLowerCase();
    return this.http.post(`http://localhost:4200/API/users/connectGroup/${cU}`, {name : group}, {headers: this.myHeaders})
      .map(response => response.json());
  }
}
