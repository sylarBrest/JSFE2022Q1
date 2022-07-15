export default class MakeSearch {
  public searchOnPage() {
    const bikeCards = document.getElementsByClassName('card');
    const inputSearch = document.getElementsByClassName('search')[0] as HTMLInputElement;
    const noResults = document.getElementsByClassName('no-results')[0] as HTMLElement;

    function searchInDataSets(): void {
      let count = 0;
      for (let index: number = 0; index < bikeCards.length; index++) {
        const element = bikeCards[index] as HTMLDivElement;
        element.style.display = 'flex';
        if (!element.dataset.bikeName?.toLowerCase().includes(inputSearch.value)) {
          element.style.display = 'none';
          count += 1;
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