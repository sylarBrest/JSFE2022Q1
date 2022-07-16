interface Sorting {
  sortElements(): void;
}

class Sorting implements Sorting {
  private bikeCards;

  constructor() {
    this.bikeCards = document.getElementsByClassName('card');
  }
  
  sortElements(): void {
    const sortOptions = document.getElementsByClassName('sort')[0] as HTMLSelectElement;
    const allBikes = [...this.bikeCards] as HTMLDivElement[];
    switch (sortOptions.selectedOptions[0]) {
      case sortOptions.options[0]: {
        for (const element of this.bikeCards) {
          element.remove();
        }
        allBikes.sort((a, b) => ((a.dataset.bikeName?.toLowerCase() as string) < (b.dataset.bikeName?.toLowerCase() as string) ? -1 : 1));
        document.getElementsByClassName('cards')[0].append(...allBikes);
        break;
      }
      default:
        break;
    }
  }
}

export default Sorting;