interface MakeSearch {
  searchOnPage(): void;
}

class MakeSearch implements MakeSearch {
  public searchOnPage(): void {
    const bikeCards = document.getElementsByClassName('card');
    const inputSearch = document.getElementsByClassName('search')[0] as HTMLInputElement;
    const noResults = document.getElementsByClassName('no-results')[0] as HTMLElement;

    function searchInDataSets(): void {
      let count = 0;

      for (let index: number = 0; index < bikeCards.length; index++) {
        const element = bikeCards[index] as HTMLDivElement;
        element.removeAttribute('hidden');
      
        if (element.classList.contains('unfiltered')) {
          count += 1;
        } else {
          if (!element.getElementsByClassName('card-name')[0].textContent?.toLowerCase().includes(inputSearch.value)) {
            element.setAttribute('hidden', '');
            count += 1;
          }
        }
      
        if (count === bikeCards.length) {
          noResults.style.display = 'block';
        } else {
          noResults.style.display = 'none';
        }
      }
    }

    inputSearch.addEventListener('input', searchInDataSets);
  }
}

export default MakeSearch;