import { Component, OnInit } from '@angular/core';
import {LorMessagesService} from './lor-messages.service';
import { UserDataService } from './user-data.service';
import { BreakpointService } from './breakpoint.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public breakpoint: string;

  constructor(public lor: LorMessagesService, public userData: UserDataService) {
  }
  
  ngOnInit(): void {
  }

  public saveName() {
    this.userData.saveUserDecks();
  }
}
