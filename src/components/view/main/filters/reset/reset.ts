import './reset.scss';

interface Reset {
  drawResetButtons(): void;
}

class Reset implements Reset {
  public drawResetButtons(): void {
    const resetDiv: HTMLDivElement = document.createElement('div');
    resetDiv.className = 'reset-buttons';

    const resetFilters: HTMLButtonElement = document.createElement('button');
    resetFilters.classList.add('reset-button', 'reset-filters-button');
    resetFilters.textContent = 'Сбросить фильтры';

    resetDiv.append(resetFilters);

    document.getElementsByClassName('filters')[0].append(resetDiv);
  }
}

export default Reset;
