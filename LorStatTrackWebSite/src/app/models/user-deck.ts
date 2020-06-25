import { Deck } from './deck';
import { CardInDeck } from './card-in-deck';


export class UserDeck {
    public name: string;
    public wins: number;
    public looses: number;
    public cardsInDeck: CardInDeck[];
    public deckImage: CardInDeck;
    public deckCode: string;

    constructor(deck: Deck) {
        this.deckCode = deck.DeckCode;
        this.cardsInDeck = Object.entries(deck.CardsInDeck).map(card => new CardInDeck(card))
        this.name = 'No name';
        this.wins = 0;
        this.looses = 0;
        this.deckImage = this.cardsInDeck[this.cardsInDeck.length - 1];
    }

}
