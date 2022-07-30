import { VoidEmptyFunction } from '@components/types';
import Utils from '@components/helpers/utils';

import BikeStorage from './bikeStorage';

interface Sorting {
  sortElements(): void;
}

class Sorting implements Sorting {
  private bikeCards: HTMLCollectionOf<HTMLDivElement>;
  private bikeStorage: BikeStorage;

  constructor() {
    this.bikeCards = <HTMLCollectionOf<HTMLDivElement>>document.getElementsByClassName('card');
    this.bikeStorage = new BikeStorage(this.bikeCards);
  }

  public sortElements(): void {
    const sortOptions = <HTMLSelectElement>document.getElementsByClassName('sort')[0];

    this.bikeStorage.initBikeStorage();

    const sortBy: VoidEmptyFunction = () => {
      const allBikes: HTMLDivElement[] = this.bikeStorage.getBikesFromStorage();

      this.bikeStorage.removeBikesFromStorage();

      switch (sortOptions.selectedOptions[0]) {
        case sortOptions.options[0]:
          allBikes
            .sort((
              curBikeCard: HTMLDivElement,
              nextBikeCard: HTMLDivElement,
            ) => Utils.sortingFunction(
              curBikeCard.getElementsByClassName('card-name')[0].textContent?.toLowerCase() || '',
              nextBikeCard.getElementsByClassName('card-name')[0].textContent?.toLowerCase() || '',
            ));
          break;
        case sortOptions.options[1]:
          allBikes
            .sort((
              curBikeCard: HTMLDivElement,
              nextBikeCard: HTMLDivElement,
            ) => Utils.sortingFunction(
              curBikeCard.getElementsByClassName('card-name')[0].textContent?.toLowerCase() || '',
              nextBikeCard.getElementsByClassName('card-name')[0].textContent?.toLowerCase() || '',
              '>',
            ));
          break;
        case sortOptions.options[2]:
          allBikes
            .sort((
              curBikeCard: HTMLDivElement,
              nextBikeCard: HTMLDivElement,
            ) => Utils.sortingFunction(
              curBikeCard.getElementsByClassName('card-year')[0].textContent?.split(': ')[1] || '',
              nextBikeCard.getElementsByClassName('card-year')[0].textContent?.split(': ')[1] || '',
            ));
          break;
        case sortOptions.options[3]:
          allBikes
            .sort((
              curBikeCard: HTMLDivElement,
              nextBikeCard: HTMLDivElement,
            ) => Utils.sortingFunction(
              curBikeCard.getElementsByClassName('card-year')[0].textContent?.split(': ')[1] || '',
              nextBikeCard.getElementsByClassName('card-year')[0].textContent?.split(': ')[1] || '',
              '>',
            ));
          break;
        default:
          break;
      }

      this.bikeStorage.writeBikeStorageToDOM(allBikes);
    };

    document.addEventListener('DOMContentLoaded', sortBy);
    sortOptions.addEventListener('change', sortBy);
    const checkBox = <HTMLCollectionOf<HTMLInputElement>>document.getElementsByClassName('checkbox');

    Array.from(checkBox).forEach((checkbox) => {
      checkbox.addEventListener('click', sortBy);
    });
  }
}

export default Sorting;
