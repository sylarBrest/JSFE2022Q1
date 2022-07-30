import Utils from '@components/helpers/utils';
import noUiSlider, { API } from '@view/nouislider/nouislider';
import { VoidStringArrayFunction, BikeData } from '@components/types';
import { ClassNumbers } from '@components/constants';

import bikes from '@components/bikeData';

import './range.scss';
import '@view/nouislider/nouislider.scss';

interface Slider {
  drawSliders(): void;
}

class Slider implements Slider {
  private bikeCards: HTMLCollectionOf<HTMLDivElement>;

  constructor() {
    this.bikeCards = document.getElementsByClassName('card') as HTMLCollectionOf<HTMLDivElement>;
  }

  public drawSliders(): void {
    const rangesWindow: HTMLDivElement = document.createElement('div');
    rangesWindow.className = 'ranges-filter-container';
    document.getElementsByClassName('values-filter-container')[0].after(rangesWindow);

    this.drawSliderByYear(rangesWindow);
    this.drawSliderByStock(rangesWindow);
  }

  private workWithSlider(slider: API): void {
    const doWithSlider: VoidStringArrayFunction = (values: string[]) => {
      const startEnd: number[] = values.map((el: string) => +el.split('.')[0]);

      Array.from(this.bikeCards).forEach((card: HTMLDivElement) => {
        const property: string = slider.target.classList.contains('stock-slider') ? 'stock-amount' : 'year';
        const num: number = slider.target.classList.contains('stock-slider')
          ? ClassNumbers.Stock
          : ClassNumbers.Year;
        const cardProperty: string = card.getElementsByClassName(`card-${property}`)[0].textContent?.split(': ')[1] || '';

        if ((+cardProperty >= startEnd[0]) && (+cardProperty <= startEnd[1])) {
          Utils.changeElementClassList(card, `unfiltered${num}`, 'remove');
        } else Utils.changeElementClassList(card, `unfiltered${num}`, 'add');
      });

      Utils.displayNoResultsStub();
    };

    slider.on('change', (values) => doWithSlider(values as string[]));
  }

  private drawSliderByYear(parent: HTMLElement): void {
    const yearName: HTMLParagraphElement = document.createElement('p');
    yearName.classList.add('ranges-name', 'year-ranges-name');
    yearName.textContent = 'Модельный год';

    parent.append(yearName);

    const divSlider: HTMLDivElement = document.createElement('div');
    divSlider.classList.add('slider', 'year-slider');

    const slider: API = noUiSlider.create(divSlider, {
      start: [Math.min(...bikes.map((el: BikeData) => el.year)),
        Math.max(...bikes.map((el: BikeData) => el.year))],
      range: {
        min: Math.min(...bikes.map((el: BikeData) => el.year)),
        max: Math.max(...bikes.map((el: BikeData) => el.year)),
      },
      step: 1,
      tooltips: [{
        from(value: string) {
          return +value;
        },
        to(value: number) {
          return value;
        },
      }, {
        from(value: string) {
          return +value;
        },
        to(value: number) {
          return value;
        },
      }],
      connect: true,
    });

    this.workWithSlider(slider);

    parent.append(divSlider);
  }

  private drawSliderByStock(parent: HTMLElement): void {
    const stockName: HTMLParagraphElement = document.createElement('p');
    stockName.classList.add('ranges-name', 'stock-ranges-name');
    stockName.textContent = 'Количество на складе';

    parent.append(stockName);

    const divSlider: HTMLDivElement = document.createElement('div');
    divSlider.classList.add('slider', 'stock-slider');

    const slider: API = noUiSlider.create(divSlider, {
      start: [Math.min(...bikes.map((el: BikeData) => el.stock)),
        Math.max(...bikes.map((el: BikeData) => el.stock))],
      range: {
        min: Math.min(...bikes.map((el: BikeData) => el.stock)),
        max: Math.max(...bikes.map((el: BikeData) => el.stock)),
      },
      step: 1,
      tooltips: [{
        from(value: string) {
          return +value;
        },
        to(value: number) {
          return value.toFixed(0);
        },
      }, {
        from(value: string) {
          return +value;
        },
        to(value: number) {
          return value.toFixed(0);
        },
      }],
      connect: true,
    });

    this.workWithSlider(slider);

    parent.append(divSlider);
  }
}

export default Slider;
