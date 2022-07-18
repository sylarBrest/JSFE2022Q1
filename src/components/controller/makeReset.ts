import Search from '../view/main/filters/search/search';
import MakeSearch from './makeSearch';
import Values from '../view/main/filters/values/values';
import ApplyFilters from './applyFilters';
import Ranges from '../view/main/filters/range/range';

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

  resetFilters() {
    const resetFiltersButton = document.getElementsByClassName('reset-filters-button')[0] as HTMLButtonElement;
    const bikeCards = document.getElementsByClassName('card');

    const reDrawFilters = () => {
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
        const element = bikeCards[index];
        const unFil = ['unfiltered', 'unfiltered1', 'unfiltered2',
          'unfiltered3', 'unfiltered4', 'unfiltered5',
          'unfiltered6', 'unfiltered7', 'unfiltered8'];

        for (let j = 0; j < unFil.length; j += 1) {
          if (element.classList.contains(unFil[j])) element.classList.remove(unFil[j]);
        }
      }

      const checkBoxes = document.getElementsByClassName('checkbox') as HTMLCollectionOf<HTMLInputElement>;

      for (let index = 0; index < checkBoxes.length; index += 1) {
        checkBoxes[index].checked = false;
      }

      const noResults = document.getElementsByClassName('no-results')[0] as HTMLParagraphElement;
      noResults.removeAttribute('style');
    };

    resetFiltersButton.addEventListener('click', reDrawFilters);
  }
}

export default Resetting;
