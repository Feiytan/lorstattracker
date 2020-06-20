import { Deck } from './deck';

export class UserDeck extends Deck{
    public name: string;
    public wins: number;
    public looses: number;

    constructor(deck: Deck) {
        super(deck.DeckCode, deck.CardsInDeck);
        this.name = deck.DeckCode;
        this.wins = 0;
        this.looses = 0;
    }
}
