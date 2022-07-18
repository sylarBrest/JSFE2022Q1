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

  private colorFilter;

  private categoryFilter;

  constructor() {
    this.filters = {
      manufacturers: [],
      wheelSize: [],
      frameSize: [],
      colors: [],
      categories: [],
      popular: false,
    };
    this.bikeCards = document.getElementsByClassName('card');
    this.popularFilter = document.getElementsByClassName('checkbox-popular');
    this.manufacturerFilter = document.getElementsByClassName('checkbox-manufacturer');
    this.wheelSizeFilter = document.getElementsByClassName('checkbox-wheels');
    this.frameSizeFilter = document.getElementsByClassName('checkbox-frame');
    this.colorFilter = document.getElementsByClassName('checkbox-color');
    this.categoryFilter = document.getElementsByClassName('checkbox-category');
  }

  public applyFilters(): void {
    const checkAndApply = () => {
      for (let index = 0; index < this.bikeCards.length; index += 1) {
        const element = this.bikeCards[index] as HTMLDivElement;

        if (this.filters.popular) {
          if (element.getElementsByClassName('card-popular')[0].textContent?.split(': ')[1] === 'нет') {
            if (!element.classList.contains('unfiltered1')) element.classList.add('unfiltered1');
          }
        } else if (element.classList.contains('unfiltered1')) element.classList.remove('unfiltered1');

        if (this.filters.manufacturers.length > 0) {
          const manName = element.getElementsByClassName('card-manufacturer')[0].textContent?.split(': ')[1] as string;
          if (!this.filters.manufacturers.includes(manName)) {
            if (!element.classList.contains('unfiltered2')) element.classList.add('unfiltered2');
          } else if (element.classList.contains('unfiltered2')) element.classList.remove('unfiltered2');
        } else if (element.classList.contains('unfiltered2')) element.classList.remove('unfiltered2');

        if (this.filters.wheelSize.length > 0) {
          const wheelSize = element.getElementsByClassName('card-wheel-size')[0].textContent?.split(': ')[1].replace('"', '') as string;
          if (!this.filters.wheelSize.includes(wheelSize)) {
            if (!element.classList.contains('unfiltered3')) element.classList.add('unfiltered3');
          } else if (element.classList.contains('unfiltered3')) element.classList.remove('unfiltered3');
        } else if (element.classList.contains('unfiltered3')) element.classList.remove('unfiltered3');

        if (this.filters.frameSize.length > 0) {
          const frameSize = element.getElementsByClassName('card-frame-size')[0].textContent?.split(': ')[1] as string;
          if (!this.filters.frameSize.includes(frameSize)) {
            if (!element.classList.contains('unfiltered4')) element.classList.add('unfiltered4');
          } else if (element.classList.contains('unfiltered4')) element.classList.remove('unfiltered4');
        } else if (element.classList.contains('unfiltered4')) element.classList.remove('unfiltered4');

        if (this.filters.colors.length > 0) {
          const color = element.getElementsByClassName('card-color')[0].textContent?.split(': ')[1] as string;
          if (!this.filters.colors.includes(color)) {
            if (!element.classList.contains('unfiltered5')) element.classList.add('unfiltered5');
          } else if (element.classList.contains('unfiltered5')) element.classList.remove('unfiltered5');
        } else if (element.classList.contains('unfiltered5')) element.classList.remove('unfiltered5');

        if (this.filters.categories.length > 0) {
          const category = element.getElementsByClassName('card-category')[0].textContent?.split(': ')[1] as string;
          if (!this.filters.categories.includes(category)) {
            if (!element.classList.contains('unfiltered6')) element.classList.add('unfiltered6');
          } else if (element.classList.contains('unfiltered6')) element.classList.remove('unfiltered6');
        } else if (element.classList.contains('unfiltered6')) element.classList.remove('unfiltered6');

        let num = 0;
        for (let j = 0; j < this.bikeCards.length; j += 1) {
          const card = this.bikeCards[j];
          if (card.classList.length > 1) num += 1;
        }

        if (num === this.bikeCards.length) {
          (document.getElementsByClassName('no-results')[0] as HTMLElement).style.display = 'block';
        } else {
          (document.getElementsByClassName('no-results')[0] as HTMLElement).style.display = 'none';
        }
      }
    };

    const applyPopularFilter = () => {
      this.filters.popular = !this.filters.popular;

      checkAndApply();
    };

    const applyManufacturerFilter = (e: Event) => {
      const manF = e.target as HTMLInputElement;

      if (manF.checked) {
        this.filters.manufacturers.push(manF.value);
      } else {
        this.filters.manufacturers = this.filters.manufacturers.filter((el) => el !== manF.value);
      }

      checkAndApply();
    };

    const applyWheelSizeFilter = (e: Event) => {
      const wheelF = e.target as HTMLInputElement;

      if (wheelF.checked) {
        this.filters.wheelSize.push(wheelF.value);
      } else {
        this.filters.wheelSize = this.filters.wheelSize.filter((el) => el !== wheelF.value);
      }

      checkAndApply();
    };

    const applyFrameSizeFilter = (e: Event) => {
      const frameF = e.target as HTMLInputElement;

      if (frameF.checked) {
        this.filters.frameSize.push(frameF.value);
      } else {
        this.filters.frameSize = this.filters.frameSize.filter((el) => el !== frameF.value);
      }

      checkAndApply();
    };

    const applyColorFilter = (e: Event) => {
      const colorF = e.target as HTMLInputElement;

      if (colorF.checked) {
        this.filters.colors.push(colorF.value);
      } else {
        this.filters.colors = this.filters.colors.filter((el) => el !== colorF.value);
      }

      checkAndApply();
    };

    const applyCategoryFilter = (e: Event) => {
      const catF = e.target as HTMLInputElement;

      if (catF.checked) {
        this.filters.categories.push(catF.value);
      } else {
        this.filters.categories = this.filters.categories.filter((el) => el !== catF.value);
      }

      checkAndApply();
    };

    // All listeners
    this.popularFilter.item(0)?.addEventListener('click', applyPopularFilter);

    for (let index = 0; index < this.manufacturerFilter.length; index += 1) {
      this.manufacturerFilter[index].addEventListener('click', applyManufacturerFilter);
    }

    for (let index = 0; index < this.wheelSizeFilter.length; index += 1) {
      this.wheelSizeFilter[index].addEventListener('click', applyWheelSizeFilter);
    }

    for (let index = 0; index < this.frameSizeFilter.length; index += 1) {
      this.frameSizeFilter[index].addEventListener('click', applyFrameSizeFilter);
    }

    for (let index = 0; index < this.colorFilter.length; index += 1) {
      this.colorFilter[index].addEventListener('click', applyColorFilter);
    }

    for (let index = 0; index < this.categoryFilter.length; index += 1) {
      this.categoryFilter[index].addEventListener('click', applyCategoryFilter);
    }
  }
}

export default Filters;
