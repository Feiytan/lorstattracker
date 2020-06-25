export class CardInDeck {
    public code: string;
    public count: number;
    constructor(data: [string, number]) {
        this.code = data[0];
        this.count = data[1];
    }
}
