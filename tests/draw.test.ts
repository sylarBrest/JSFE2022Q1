import Footer from '../src/components/view/footer/footer';
import Header from '../src/components/view/header/header';

describe('Draw Components', () => {
  it('should drawHeader', () => {
    const header = document.createElement('header');
    header.className = 'header';
    document.body.append(header);
    new Header().drawHeader();
    const result = document.getElementsByClassName('header')[0].innerHTML;
    const fragment = `<div class="container header-container"><div class="store-logo"></div><h1 class="store-name">Bicycle Online Store</h1><div class="store-cart"><p class="store-cart-count"><span class="store-cart-count-number">0</span></p></div></div>`;
    expect(result).toContain(fragment);
  });

  it('should drawFooter', () => {
    const footer = document.createElement('footer');
    footer.className = 'footer';
    document.body.append(footer);
    new Footer().drawFooter();
    const result = document.getElementsByClassName('footer')[0].innerHTML;
    const fragment = `<div class="container footer-container"><div class="footer-data"><span class="copy-year">© 2022</span><span class="github"><a class="github-link" href="https://github.com/sylarBrest" target="_blank" rel="noopener noreferrer">sylarBrest</a></span></div><a class="rss-logo" href="https://rs.school/js-stage0/" target="_blank" rel="noopener noreferrer" title="Rolling Scope School"></a></div>`;
    expect(result).toContain(fragment);
  });
});
