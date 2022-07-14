import './search.scss';

interface Search {
  drawSearchField(): void;
}

class Search implements Search {
  drawSearchField(): void {
    const searchDiv = document.createElement('div');
    searchDiv.className = 'search-container';

    const searchName = document.createElement('p');
    searchName.className = 'search-name';
    searchName.textContent = 'Поиск';
    searchDiv.append(searchName);

    const search = document.createElement('input');
    search.type = 'search';
    searchDiv.append(search);
    document.getElementsByClassName('filters')[0].append(searchDiv);
  }
}

export default Search;