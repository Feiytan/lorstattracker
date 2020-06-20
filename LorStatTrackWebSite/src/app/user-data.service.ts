import { Injectable } from '@angular/core';
import { UserDeck } from './models/user-deck';
import { Deck } from './models/deck';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  public userDecks: UserDeck[];

  constructor() {
    this.initUserDecks();
  }

  public initUserDecks() {
    this.userDecks = JSON.parse(localStorage.getItem('userDecks'));
    if(!this.userDecks) {
      this.userDecks = [];
    }
  }

  public saveUserDecks() {
    localStorage.setItem('userDecks', JSON.stringify(this.userDecks));
  }

  public addWin(deck: Deck) {
    let winnerDeck = this.userDecks.find(d => d.DeckCode === deck.DeckCode);
    if(winnerDeck) {
      winnerDeck.wins++;
    } else {
      let newDeck = new UserDeck(deck);
      newDeck.wins++;
      this.userDecks.push(newDeck);
    }
    this.saveUserDecks();
  }

  public addLoose(deck: Deck) {
    let looserDeck = this.userDecks.find((d: UserDeck) => d.DeckCode === deck.DeckCode);
    if(looserDeck) {
      looserDeck.looses++;
    } else {
      let newDeck = new UserDeck(deck);
      newDeck.looses++;
      this.userDecks.push(newDeck);
    }
    this.saveUserDecks();
  }
}
