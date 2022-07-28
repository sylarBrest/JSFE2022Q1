import { VoidEmptyFunction } from '@components/types';

interface Searching {
  searchOnPage(): void;
}

class Searching implements Searching {
  private bikeCards: HTMLCollectionOf<HTMLDivElement>;

  constructor() {
    this.bikeCards = document.getElementsByClassName('card') as HTMLCollectionOf<HTMLDivElement>;
  }

  public searchOnPage(): void {
    const inputSearch = document.getElementsByClassName('search')[0] as HTMLInputElement;
    const noResults = document.getElementsByClassName('no-results')[0] as HTMLParagraphElement;

    const searchInDataSets: VoidEmptyFunction = () => {
      for (let index = 0; index < this.bikeCards.length; index += 1) {
        const element: HTMLDivElement = this.bikeCards[index] as HTMLDivElement;
        const name: string = element.getElementsByClassName('card-name')[0].textContent?.toLowerCase() as string;

        if (!name.includes(inputSearch.value)) {
          element.classList.add('unfiltered');
        } else if (element.classList.contains('unfiltered')) {
          element.classList.remove('unfiltered');
        }
      }

      let num = 0;
      for (let index = 0; index < this.bikeCards.length; index += 1) {
        const card: HTMLDivElement = this.bikeCards[index];
        if (card.className.split(' ').some((el: string) => /unfiltered(\d)*/.test(el))) num += 1;
      }

      if (num === this.bikeCards.length) {
        noResults.style.display = 'block';
      } else {
        noResults.style.display = 'none';
      }
    };

    inputSearch.addEventListener('input', searchInDataSets);
  }
}

export default Searching;
