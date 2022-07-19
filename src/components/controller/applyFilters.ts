import { BikeFilterObject, VoidEmptyFunction, VoidEventParamFunction } from '../types';

interface Filters {
  resetFilters(): void;
  applyFilters(): void;
}

class Filters implements Filters {
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

        const myFilters: string[] = ['manufacturers', 'wheelSize', 'frameSize', 'colors', 'categories'];

        const myClass: string[] = ['manufacturer', 'wheel-size', 'frame-size', 'color', 'category'];

        for (let ind = 0; ind < myFilters.length; ind += 1) {
          if ((this.filters[myFilters[ind]] as string[]).length > 0) {
            const value = element.getElementsByClassName(`card-${myClass[ind]}`)[0].textContent?.split(': ')[1].replace('"', '') as string;
            if (!(this.filters[myFilters[ind]] as string[]).includes(value)) {
              if (!element.classList.contains(`unfiltered${ind + 2}`)) element.classList.add(`unfiltered${ind + 2}`);
            } else if (element.classList.contains(`unfiltered${ind + 2}`)) element.classList.remove(`unfiltered${ind + 2}`);
          } else if (element.classList.contains(`unfiltered${ind + 2}`)) element.classList.remove(`unfiltered${ind + 2}`);
        }
      }

      let num = 0;
      for (let index = 0; index < this.bikeCards.length; index += 1) {
        const card: HTMLDivElement = this.bikeCards[index];
        if (card.className.split(' ').some((el: string) => /unfiltered(\d)*/.test(el))) num += 1;
      }

      if (num === this.bikeCards.length) {
        (document.getElementsByClassName('no-results')[0] as HTMLParagraphElement).style.display = 'block';
      } else {
        (document.getElementsByClassName('no-results')[0] as HTMLParagraphElement).style.display = 'none';
      }
    };

    const applyPopularFilter: VoidEmptyFunction = () => {
      this.filters.popular = !this.filters.popular;

      checkAndApply();
    };

    const applyFilterByParam: VoidEventParamFunction = (e: Event, param: string) => {
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

export default Filters;
