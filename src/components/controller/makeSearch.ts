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
      for (let index = 0; index < this.bikeCards.length; index += 1) {
        const element: HTMLDivElement = this.bikeCards[index] as HTMLDivElement;
        const name: string = element.getElementsByClassName('card-name')[0].textContent?.toLowerCase() || '';

        if (!name.includes(inputSearch.value)) {
          element.classList.add('unfiltered');
        } else if (element.classList.contains('unfiltered')) {
          element.classList.remove('unfiltered');
        }
      }

      Utils.displayNoResultsStub();
    };

    inputSearch.addEventListener('input', searchInDataSets);
  }
}

export default Searching;
