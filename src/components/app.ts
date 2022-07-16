import AppView from './view/appView';
import MakeSearch from './controller/makeSearch';
import Shopping from './controller/shop';
import Filters from './controller/applyFilters';

interface App {
  start(): void;
}

class App implements App{
  private search: MakeSearch;
  private appView: AppView;
  private shopping: Shopping;
  private filters: Filters;

  constructor() {
    this.search = new MakeSearch();
    this.appView = new AppView();
    this.shopping = new Shopping();
    this.filters = new Filters();
  }

  public start(): void {
    this.appView.drawComponents();
    this.search.searchOnPage();
    this.shopping.makeShopping();
    this.filters.applyFilters();
  }
}

export default App;