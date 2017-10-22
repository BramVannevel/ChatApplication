import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
import { ConversationComponent } from './conversation/conversation.component';

import {NgxAutoScroll} from "ngx-auto-scroll/lib/ngx-auto-scroll.directive";
import { FriendsListComponent } from './friends-list/friends-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    ConversationComponent,
    NgxAutoScroll,
    FriendsListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
