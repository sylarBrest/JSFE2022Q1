import { VoidEmptyFunction } from '@components/types';
import { UNFILTERED_CLASSES } from '@components/constants';

import Search from '@view/main/filters/search/search';
import Values from '@view/main/filters/values/values';
import Ranges from '@view/main/filters/range/range';
import MakeSearch from './makeSearch';
import ApplyFilters from './applyFilters';

interface Resetting {
  resetFilters(): void;
}

class Resetting implements Resetting {
  private search: Search;
  private makeSearch: MakeSearch;
  private values: Values;
  private applyFilters: ApplyFilters;
  private ranges: Ranges;

  constructor() {
    this.search = new Search();
    this.makeSearch = new MakeSearch();
    this.values = new Values();
    this.applyFilters = new ApplyFilters();
    this.ranges = new Ranges();
  }

  public resetFilters(): void {
    const resetFiltersButton = <HTMLButtonElement>document.getElementsByClassName('reset-filters-button')[0];
    const bikeCards = <HTMLCollectionOf<HTMLDivElement>>document.getElementsByClassName('card');

    const reDrawFilters: VoidEmptyFunction = () => {
      document.getElementsByClassName('search-container')[0].remove();
      this.search.drawSearchField();
      this.makeSearch.searchOnPage();

      document.getElementsByClassName('values-filter-container')[0].remove();
      this.values.drawValues();
      this.applyFilters.resetFilters();
      this.applyFilters.applyFilters();

      document.getElementsByClassName('ranges-filter-container')[0].remove();
      this.ranges.drawSliders();

      for (let index = 0; index < bikeCards.length; index += 1) {
        const element: HTMLDivElement = bikeCards[index];

        UNFILTERED_CLASSES.forEach((unfilteredClass) => {
          if (element.classList.contains(unfilteredClass)) {
            element.classList.remove(unfilteredClass);
          }
        });
      }

      const noResults = <HTMLParagraphElement>document.getElementsByClassName('no-results')[0];
      noResults.removeAttribute('style');
    };

    resetFiltersButton.addEventListener('click', reDrawFilters);
  }
}

export default Resetting;
