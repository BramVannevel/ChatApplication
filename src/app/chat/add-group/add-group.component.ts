import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ChatRoom } from '../models/chat-room.model';
import { Router } from '@angular/router';
import { ConversationDataService } from '../conversation-data.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  private group: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private service: ConversationDataService) { }

  ngOnInit() {
    this.group = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      photo: [''],
      tags: [''],
      public: ['']
    })
  }

  isChecked(){
    return this.group.value.public === true;
  }

  onSubmit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser);
    let groupHash = {
      owner : currentUser.username,
      name: this.group.value.name,
      photo: this.group.value.photo,
      tags: this.group.value.tags,
      public: this.group.value.public === true
    }
    this.service.addGroup(groupHash).subscribe(val => {
      if (val) {
        this.router.navigate(['/chat/chat']);
      }
    });
  }

}
