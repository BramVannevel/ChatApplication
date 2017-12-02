import { Component, Input, OnChanges} from '@angular/core';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() public message: Message;

  private _currentUser = JSON.parse(localStorage.getItem('currentUser')).username;

  listClass = "";
  lowerDiv = "";
  country = "";

  constructor() { 
  }

  ngOnChanges(){
    let classes = "";
    let lowerDivs = "";
    let country = "";

    if(this.message.user === this._currentUser){
      classes = "right-side";
      lowerDivs = "lower-right"
    } else {
      classes = "left-side";
      lowerDivs = "lower-left";
    }
  
    classes = classes.concat(" message");
    lowerDivs = lowerDivs.concat(" lower-general");
    if(this.message.country !== undefined){
      let c = this.message.country.toLowerCase();
      country = country.concat(`${c} flag`);
    }
    
    this.country = country;
    this.lowerDiv = lowerDivs;
    this.listClass = classes;
    
  }
}
