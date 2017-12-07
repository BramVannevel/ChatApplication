import { ChatAppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('webapps-project App', () => {
  let page: ChatAppPage;

  beforeEach((done) => {
    page = new ChatAppPage();
    browser.get('/login');
    browser.findElement(by.id('username')).sendKeys('test');
    browser.findElement(by.id('password')).sendKeys('testtest');
    const promise = browser.findElement(by.id('loginbtn')).click();
    browser.wait(promise, 1000);
    done();
  });

  it("has 1 friends", () => {
    page.navigateTo();
    expect(page.getFriendsList().count()).toEqual(1);
  });

  it("has no groups", () => {
    page.navigateTo();
    expect(page.getGroupList().count()).toEqual(0);
  });
});
