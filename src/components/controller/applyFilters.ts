type BikeFilterObject = {
  manufacturers: string[],
  wheelSize: string[],
  frameSize: string[],
  colors: string[],
  categories: string[],
  popular: boolean
}

interface Filters {
  applyFilters(): void;
}

class Filters implements Filters {
  private filters: BikeFilterObject;
  private popularFilter;
  private manufacturerFilter;
  private bikeCards;

  constructor() {
    this.filters = {
      manufacturers: [],
      wheelSize: [],
      frameSize: [],
      colors: [],
      categories: [],
      popular: false
    };
    this.bikeCards = document.getElementsByClassName('card');
    this.popularFilter = document.getElementsByClassName('checkbox-popular');
    this.manufacturerFilter = document.getElementsByClassName('checkbox-manufacturer');
  }

  public applyFilters(): void {

    const checkAndApply = () => {

      for (let index: number = 0; index < this.bikeCards.length; index += 1) {
        const element = this.bikeCards[index] as HTMLDivElement;
        
        if (this.filters.popular) {
          if (element.getElementsByClassName('card-popular')[0].textContent?.split(': ')[1] === 'нет')
            if (!element.classList.contains('unfiltered1'))
              element.classList.add('unfiltered1');
        } else {
          if (element.classList.contains('unfiltered1'))
            element.classList.remove('unfiltered1');
        }

        if (this.filters.manufacturers.length > 0) {
          const manName = element.getElementsByClassName('card-manufacturer')[0].textContent?.split(': ')[1] as string;
          if (!this.filters.manufacturers.includes(manName)) {
            if (!element.classList.contains('unfiltered2'))
              element.classList.add('unfiltered2');
          } else {
            if (element.classList.contains('unfiltered2'))
              element.classList.remove('unfiltered2');
          }
        } else {
          if (element.classList.contains('unfiltered2'))
            element.classList.remove('unfiltered2');
        }
      }
    }
  
    const applyPopularFilter = () => {
      this.filters.popular = !this.filters.popular;

      checkAndApply();
    }

    const applyManufacturerFilter = (e: Event) => {
      const manF = e.target as HTMLInputElement;

      if (manF.checked) {
        this.filters['manufacturers'].push(manF.value)     
      } else {
        this.filters.manufacturers = this.filters.manufacturers.filter((el) => el !== manF.value);  
      }

      checkAndApply();
    }

    // All listeners
    this.popularFilter.item(0)?.addEventListener('click', applyPopularFilter);
    for (const element of this.manufacturerFilter) {
      element.addEventListener('click', applyManufacturerFilter);
    }
  }
}

export default Filters;