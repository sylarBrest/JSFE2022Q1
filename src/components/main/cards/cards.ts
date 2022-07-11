import './cards.scss';

class Cards {
  public drawCards() {
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'cards';
    document.getElementsByClassName('main-container')[0].append(cardsContainer);
  }
}

export default Cards;