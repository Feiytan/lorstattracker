import { Injectable } from '@angular/core';
import { Observable, fromEvent, } from 'rxjs';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { Deck } from './models/deck';
import { GameState } from './models/gameState';
import { ExpeditionState } from './models/expedition-state';
import { GameResult } from './models/game-result';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})

export class LorMessagesService {

  public connected: boolean;
  public deck: Deck;
  public gameState: GameState;
  public expeditionState: ExpeditionState;
  public gameResult: GameResult;
  public canTrack: boolean;

  private lorMessage: Observable<[Deck, GameState, ExpeditionState, GameResult]> = fromEvent<CustomEvent>(document, 'lorStats').pipe(map((event: CustomEvent) => event.detail));
  private lorConnection: Observable<boolean> = fromEvent<CustomEvent>(document, 'lorConnection').pipe(map((event: CustomEvent) => event.detail));

  constructor(private userData: UserDataService) {
    this.deck = new Deck(null, null);
    this.gameState = new GameState();
    this.expeditionState = new ExpeditionState();
    this.gameResult = new GameResult();
    this.connected = false;
    this.canTrack = false;

    this.lorMessage.subscribe((res: [Deck, GameState, ExpeditionState, GameResult]) => {
      if(!this.connected) {
        this.connected = true;
      }
      if(!this.gameResult || JSON.stringify(res[3]) !== JSON.stringify(this.gameResult)){
        this.gameResult = res[3];
        if(this.canTrack) {
          console.log('Game result changed');
          if(this.gameResult.GameID >= 0) {
            if(this.gameResult.LocalPlayerWon) {
              userData.addWin(this.deck);
              console.log('You won !!');
            } else {
              userData.addLoose(this.deck);
              console.log('You Lost');
            }
          }
        }   
      }
      if(!this.canTrack) {
        this.canTrack = true;
        console.log('you are now tracking your games');
      }
      if(!this.deck || JSON.stringify(res[0]) !== JSON.stringify(this.deck)){
        console.log('Deck changed');
        this.deck = res[0];
      }
      if(!this.gameState || JSON.stringify(res[1]) !== JSON.stringify(this.gameState)){
        console.log('Game state changed')
        this.gameState = res[1];
      }
      if(!this.expeditionState || JSON.stringify(res[2]) !== JSON.stringify(this.expeditionState)){
        console.log('Expedition state changed')
        this.expeditionState = res[2];
      }
    })

    this.lorConnection.subscribe(res => {
      console.log('connected: ' + res);
      this.connected = res;
      this.canTrack = false;
      console.log('Doesn\'t track game result anymore');
    })
  }
}
