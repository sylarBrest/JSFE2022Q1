import { VoidEmptyFunction } from '../types';

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

  public sortElements(): void {
    const sortOptions: HTMLSelectElement = document.getElementsByClassName('sort')[0] as HTMLSelectElement;

    this.bikeStorage.initBikeStorage();

    const sortBy: VoidEmptyFunction = () => {
      const allBikes: HTMLDivElement[] = this.bikeStorage.getBikesFromStorage();

      this.bikeStorage.removeBikesFromStorage();

      switch (sortOptions.selectedOptions[0]) {
        case sortOptions.options[0]:
          allBikes.sort((a: HTMLDivElement, b: HTMLDivElement) => {
            const nameA: string = a.getElementsByClassName('card-name')[0].textContent?.toLowerCase() as string;
            const nameB: string = b.getElementsByClassName('card-name')[0].textContent?.toLowerCase() as string;
            return (nameA < nameB) ? -1 : 1;
          });
          break;
        case sortOptions.options[1]:
          allBikes.sort((a: HTMLDivElement, b: HTMLDivElement) => {
            const nameA: string = a.getElementsByClassName('card-name')[0].textContent?.toLowerCase() as string;
            const nameB: string = b.getElementsByClassName('card-name')[0].textContent?.toLowerCase() as string;
            return (nameA > nameB) ? -1 : 1;
          });
          break;
        case sortOptions.options[2]:
          allBikes.sort((a: HTMLDivElement, b: HTMLDivElement) => {
            const yearA: string = a.getElementsByClassName('card-year')[0].textContent?.split(': ')[1] as string;
            const yearB: string = b.getElementsByClassName('card-year')[0].textContent?.split(': ')[1] as string;
            return (yearA < yearB) ? -1 : 1;
          });
          break;
        case sortOptions.options[3]:
          allBikes.sort((a: HTMLDivElement, b: HTMLDivElement) => {
            const yearA: string = a.getElementsByClassName('card-year')[0].textContent?.split(': ')[1] as string;
            const yearB: string = b.getElementsByClassName('card-year')[0].textContent?.split(': ')[1] as string;
            return (yearA > yearB) ? -1 : 1;
          });
          break;
        default:
          break;
      }

      this.bikeStorage.writeBikeStorageToDOM(allBikes);
    };

    document.addEventListener('DOMContentLoaded', sortBy);
    sortOptions.addEventListener('change', sortBy);
    const checkBox: HTMLCollectionOf<HTMLInputElement> = document.getElementsByClassName('checkbox') as HTMLCollectionOf<HTMLInputElement>;

    for (let index = 0; index < checkBox.length; index += 1) {
      checkBox[index].addEventListener('click', sortBy);
    }
  }
}

export default Sorting;
