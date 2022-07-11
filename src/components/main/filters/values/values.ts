interface Values {
  drawValues(): void;
}

class Values implements Values {
  public drawValues(): void {
    const valuesWindow: HTMLElement = document.createElement('div');
    valuesWindow.className = 'values-filter';
    const filters = document.getElementsByClassName('filters')[0];
    filters.append(valuesWindow);
  }
}

export default Values;