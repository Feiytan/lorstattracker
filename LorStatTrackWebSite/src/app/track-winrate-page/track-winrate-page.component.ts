import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-track-winrate-page',
  templateUrl: './track-winrate-page.component.html',
  styleUrls: ['./track-winrate-page.component.css']
})
export class TrackWinratePageComponent implements OnInit {

  constructor(public userData: UserDataService) { }

  ngOnInit(): void {
  }

}
