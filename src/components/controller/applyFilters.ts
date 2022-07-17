import BikeStorage from './bikeStorage';

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
  private bikeStorage: BikeStorage;

  constructor() {
    this.filters = {
      manufacturers: [],
      wheelSize: [],
      frameSize: [],
      colors: [],
      categories: [],
      popular: false
    };
    this.bikeCards = document.getElementsByClassName('card') as HTMLCollectionOf<HTMLDivElement>;
    this.popularFilter = document.getElementsByClassName('checkbox-popular');
    this.manufacturerFilter = document.getElementsByClassName('checkbox-manufacturer');
    this.bikeStorage = new BikeStorage(this.bikeCards);
  }

/* TODO:
  1. Помещать в найденные по условию датасета, написать для этого функцию
  2. Аналогично у аделнием из найденных


   */
  public applyFilters(): void {

    this.bikeStorage.initBikeStorage();
    console.log(this.bikeStorage)
    const checkAndApply = () => {
      const allBikes = this.bikeStorage.getBikesFromStorage();
      let foundBikes: HTMLDivElement[] = [];
      this.bikeStorage.setBikesToRemovedStorage(allBikes);
      let lostBikes = this.bikeStorage.getBikesFromRemovedStorage();

      for (let index: number = 0; index < this.bikeCards.length; index += 1) {
        const element = this.bikeCards[index] as HTMLDivElement;
        
        if (this.filters.popular) {
          if (element.getElementsByClassName('card-popular')[0].textContent?.split(': ')[1] === 'нет')
            if (!foundBikes.includes(element)) {
              console.log(element)
              foundBikes.push(element);
              console.log(foundBikes)
            }
            lostBikes = lostBikes.filter((el) => el !== element);
          } else {
          if (foundBikes.includes(element)) {
            foundBikes = foundBikes.filter((el) => el !== element);
          }
          lostBikes.push(element);
        }

        if (this.filters.manufacturers.length > 0) {
          const manName = element.getElementsByClassName('card-manufacturer')[0].textContent?.split(': ')[1] as string;
          if (!this.filters.manufacturers.includes(manName)) {
            if (!foundBikes.includes(element)) {
              foundBikes.push(element);
              lostBikes = lostBikes.filter((el) => el !== element);
            }
          } else {
            if (foundBikes.includes(element)) {
              foundBikes = foundBikes.filter((el) => el !== element);
              lostBikes.push(element);
            }
          }
        } else {
          if (foundBikes.includes(element)) {
            foundBikes = foundBikes.filter((el) => el !== element);
            lostBikes.push(element);
          }
        }
      }

      console.log('f', foundBikes, 'l', lostBikes);
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