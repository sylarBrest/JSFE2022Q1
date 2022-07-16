import BikeStorage from './bikeStorage';

interface Sorting {
  sortElements(): void;
}

class Sorting implements Sorting {
  private bikeCards: HTMLCollectionOf<HTMLDivElement>;
  private bikeStorage: BikeStorage;

  constructor() {
    this.bikeCards = document.getElementsByClassName('card') as HTMLCollectionOf<HTMLDivElement>;
    this.bikeStorage = new BikeStorage(this.bikeCards);
  }
  
  sortElements(): void {
    const sortOptions = document.getElementsByClassName('sort')[0] as HTMLSelectElement;

    this.bikeStorage.initBikeStorage();
    
    const sortBy = () => {
      const allBikes = this.bikeStorage.getBikesFromStorage();

      this.bikeStorage.removeBikesFromStorage();

      switch (sortOptions.selectedOptions[0]) {
        case sortOptions.options[0]:
          allBikes.sort((a, b) => ((a.dataset.bikeName?.toLowerCase() as string) < (b.dataset.bikeName?.toLowerCase() as string) ? -1 : 1));
          break;
        case sortOptions.options[1]:
          allBikes.sort((a, b) => ((a.dataset.bikeName?.toLowerCase() as string) > (b.dataset.bikeName?.toLowerCase() as string) ? -1 : 1));
          break;
        case sortOptions.options[2]:
          allBikes.sort((a, b) => {
            const yearA = a.getElementsByClassName('card-year')[0].textContent?.split(': ')[1] as string;
            const yearB = b.getElementsByClassName('card-year')[0].textContent?.split(': ')[1] as string;
            return (yearA < yearB) ? -1 : 1;
          });
          break;
        case sortOptions.options[3]:
          allBikes.sort((a, b) => {
            const yearA = a.getElementsByClassName('card-year')[0].textContent?.split(': ')[1] as string;
            const yearB = b.getElementsByClassName('card-year')[0].textContent?.split(': ')[1] as string;
            return (yearA > yearB) ? -1 : 1;
          });
          break;
        default:
          break;
      }

      this.bikeStorage.writeBikeStorageToDOM(allBikes);
    }

    sortOptions.addEventListener('change', sortBy);
  }
}

export default Sorting;