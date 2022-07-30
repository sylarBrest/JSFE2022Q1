import { VoidEmptyFunction } from '@components/types';
import Utils from '@components/helpers/utils';

interface Searching {
  searchOnPage(): void;
}

class Searching implements Searching {
  private bikeCards: HTMLCollectionOf<HTMLDivElement>;

  constructor() {
    this.bikeCards = <HTMLCollectionOf<HTMLDivElement>>document.getElementsByClassName('card');
  }

  public searchOnPage(): void {
    const inputSearch = <HTMLInputElement>document.getElementsByClassName('search')[0];

    const searchInDataSets: VoidEmptyFunction = () => {
      Array.from(this.bikeCards).forEach((card: HTMLDivElement) => {
        const name: string = card.getElementsByClassName('card-name')[0].textContent?.toLowerCase() || '';

        if (!name.includes(inputSearch.value.toLowerCase())) {
          card.classList.add('unfiltered');
        } else {
          Utils.changeElementClassList(card, 'unfiltered', 'remove');
        }
      });

      Utils.displayNoResultsStub();
    };

    inputSearch.addEventListener('input', searchInDataSets);
  }
}

export default Searching;
