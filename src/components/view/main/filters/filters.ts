import Values from './values/values';
import Slider from './range/range';
import Search from './search/search';
import Sort from './sort/sort';
import Reset from './reset/reset';

import './filters.scss';

class Filters {
  private values: Values;

  private range: Slider;

  private search: Search;

  private sort: Sort;

  private reset: Reset;

  constructor() {
    this.values = new Values();
    this.range = new Slider();
    this.search = new Search();
    this.sort = new Sort();
    this.reset = new Reset();
  }

  public drawFilters() {
    const filters = document.createElement('section');
    filters.className = 'filters';
    document.getElementsByClassName('main-container')[0].prepend(filters);
    this.search.drawSearchField();
    this.sort.drawSortField();
    this.values.drawValues();
    this.range.drawSliders();
    this.reset.drawResetButtons();
  }
}

export default Filters;
