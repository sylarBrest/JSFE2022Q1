import AppView from './view/appView';
import MakeSearch from './controller/makeSearch';
import Shopping from './controller/shop';
import Filters from './controller/applyFilters';
import Sorting from './controller/makeSort';
import Resetting from './controller/makeReset';

interface App {
  start(): void;
}

class App implements App {
  private search: MakeSearch;

  private appView: AppView;

  private shopping: Shopping;

  private filters: Filters;

  private sorting: Sorting;

  private resetting: Resetting;

  constructor() {
    this.search = new MakeSearch();
    this.appView = new AppView();
    this.shopping = new Shopping();
    this.filters = new Filters();
    this.sorting = new Sorting();
    this.resetting = new Resetting();
  }

  public start(): void {
    this.appView.drawComponents();
    this.sorting.sortElements();
    this.search.searchOnPage();
    this.shopping.makeShopping();
    this.filters.applyFilters();
    this.resetting.resetFilters();
  }
}

export default App;
