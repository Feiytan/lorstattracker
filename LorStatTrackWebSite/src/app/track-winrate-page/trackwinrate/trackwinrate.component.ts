import { Component, OnInit, Input } from '@angular/core';
import { UserDataService } from '../../user-data.service';
import { Breakpoints } from '@angular/cdk/layout';
import { BreakpointService } from '../../breakpoint.service';
import { UserDeck } from '../../models/user-deck';
import { decode } from 'lor-deckcode';

@Component({
  selector: 'app-trackwinrate',
  templateUrl: './trackwinrate.component.html',
  styleUrls: ['./trackwinrate.component.css']
})
export class TrackwinrateComponent implements OnInit {

  public height: number;
  public width: number;
  public isSetting: boolean;
  @Input('deck') public userDeck: UserDeck;
  

  constructor(public userData: UserDataService, private breakpointService: BreakpointService) { }

  ngOnInit(): void {
    this.isSetting = false;
    this.breakpointService.breakPointObserver.subscribe(res => {
      console.log(res);
      this.setImageSize(res);
    })
  }

  private setImageSize(breakpoint: string) {
    let baseHeight = 1024;
    let baseWidth = 2048;
    switch(breakpoint) {
      case Breakpoints.XLarge:
        this.width = baseWidth / 2.5;
        this.height = baseHeight / 2.5;
        break;
      case Breakpoints.Large:
        this.width = baseWidth / 3.9;
        this.height = baseHeight / 3.9;
        break;
      case Breakpoints.Medium:
        this.width = baseWidth / 2.8;
        this.height = baseHeight / 2.8;
        break;
      case Breakpoints.Small:
        this.width = baseWidth / 4.2;
        this.height = baseHeight / 4.2;
        break;
      case Breakpoints.XSmall:
        this.width = baseWidth / 4.8;
        this.height = baseHeight / 4.8;
        break;
      default:
        this.width = baseWidth / 4;
        this.height = baseHeight / 4;
        break;
    };
  };

  public toogleSetting() {
    if(this.isSetting) {
      this.checkDoublons();
      this.userDeck.cardsInDeck = decode(this.userDeck.deckCode);
      if(!this.userDeck.cardsInDeck.find(card => card.code === this.userDeck.deckImage.code)) {
        this.userDeck.deckImage = this.userDeck.cardsInDeck[this.userDeck.cardsInDeck.length - 1];
      }
      this.userData.saveUserDecks();
    }
    this.isSetting = !this.isSetting;
  }

  public checkDoublons() {
    let doublons = this.userData.userDecks.filter(deck => deck.deckCode === this.userDeck.deckCode);
    if(doublons.length > 1) {
      this.userData.userDecks = this.userData.userDecks.filter(deck => deck.deckCode !== doublons[0].deckCode);
      this.userData.userDecks.push(doublons.reduce((prev, current) => {
        current.wins += prev.wins;
        current.looses += prev.looses;
        return current;
      }))
    };
  }
}
