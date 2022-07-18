interface Shopping {
  makeShopping(): void;
}

class Shopping implements Shopping {
  private count: number;

  constructor() {
    this.count = 0;
  }

  public makeShopping(): void {
    const bikeCards = document.getElementsByClassName('card');

    const closeModal = (event: Event) => {
      if (event.target) {
        if (event.target instanceof HTMLElement) {
          if (event.target.classList.contains('darken')) {
            document.getElementsByClassName('modal')[0].classList.remove('open');
            document.getElementsByClassName('darken')[0].classList.remove('open');
            document.getElementsByTagName('body')[0].classList.remove('open');
          }
        }
      }
    };

    const styleCard = (e: Event): void => {
      const el = e.currentTarget as HTMLDivElement;
      const bagImage = el.getElementsByClassName('card-bag')[0] as HTMLDivElement;
      const countCart = document.getElementsByClassName('store-cart-count-number')[0] as HTMLSpanElement;

      if (bagImage.classList.contains('in-cart')) {
        bagImage.classList.remove('in-cart');
        el.classList.remove('in-cart');
        this.count -= 1;
      } else if (this.count < 20) {
        bagImage.classList.add('in-cart');
        el.classList.add('in-cart');
        this.count += 1;
      } else {
        document.getElementsByClassName('modal')[0].classList.add('open');
        document.getElementsByClassName('darken')[0].classList.add('open');
        document.getElementsByTagName('body')[0].classList.add('open');
      }
      countCart.textContent = `${this.count}`;
    };

    for (let index = 0; index < bikeCards.length; index += 1) {
      const element = bikeCards[index];
      element.addEventListener('click', (e: Event) => styleCard(e));
    }

    document.getElementsByClassName('darken')[0].addEventListener('click', closeModal);
  }
}

export default Shopping;
