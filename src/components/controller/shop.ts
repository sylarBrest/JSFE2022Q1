import { VoidEventFunction } from '@components/types';
import { MAX_BIKES_IN_CART } from '@components/constants';

interface Shopping {
  makeShopping(): void;
}

class Shopping implements Shopping {
  private count: number;

  constructor() {
    this.count = 0;
  }

  public makeShopping(): void {
    const bikeCards = <HTMLCollectionOf<HTMLDivElement>>document.getElementsByClassName('card');

    const closeModal: VoidEventFunction = (event: Event) => {
      if (event.target instanceof HTMLElement && event.target.classList.contains('darken')) {
        document.getElementsByClassName('modal')[0].classList.remove('open');
        document.getElementsByClassName('darken')[0].classList.remove('open');
        document.getElementsByTagName('body')[0].classList.remove('open');
      }
    };

    const styleCard: VoidEventFunction = (e: Event) => {
      const clickedCard = <HTMLDivElement>e.currentTarget;
      const bagImage = <HTMLDivElement>clickedCard.getElementsByClassName('card-bag')[0];
      const countCart = <HTMLSpanElement>document.getElementsByClassName('store-cart-count-number')[0];

      if (bagImage.classList.contains('in-cart')) {
        bagImage.classList.remove('in-cart');
        clickedCard.classList.remove('in-cart');
        this.count -= 1;
      } else if (this.count < MAX_BIKES_IN_CART) {
        bagImage.classList.add('in-cart');
        clickedCard.classList.add('in-cart');
        this.count += 1;
      } else {
        document.getElementsByClassName('modal')[0].classList.add('open');
        document.getElementsByClassName('darken')[0].classList.add('open');
        document.getElementsByTagName('body')[0].classList.add('open');
      }

      countCart.textContent = `${this.count}`;
    };

    Array.from(bikeCards).forEach((card) => {
      card.addEventListener('click', styleCard);
    });

    document.getElementsByClassName('darken')[0].addEventListener('click', closeModal);
  }
}

export default Shopping;
