import AppView from './view/appView';
import MakeSearch from './controller/makeSearch';
import Shopping from './controller/shop';

interface App {
  start(): void;
}

class App implements App{
  private search: MakeSearch;
  private appView: AppView;
  private shopping: Shopping;

  constructor() {
    this.search = new MakeSearch();
    this.appView = new AppView();
    this.shopping = new Shopping();
  }

  public start(): void {
    this.appView.drawComponents();
    this.search.searchOnPage();
    this.shopping.makeShopping();
  }
}

export default App;