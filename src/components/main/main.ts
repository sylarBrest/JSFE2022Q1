import './main.scss';

import Filters from './filters/filters';

class Main {
  private filters: Filters;
  constructor() {
    this.filters = new Filters();
  }

  public drawMain() {
    this.filters.drawFilters();
  }
}

export default Main;