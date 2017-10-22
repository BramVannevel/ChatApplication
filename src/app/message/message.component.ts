import { Component, Input, OnChanges} from '@angular/core';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() public message: Message;

  listClass = "";
  lowerDiv = "";

  constructor() { 
    
  }

  ngOnChanges(){
    let classes = "";
    let lowerDivs = "";
    if(this.message.sender === "Me"){
      classes = "right-side";
      lowerDivs = "lower-right"
    } else {
      classes = "left-side";
      lowerDivs = "lower-left";
    }

    classes = classes.concat(" message");
    lowerDivs = lowerDivs.concat(" lower-general");

    this.lowerDiv = lowerDivs;
    this.listClass = classes;
    
  }
}
