interface MakeSearch {
  searchOnPage(): void;
}

class MakeSearch implements MakeSearch {
  private bikeCards;

  constructor() {
    this.bikeCards = document.getElementsByClassName('card');
  }

  public searchOnPage(): void {
    const inputSearch = document.getElementsByClassName('search')[0] as HTMLInputElement;
    const noResults = document.getElementsByClassName('no-results')[0] as HTMLParagraphElement;

    const searchInDataSets = (): void => {
      for (let index = 0; index < this.bikeCards.length; index += 1) {
        const element = this.bikeCards[index] as HTMLDivElement;
        const name = element.getElementsByClassName('card-name')[0].textContent?.toLowerCase() as string;

        if (!name.includes(inputSearch.value)) {
          element.classList.add('unfiltered');
        } else if (element.classList.contains('unfiltered')) {
          element.classList.remove('unfiltered');
        }

        let num = 0;
        for (let j = 0; j < this.bikeCards.length; j += 1) {
          const card = this.bikeCards[j];
          if (card.classList.length > 1) num += 1;
        }

        if (num === this.bikeCards.length) {
          noResults.style.display = 'block';
        } else {
          noResults.style.display = 'none';
        }
      }
    };

    inputSearch.addEventListener('input', searchInDataSets);
  }
}

export default MakeSearch;
