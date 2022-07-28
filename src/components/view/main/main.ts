import Filters from './filters/filters';
import Cards from './cards/cards';

import './main.scss';

class Main {
  private filters: Filters;
  private cards: Cards;

  constructor() {
    this.filters = new Filters();
    this.cards = new Cards();
  }

  public drawMain() {
    const main: HTMLElement = document.getElementsByClassName('main')[0] as HTMLElement;

    const mainContainer: HTMLDivElement = document.createElement('div');
    mainContainer.classList.add('container', 'main-container');
    main.append(mainContainer);
    this.filters.drawFilters();
    this.cards.drawCards();

    const modalWindow: HTMLDivElement = document.createElement('div');
    modalWindow.className = 'modal';

    const noMore: HTMLParagraphElement = document.createElement('p');
    noMore.className = 'no-more-buy';
    noMore.textContent = 'Извините, все слоты заполнены';

    modalWindow.append(noMore);

    const darkenWindow: HTMLDivElement = document.createElement('div');
    darkenWindow.className = 'darken';

    main.append(modalWindow, darkenWindow);
  }
}

export default Main;
