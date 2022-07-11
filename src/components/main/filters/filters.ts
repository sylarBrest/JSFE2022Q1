import './filters.scss';

import Values from "./values/values";

class Filters {
  private values: Values;
  constructor() {
    this.values = new Values();
  }

  public drawFilters() {
    const filters = document.createElement('section');
    filters.className = 'filters';
    document.getElementsByClassName('main-container')[0].append(filters);
    this.values.drawValues();
  }
}

export default Filters;