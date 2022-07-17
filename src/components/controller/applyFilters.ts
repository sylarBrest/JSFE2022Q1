interface BikeFilterObject {
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
  private bikeCards;
  private popularFilter;
  private manufacturerFilter;
  private wheelSizeFilter;
  private frameSizeFilter;

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
    this.wheelSizeFilter = document.getElementsByClassName('checkbox-wheels');
    this.frameSizeFilter = document.getElementsByClassName('checkbox-frame');
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

        if (this.filters.wheelSize.length > 0) {
          const wheelSize = element.getElementsByClassName('card-wheel-size')[0].textContent?.split(': ')[1].replace('"', '') as string;
          if (!this.filters.wheelSize.includes(wheelSize)) {
            if (!element.classList.contains('unfiltered3'))
              element.classList.add('unfiltered3');
          } else {
            if (element.classList.contains('unfiltered3'))
              element.classList.remove('unfiltered3');
          }
        } else {
          if (element.classList.contains('unfiltered3'))
            element.classList.remove('unfiltered3');
        }

        if (this.filters.frameSize.length > 0) {
          const frameSize = element.getElementsByClassName('card-frame-size')[0].textContent?.split(': ')[1] as string;
          if (!this.filters.frameSize.includes(frameSize)) {
            if (!element.classList.contains('unfiltered4'))
              element.classList.add('unfiltered4');
          } else {
            if (element.classList.contains('unfiltered4'))
              element.classList.remove('unfiltered4');
          }
        } else {
          if (element.classList.contains('unfiltered4'))
            element.classList.remove('unfiltered4');
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
        this.filters.manufacturers.push(manF.value)     
      } else {
        this.filters.manufacturers = this.filters.manufacturers.filter((el) => el !== manF.value);
      }

      checkAndApply();
    }

    const applyWheelSizeFilter = (e: Event) => {
      const wheelF = e.target as HTMLInputElement;

      if (wheelF.checked) {
        this.filters.wheelSize.push(wheelF.value)     
      } else {
        this.filters.wheelSize = this.filters.wheelSize.filter((el) => el !== wheelF.value);
      }

      checkAndApply();
    }

    const applyFrameSizeFilter = (e: Event) => {
      const frameF = e.target as HTMLInputElement;

      if (frameF.checked) {
        this.filters.frameSize.push(frameF.value);   
      } else {
        this.filters.frameSize = this.filters.frameSize.filter((el) => el !== frameF.value);
      }

      checkAndApply();
    }

    // All listeners
    this.popularFilter.item(0)?.addEventListener('click', applyPopularFilter);
    for (const element of this.manufacturerFilter) {
      element.addEventListener('click', applyManufacturerFilter);
    }
    for (const element of this.wheelSizeFilter) {
      element.addEventListener('click', applyWheelSizeFilter);
    }
    for (const element of this.frameSizeFilter) {
      element.addEventListener('click', applyFrameSizeFilter);
    }
  }
}

export default Filters;