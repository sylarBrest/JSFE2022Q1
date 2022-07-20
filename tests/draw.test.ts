import Footer from '../src/components/view/footer/footer';
import Header from '../src/components/view/header/header';
import Card from '../src/components/view/main/cards/card/card';
import Reset from '../src/components/view/main/filters/reset/reset';

describe('Draw Components', () => {
  it('should draw header', () => {
    const header = document.createElement('header');
    header.className = 'header';
    document.body.append(header);
    new Header().drawHeader();
    const result = document.getElementsByClassName('header')[0].innerHTML;
    const fragment = `<div class="container header-container"><div class="store-logo"></div><h1 class="store-name">Bicycle Online Store</h1><div class="store-cart"><p class="store-cart-count"><span class="store-cart-count-number">0</span></p></div></div>`;
    expect(result).toContain(fragment);
  });

  it('should draw footer', () => {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    document.body.append(footer);
    new Footer().drawFooter();
    const result = document.getElementsByClassName('footer')[0].innerHTML;
    const fragment = `<div class="container footer-container"><div class="footer-data"><span class="copy-year">© 2022</span><span class="github"><a class="github-link" href="https://github.com/sylarBrest" target="_blank" rel="noopener noreferrer">sylarBrest</a></span></div><a class="rss-logo" href="https://rs.school/js-stage0/" target="_blank" rel="noopener noreferrer" title="Rolling Scope School"></a></div>`;
    expect(result).toContain(fragment);
  });

  it('should draw card', () => {
    const cards = document.createElement('div');
    cards.className = 'cards';
    document.body.append(cards);
    new Card().drawCard();
    const result = document.getElementsByClassName('cards')[0].innerHTML;
    const fragment = `<div class="card" data-bike-num="18"><h2 class="card-name">AIST Tracker 2.0</h2><img class="card-image" alt="AIST Tracker 2.0" src="./assets/images/aist-tracker.webp"><div class="card-info-all"><div class="card-info"><p class="card-manufacturer">Производитель: AIST</p><p class="card-year">Модельный год: 2018</p><p class="card-category">Категория: Городской</p><p class="card-wheel-size">Размер колёс: 26"</p><p class="card-frame-size">Размер рамы: S</p><p class="card-color">Цвет: оранжевый</p><p class="card-stock-amount">Количество на складе: 20</p><p class="card-popular">Популярный: да</p></div><div class="card-bag"></div></div></div>`;
    expect(result).toContain(fragment);
  });

  it('should draw reset button', () => {
    const filters = document.createElement('div');
    filters.className = 'filters';
    document.body.append(filters);
    new Reset().drawResetButtons();
    const result = document.getElementsByClassName('filters')[0].innerHTML;
    const fragment = `<button class="reset-button reset-filters-button">Сбросить фильтры</button>`;
    expect(result).toContain(fragment);
  });
});
