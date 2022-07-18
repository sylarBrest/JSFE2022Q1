import Main from './main/main';
import Footer from './footer/footer';
import Header from './header/header';

class AppView {
  private main: Main;

  private footer: Footer;

  private header: Header;

  constructor() {
    this.main = new Main();
    this.footer = new Footer();
    this.header = new Header();
  }

  public drawComponents() {
    this.header.drawHeader();
    this.main.drawMain();
    this.footer.drawFooter();
  }
}

export default AppView;
