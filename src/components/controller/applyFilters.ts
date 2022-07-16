type BikeFilterObject = {
  manufacturers: string[],
  wheelSize: string[],
  frameSize: string[],
  colors: string[],
  categories: string[]
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
    };
    this.bikeCards = document.getElementsByClassName('card');
    this.popularFilter = document.getElementsByClassName('checkbox-popular') as HTMLCollectionOf<HTMLInputElement>;
    this.manufacturerFilter = document.getElementsByClassName('checkbox-manufacturer');
  }


  public applyFilters(): void {
    const applyPopularFilter = (e: Event) => {
      const popF = e.target as HTMLInputElement;
        
      if (popF.value === 'false') {
        for (let index: number = 0; index < this.bikeCards.length; index += 1) {
          const element = this.bikeCards[index] as HTMLDivElement;
          if (!(element.getElementsByClassName('card-popular')[0].textContent?.split(': ')[1] === 'да'))
            element.style.display = 'none';
          popF.value = 'true';
        }
      } else {
        for (let index: number = 0; index < this.bikeCards.length; index += 1) {
          const element = this.bikeCards[index] as HTMLDivElement;
          if (!(element.getElementsByClassName('card-popular')[0].textContent?.split(': ')[1] === 'да'))
            element.style.display = 'flex';
          popF.value = 'false';
        }
      }
    }

    const applyManufacturerFilter = (e: Event) => {
      const manF = e.target as HTMLInputElement;
      if (manF.checked) {
        this.filters['manufacturers'].push(manF.value)
        
      } else {
        this.filters.manufacturers = this.filters.manufacturers.filter((el) => el !== manF.value);
        
      }
    }

    this.popularFilter.item(0)?.addEventListener('click', applyPopularFilter);
    for (const element of this.manufacturerFilter) {
      element.addEventListener('click', applyManufacturerFilter);
    }
  }
}

export default Filters;