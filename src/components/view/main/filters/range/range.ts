import './range.scss';

import noUiSlider, { API } from '../../../nouislider/nouislider';
import '../../../nouislider/nouislider.scss';
import bikes from '../../../../bikeData';

interface Slider {
  drawSliders(): void;
}

class Slider implements Slider {
  private bikeCards;

  constructor() {
    this.bikeCards = document.getElementsByClassName('card');
  }

  public drawSliders(): void {
    const rangesWindow: HTMLElement = document.createElement('div');
    rangesWindow.className = 'ranges-filter-container';
    document.getElementsByClassName('filters')[0].append(rangesWindow);
    this.drawSliderByYear(rangesWindow);
    this.drawSliderByStock(rangesWindow);
  }

  private workWithYearSlider(slider: API) {
    const doWithYearSlider = (values: string[]) => {
      const years = values.map((el) => +el.split('.')[0]);
      for (let index = 0; index < this.bikeCards.length; index += 1) {
        const element = this.bikeCards[index];
        const cardYear = element.getElementsByClassName('card-year')[0].textContent?.split(': ')[1] as string;
        const noResults = document.getElementsByClassName('no-results')[0] as HTMLParagraphElement;

        if ((+cardYear >= years[0])
          && (+cardYear <= years[1])) {
          if (element.classList.contains('unfiltered7')) {
            element.classList.remove('unfiltered7');
          }
        } else if (!element.classList.contains('unfiltered7')) {
          element.classList.add('unfiltered7');
        }

        let num = 0;
        for (let j = 0; j < this.bikeCards.length; j += 1) {
          const card = this.bikeCards[j];
          if (card.classList.length > 1) num += 1;
        }

        if (num === this.bikeCards.length) {
          noResults.style.display = 'block';
        } else {
          noResults.style.display = 'none';
        }
      }
    };

    slider.on('change', (values) => doWithYearSlider(values as string[]));
  }

  private workWithStockSlider(slider: API) {
    const doWithStockSlider = (values: string[]) => {
      const stocks = values.map((el) => +el.split('.')[0]);
      for (let index = 0; index < this.bikeCards.length; index += 1) {
        const element = this.bikeCards[index];
        const cardStock = element.getElementsByClassName('card-stock-amount')[0].textContent?.split(': ')[1] as string;
        const noResults = document.getElementsByClassName('no-results')[0] as HTMLParagraphElement;

        if ((+cardStock >= stocks[0])
          && (+cardStock <= stocks[1])) {
          if (element.classList.contains('unfiltered8')) {
            element.classList.remove('unfiltered8');
          }
        } else if (!element.classList.contains('unfiltered8')) {
          element.classList.add('unfiltered8');
        }

        let num = 0;
        for (let j = 0; j < this.bikeCards.length; j += 1) {
          const card = this.bikeCards[j];
          if (card.classList.length > 1) num += 1;
        }

        if (num === this.bikeCards.length) {
          noResults.style.display = 'block';
        } else {
          noResults.style.display = 'none';
        }
      }
    };

    slider.on('change', (values) => doWithStockSlider(values as string[]));
  }

  private drawSliderByYear(parent: HTMLElement): void {
    const yearName = document.createElement('p');
    yearName.classList.add('ranges-name', 'year-ranges-name');
    yearName.textContent = 'Модельный год';
    parent.append(yearName);

    const divSlider = document.createElement('div');
    divSlider.classList.add('slider', 'year-slider');
    const slider = noUiSlider.create(divSlider, {
      start: [Math.min(...bikes.map((el) => el.year)),
        Math.max(...bikes.map((el) => el.year))],
      range: {
        min: Math.min(...bikes.map((el) => el.year)),
        max: Math.max(...bikes.map((el) => el.year)),
      },
      step: 1,
      tooltips: [{
        from(value) {
          return +value;
        },
        to(value) {
          return value;
        },
      }, {
        from(value) {
          return +value;
        },
        to(value) {
          return value;
        },
      }],
      connect: true,
    });

    this.workWithYearSlider(slider);

    parent.append(divSlider);
  }

  public drawSliderByStock(parent: HTMLElement): void {
    const stockName = document.createElement('p');
    stockName.classList.add('ranges-name', 'stock-ranges-name');
    stockName.textContent = 'Количество на складе';
    parent.append(stockName);

    const divSlider = document.createElement('div');
    divSlider.classList.add('slider', 'stock-slider');
    const slider = noUiSlider.create(divSlider, {
      start: [Math.min(...bikes.map((el) => el.stock)),
        Math.max(...bikes.map((el) => el.stock))],
      range: {
        min: Math.min(...bikes.map((el) => el.stock)),
        max: Math.max(...bikes.map((el) => el.stock)),
      },
      step: 1,
      tooltips: [{
        from(value) {
          return +value;
        },
        to(value) {
          return value.toFixed(0);
        },
      }, {
        from(value) {
          return +value;
        },
        to(value) {
          return value.toFixed(0);
        },
      }],
      connect: true,
    });

    this.workWithStockSlider(slider);
    parent.append(divSlider);
  }
}

export default Slider;
