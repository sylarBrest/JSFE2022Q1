import {
  BikeFilterObject,
  VoidEmptyFunction,
  VoidEventParamFunction,
  UnionFilters,
} from '@components/types';
import { FILTER_NAMES, CLASS_NAMES } from '@components/constants';
import Utils from '@components/helpers/utils';

interface Filtering {
  resetFilters(): void;
  applyFilters(): void;
}

class Filtering implements Filtering {
  private filters: BikeFilterObject;
  private bikeCards: HTMLCollectionOf<HTMLDivElement>;
  private popularFilter: HTMLCollectionOf<HTMLInputElement>;
  private manufacturerFilter: HTMLCollectionOf<HTMLInputElement>;
  private wheelSizeFilter: HTMLCollectionOf<HTMLInputElement>;
  private frameSizeFilter: HTMLCollectionOf<HTMLInputElement>;
  private colorFilter: HTMLCollectionOf<HTMLInputElement>;
  private categoryFilter: HTMLCollectionOf<HTMLInputElement>;

  constructor() {
    this.filters = {
      manufacturers: [],
      wheelSize: [],
      frameSize: [],
      colors: [],
      categories: [],
      popular: false,
    };
    this.bikeCards = document.getElementsByClassName('card') as HTMLCollectionOf<HTMLDivElement>;
    this.popularFilter = document.getElementsByClassName('checkbox-popular') as HTMLCollectionOf<HTMLInputElement>;
    this.manufacturerFilter = document.getElementsByClassName('checkbox-manufacturer') as HTMLCollectionOf<HTMLInputElement>;
    this.wheelSizeFilter = document.getElementsByClassName('checkbox-wheels') as HTMLCollectionOf<HTMLInputElement>;
    this.frameSizeFilter = document.getElementsByClassName('checkbox-frame') as HTMLCollectionOf<HTMLInputElement>;
    this.colorFilter = document.getElementsByClassName('checkbox-color') as HTMLCollectionOf<HTMLInputElement>;
    this.categoryFilter = document.getElementsByClassName('checkbox-category') as HTMLCollectionOf<HTMLInputElement>;
  }

  public resetFilters(): void {
    this.filters = {
      manufacturers: [],
      wheelSize: [],
      frameSize: [],
      colors: [],
      categories: [],
      popular: false,
    };
  }

  public applyFilters(): void {
    const checkAndApply: VoidEmptyFunction = () => {
      for (let index = 0; index < this.bikeCards.length; index += 1) {
        const element: HTMLDivElement = this.bikeCards[index] as HTMLDivElement;

        if (this.filters.popular) {
          if (element.getElementsByClassName('card-popular')[0].textContent?.split(': ')[1] === 'нет') {
            if (!element.classList.contains('unfiltered1')) element.classList.add('unfiltered1');
          }
        } else if (element.classList.contains('unfiltered1')) element.classList.remove('unfiltered1');

        FILTER_NAMES.forEach((filter, ind) => {
          if (this.filters[filter].length > 0) {
            const value: string = element.getElementsByClassName(`card-${CLASS_NAMES[ind]}`)[0].textContent?.split(': ')[1].replace('"', '') || '';
            if (!this.filters[filter].includes(value)) {
              if (!element.classList.contains(`unfiltered${ind + 2}`)) element.classList.add(`unfiltered${ind + 2}`);
            } else if (element.classList.contains(`unfiltered${ind + 2}`)) element.classList.remove(`unfiltered${ind + 2}`);
          } else if (element.classList.contains(`unfiltered${ind + 2}`)) element.classList.remove(`unfiltered${ind + 2}`);
        });
      }

      Utils.displayNoResultsStub();
    };

    const applyPopularFilter: VoidEmptyFunction = () => {
      this.filters.popular = !this.filters.popular;

      checkAndApply();
    };

    const applyFilterByParam: VoidEventParamFunction = (e: Event, param: UnionFilters) => {
      const filter: HTMLInputElement = e.target as HTMLInputElement;

      if (filter.checked) {
        (this.filters[param] as string[]).push(filter.value);
      } else {
        this.filters[param] = (this.filters[param] as string[]).filter((el) => el !== filter.value);
      }

      checkAndApply();
    };

    // All listeners
    this.popularFilter.item(0)?.addEventListener('click', applyPopularFilter);

    for (let index = 0; index < this.manufacturerFilter.length; index += 1) {
      this.manufacturerFilter[index].addEventListener('click', (e: Event) => applyFilterByParam(e, 'manufacturers'));
    }

    for (let index = 0; index < this.wheelSizeFilter.length; index += 1) {
      this.wheelSizeFilter[index].addEventListener('click', (e: Event) => applyFilterByParam(e, 'wheelSize'));
    }

    for (let index = 0; index < this.frameSizeFilter.length; index += 1) {
      this.frameSizeFilter[index].addEventListener('click', (e: Event) => applyFilterByParam(e, 'frameSize'));
    }

    for (let index = 0; index < this.colorFilter.length; index += 1) {
      this.colorFilter[index].addEventListener('click', (e: Event) => applyFilterByParam(e, 'colors'));
    }

    for (let index = 0; index < this.categoryFilter.length; index += 1) {
      this.categoryFilter[index].addEventListener('click', (e: Event) => applyFilterByParam(e, 'categories'));
    }
  }
}

export default Filtering;
