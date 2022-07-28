import './header.scss';

interface Header {
  drawHeader(): void;
}

class Header implements Header {
  public drawHeader(): void {
    const headerContainer: HTMLDivElement = document.createElement('div');
    headerContainer.classList.add('container', 'header-container');

    const storeLogo: HTMLDivElement = document.createElement('div');
    storeLogo.className = 'store-logo';

    const storeName: HTMLHeadingElement = document.createElement('h1');
    storeName.className = 'store-name';
    storeName.textContent = 'Bicycle Online Store';

    const storeCart: HTMLDivElement = document.createElement('div');
    storeCart.className = 'store-cart';

    const storeCartCount: HTMLParagraphElement = document.createElement('p');
    storeCartCount.className = 'store-cart-count';

    const spanCount: HTMLSpanElement = document.createElement('span');
    spanCount.className = 'store-cart-count-number';
    spanCount.textContent = '0';

    storeCartCount.append(spanCount);

    storeCart.append(storeCartCount);

    headerContainer.append(storeLogo, storeName, storeCart);

    document.getElementsByClassName('header')[0].append(headerContainer);
  }
}

export default Header;
