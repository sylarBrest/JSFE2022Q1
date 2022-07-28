import { BikeData, TextContent } from '@components/types';
import { FILTER_VALUES, FRAME_SIZES } from '@components/constants';

import Utils from '@components/helpers/utils';

import bikes from '@components/bikeData';

import './values.scss';

interface Values {
  drawValues(): void;
}

class Values implements Values {
  public drawValues(): void {
    const valuesWindow: HTMLDivElement = document.createElement('div');
    valuesWindow.className = 'values-filter-container';
    document.getElementsByClassName('sort-container')[0].after(valuesWindow);

    FILTER_VALUES.forEach((value) => {
      valuesWindow.append(...this.fillFilterByParam(value as keyof BikeData));
    });

    valuesWindow.append(this.addOnlyPopular());
  }

  private fillFilterByParam(param: keyof BikeData): HTMLDivElement[] {
    const bikeParam: string[] = [
      ...new Set(bikes.map((el: BikeData) => Utils.getProperty(el, param))),
    ].sort() as string[];

    if (param === 'frame') {
      bikeParam.sort((a: string, b: string) => FRAME_SIZES[a] - FRAME_SIZES[b]);
    }

    const filterDiv: HTMLDivElement = document.createElement('div');
    filterDiv.classList.add('values-filter', `${param}-filter`);

    const filterName: HTMLParagraphElement = document.createElement('p');
    filterName.classList.add('filter-name', `${param}-filter-name`);
    filterName.textContent = Utils.getTextContent(param as keyof TextContent);

    bikeParam.forEach((element: string) => {
      const label: HTMLLabelElement = document.createElement('label');
      label.classList.add('label', `${param}-label`);

      const checkbox: HTMLInputElement = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('checkbox', `checkbox-${param}`);
      checkbox.checked = false;
      checkbox.value = element;

      const labelText: HTMLSpanElement = document.createElement('span');
      labelText.textContent = element;

      label.append(checkbox, labelText);

      filterDiv.append(label);
    });

    return [filterName, filterDiv];
  }

  private addOnlyPopular(): HTMLElement {
    const popularDiv: HTMLDivElement = document.createElement('div');
    popularDiv.classList.add('values-filter', 'popular-filter');

    const label: HTMLLabelElement = document.createElement('label');
    label.classList.add('label', 'popular-label');

    const checkbox: HTMLInputElement = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = false;
    checkbox.classList.add('checkbox', 'checkbox-popular');
    checkbox.value = 'false';

    const labelText: HTMLSpanElement = document.createElement('span');
    labelText.textContent = 'Только популярные';

    label.append(labelText, checkbox);
    popularDiv.append(label);

    return popularDiv;
  }
}

export default Values;
