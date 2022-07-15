import './header.scss';

interface Header {
  drawFooter(): void;
}

class Header implements Header {
  public drawHeader(): void {
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('container', 'header-container');
    
    const storeLogo = document.createElement('div');
    storeLogo.className = 'store-logo';

    const storeName = document.createElement('h1');
    storeName.className = 'store-name';
    storeName.textContent = 'Bicycle Online Store';

    const storeCart = document.createElement('div');
    storeCart.className = 'store-cart';

    const storeCartCount = document.createElement('p');
    storeCartCount.className = 'store-cart-count';

    const spanCount = document.createElement('span');
    spanCount.textContent = '3';

    storeCartCount.append(spanCount);
    storeCart.append(storeCartCount);

    headerContainer.append(storeLogo, storeName, storeCart);

    document.getElementsByClassName('header')[0].append(headerContainer);
  }
}

export default Header;