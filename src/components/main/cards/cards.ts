import './cards.scss';
import Card from './card/card';

class Cards {
  private card: Card;

  constructor() {
    this.card = new Card();
  }

  public drawCards() {
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'cards';
    document.getElementsByClassName('main-container')[0].append(cardsContainer);
    this.card.drawCard();
  }
}

export default Cards;