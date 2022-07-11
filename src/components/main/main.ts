import './main.scss';

import Filters from './filters/filters';
import Cards from './cards/cards';

class Main {
  private filters: Filters;
  private cards: Cards;
  constructor() {
    this.filters = new Filters();
    this.cards = new Cards();
  }

  public drawMain() {
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('container', 'main-container');
    document.getElementsByClassName('main')[0].append(mainContainer);
    this.filters.drawFilters();
    this.cards.drawCards();
  }
}

export default Main;