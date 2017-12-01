import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// COMPONENTS

import { AddGroupComponent } from './add-group/add-group.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ConversationComponent } from './conversation/conversation.component';
import { FeaturedChatsComponent } from './featured-chats/featured-chats.component';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { MessageComponent } from './message/message.component';
import { ConversationDataService } from './conversation-data.service';

//THIRD PARTY MODULES

import { NgxAutoScroll } from "ngx-auto-scroll/lib/ngx-auto-scroll.directive";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';

const routes = [
    { path: 'chat', component: ChatWindowComponent },
    { path: 'add', component: AddGroupComponent }
  ];

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
      AddGroupComponent,
      ChatWindowComponent,
      ConversationComponent,
      FeaturedChatsComponent,
      FriendsListComponent,
      MessageComponent,
      NgxAutoScroll
  ],
  exports: [],
  providers: [ConversationDataService]
})
export class ChatModule { }