import './values.scss';

import { bikes } from '../../../../bikeData';

interface Values {
  drawValues(): void;
}

class Values implements Values {
  public drawValues(): void {
    const valuesWindow: HTMLElement = document.createElement('div');
    valuesWindow.className = 'values-filter-container';
    document.getElementsByClassName('filters')[0].append(valuesWindow);
    this.fillManufacturersFilter(valuesWindow);
    this.fillWheelSizeFilter(valuesWindow);
    this.fillFrameSizeFilter(valuesWindow);
    this.fillColorFilter(valuesWindow);
    this.fillCategoryFilter(valuesWindow);
    this.addOnlyPopular(valuesWindow);
  }

  private fillManufacturersFilter(parent: HTMLElement) {
    const bikeManufacturer = [...new Set(bikes.map((el) => el.manufacturer))].sort();

    const manufacturersDiv = document.createElement('div');
    manufacturersDiv.classList.add('values-filter', 'manufacturer-filter');

    const manName = document.createElement('p');
    manName.classList.add('filter-name', 'manufacturer-filter-name');
    manName.textContent = 'Производитель';
    parent.append(manName);
  
    bikeManufacturer.forEach((element) => {
      const label = document.createElement('label');
      label.classList.add('label', 'manufacturer-label');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = element;

      const labelText = document.createElement('span');
      labelText.textContent = element;

      label.append(checkbox, labelText);

      manufacturersDiv.append(label);
    });

    parent.append(manufacturersDiv);
  }

  private fillWheelSizeFilter(parent: HTMLElement) {
    const bikeWheelSize = [...new Set(bikes.map((el) => el.wheels))].sort();

    const manufacturersDiv = document.createElement('div');
    manufacturersDiv.classList.add('values-filter', 'wheels-filter');

    const manName = document.createElement('p');
    manName.classList.add('filter-name', 'wheels-filter-name');
    manName.textContent = 'Размер колёс';
    parent.append(manName);
  
    bikeWheelSize.forEach((element) => {
      const label = document.createElement('label');
      label.classList.add('label', 'wheels-label');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = element.toString();

      const labelText = document.createElement('span');
      labelText.textContent = element.toString();

      label.append(checkbox, labelText);

      manufacturersDiv.append(label);
    });

    parent.append(manufacturersDiv);
  }

  private fillFrameSizeFilter(parent: HTMLElement) {
    type Size = { [key: string]: number };
    const frameSize: Size = { S: 0, M: 1, L: 2, XL: 3 }; 

    const bikeFrameSize = [...new Set(bikes.map((el) => el.size))].sort((a, b) => frameSize[a] - frameSize[b]);

    const manufacturersDiv = document.createElement('div');
    manufacturersDiv.classList.add('values-filter', 'frame-filter');

    const manName = document.createElement('p');
    manName.classList.add('filter-name', 'frame-filter-name');
    manName.textContent = 'Размер рамы';
    parent.append(manName);
  
    bikeFrameSize.forEach((element) => {
      const label = document.createElement('label');
      label.classList.add('label', 'frame-label');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = element.toString();

      const labelText = document.createElement('span');
      labelText.textContent = element.toString();

      label.append(checkbox, labelText);

      manufacturersDiv.append(label);
    });

    parent.append(manufacturersDiv);
  }

  private fillColorFilter(parent: HTMLElement) {
    const bikeColor = [...new Set(bikes.map((el) => el.color))].sort();

    const manufacturersDiv = document.createElement('div');
    manufacturersDiv.classList.add('values-filter', 'color-filter');

    const manName = document.createElement('p');
    manName.classList.add('filter-name', 'color-filter-name');
    manName.textContent = 'Цвет';
    parent.append(manName);
  
    bikeColor.forEach((element) => {
      const label = document.createElement('label');
      label.classList.add('label', 'color-label');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = element;

      const labelText = document.createElement('span');
      labelText.textContent = element;

      label.append(checkbox, labelText);

      manufacturersDiv.append(label);
    });

    parent.append(manufacturersDiv);
  }

  private fillCategoryFilter(parent: HTMLElement) {
    const bikeManufacturers = [...new Set(bikes.map((el) => el.category))].sort();

    const manufacturersDiv = document.createElement('div');
    manufacturersDiv.classList.add('values-filter', 'category-filter');

    const manName = document.createElement('p');
    manName.classList.add('filter-name', 'category-filter-name');
    manName.textContent = 'Категория';
    parent.append(manName);
  
    bikeManufacturers.forEach((element) => {
      const label = document.createElement('label');
      label.classList.add('label', 'category-label');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = element;

      const labelText = document.createElement('span');
      labelText.textContent = element;

      label.append(checkbox, labelText);

      manufacturersDiv.append(label);
    });

    parent.append(manufacturersDiv);
  }

  private addOnlyPopular(parent: HTMLElement) {
    const popularDiv = document.createElement('div');
    popularDiv.classList.add('values-filter', 'popular-filter');

    const label = document.createElement('label');
    label.classList.add('label', 'popular-label');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = 'false';
  
    const labelText = document.createElement('span');
    labelText.textContent = 'Только популярные';

    label.append(labelText, checkbox);
    popularDiv.append(label);
    parent.append(popularDiv);
  }

}

export default Values;