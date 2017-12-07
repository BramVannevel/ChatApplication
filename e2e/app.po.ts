import { browser, by, element } from 'protractor';

export class ChatAppPage {
  navigateTo() {
    return browser.get('/chat/chat');
  }

  getFriendsList(){
    return element.all(by.id('friends-list'));
  }

  getGroupList(){
    return element.all(by.id('group-list'));
  }

  /*getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }*/
}
