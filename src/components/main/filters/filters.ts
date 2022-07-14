import './filters.scss';

import Values from "./values/values";
import Slider from './range/range';
import Search from './search/search';
import Sort from './sort/sort';

class Filters {
  private values: Values;
  private range: Slider;
  private search: Search;
  private sort: Sort;
  constructor() {
    this.values = new Values();
    this.range = new Slider();
    this.search = new Search();
    this.sort = new Sort();
  }

  public drawFilters() {
    const filters = document.createElement('section');
    filters.className = 'filters';
    document.getElementsByClassName('main-container')[0].append(filters);
    this.search.drawSearchField();
    this.sort.drawSortField();
    this.values.drawValues();
    this.range.drawSliders();
  }
}

export default Filters;