import './reset.scss';

interface Reset {
  drawResetButtons(): void;
}

class Reset implements Reset {
  public drawResetButtons(): void {
    const resetDiv = document.createElement('div');
    resetDiv.className = 'reset-buttons';

    const resetFilters = document.createElement('button');
    resetFilters.classList.add('reset-button', 'reset-filters-button');
    resetFilters.textContent = 'Сбросить фильтры';

    /*     const resetSettings = document.createElement('button');
    resetSettings.classList.add('reset-button', 'reset-settings-button');
    resetSettings.textContent = 'Сбросить настройки';
    */
    resetDiv.append(resetFilters/* , resetSettings */);

    document.getElementsByClassName('filters')[0].append(resetDiv);
  }
}

export default Reset;
