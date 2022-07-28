import * as Controllers from '@controller/index';
import AppView from '@view/appView';

interface App {
  start(): void;
}

class App implements App {
  private search: Controllers.Searching;
  private appView: AppView;
  private shopping: Controllers.Shopping;
  private filters: Controllers.Filtering;
  private sorting: Controllers.Sorting;
  private resetting: Controllers.Resetting;

  constructor() {
    this.search = new Controllers.Searching();
    this.appView = new AppView();
    this.shopping = new Controllers.Shopping();
    this.filters = new Controllers.Filtering();
    this.sorting = new Controllers.Sorting();
    this.resetting = new Controllers.Resetting();
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
