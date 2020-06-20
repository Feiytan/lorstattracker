import { Component, OnInit } from '@angular/core';
import {LorMessagesService} from './lor-messages.service';
import { UserDataService } from './user-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public lor: LorMessagesService, public userData: UserDataService) {
    console.log(lor);
  }

  ngOnInit(): void {

  }

  public saveName() {
    this.userData.saveUserDecks();
  }
}
