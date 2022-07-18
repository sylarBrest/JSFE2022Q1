import './sort.scss';

interface Sort {
  drawSortField(): void;
}

class Sort implements Sort {
  public drawSortField(): void {
    const sortDiv = document.createElement('div');
    sortDiv.className = 'sort-container';

    const sortName = document.createElement('p');
    sortName.className = 'sort-name';
    sortName.textContent = 'Сортировать';

    const sort = document.createElement('select');
    sort.className = 'sort';

    const sortNameUp = document.createElement('option');
    sortNameUp.setAttribute('selected', '');
    sortNameUp.textContent = 'По названию, от A до Z';

    const sortNameDown = document.createElement('option');
    sortNameDown.textContent = 'По названию, от Z до A';

    const sortYearUp = document.createElement('option');
    sortYearUp.textContent = 'По году, по возрастанию';

    const sortYearDown = document.createElement('option');
    sortYearDown.textContent = 'По году, по убыванию';

    sort.append(sortNameUp, sortNameDown, sortYearUp, sortYearDown);

    sortDiv.append(sortName, sort);

    document.getElementsByClassName('filters')[0].append(sortDiv);
  }
}

export default Sort;
