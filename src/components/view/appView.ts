import Main from './main/main';
import Footer from './footer/footer';
import Header from './header/header';

interface AppView {
  drawComponents(): void;
}

class AppView implements AppView {
  private main: Main;

  private footer: Footer;

  private header: Header;

  constructor() {
    this.main = new Main();
    this.footer = new Footer();
    this.header = new Header();
  }

  public drawComponents(): void {
    this.header.drawHeader();
    this.main.drawMain();
    this.footer.drawFooter();
  }
}

export default AppView;
