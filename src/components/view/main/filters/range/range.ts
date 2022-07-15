import './range.scss';

import noUiSlider from '../../../nouislider/nouislider';
import '../../../nouislider/nouislider.scss';
import { bikes } from '../../../../bikeData';

interface Slider {
  drawSliders(): void;
}

class Slider implements Slider {
  public drawSliders(): void {
    const rangesWindow: HTMLElement = document.createElement('div');
    rangesWindow.className = 'ranges-filter-container';
    document.getElementsByClassName('filters')[0].append(rangesWindow);
    this.drawSliderByYear(rangesWindow);
    this.drawSliderByStock(rangesWindow);
  }

  private drawSliderByYear(parent: HTMLElement): void {
    const yearName = document.createElement('p');
    yearName.classList.add('ranges-name', 'year-ranges-name');
    yearName.textContent = 'Модельный год';
    parent.append(yearName);

    const divSlider = document.createElement('div');
    divSlider.classList.add('slider', 'year-slider');
    let slider = noUiSlider.create(divSlider, {
      start: [Math.min(...bikes.map((el) => el.year)),
        Math.max(...bikes.map((el) => el.year))],
      range: {
        'min': Math.min(...bikes.map((el) => el.year)),
        'max': Math.max(...bikes.map((el) => el.year))
      },
      step: 1,
      tooltips: [{
        from: function (value) {
          return parseInt(value);
        },
        to: function (value) {
          return value;
        },
      }, {
        from: function (value) {
          return parseInt(value);
        },
        to: function (value) {
          return value;
        },
      }],
      connect: true
    })
    parent.append(divSlider);
  }

  private drawSliderByStock(parent: HTMLElement): void {
    const stockName = document.createElement('p');
    stockName.classList.add('ranges-name', 'stock-ranges-name');
    stockName.textContent = 'Количество на складе';
    parent.append(stockName);

    const divSlider = document.createElement('div');
    divSlider.classList.add('slider', 'stock-slider');
    let slider = noUiSlider.create(divSlider, {
      start: [Math.min(...bikes.map((el) => el.stock)),
        Math.max(...bikes.map((el) => el.stock))],
      range: {
        'min': Math.min(...bikes.map((el) => el.stock)),
        'max': Math.max(...bikes.map((el) => el.stock))
      },
      step: 1,
      tooltips: [{
        from: function (value) {
          return parseInt(value);
        },
        to: function (value) {
          return value.toFixed(0);
        },
      }, {
        from: function (value) {
          return parseInt(value);
        },
        to: function (value) {
          return value.toFixed(0);
        },
      }],
      connect: true
    })
    parent.append(divSlider);
  }

}

export default Slider;