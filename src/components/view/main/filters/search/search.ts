import './search.scss';

interface Search {
  drawSearchField(): void;
}

class Search implements Search {
  public drawSearchField(): void {
    const searchDiv: HTMLDivElement = document.createElement('div');
    searchDiv.className = 'search-container';

    const searchName: HTMLParagraphElement = document.createElement('p');
    searchName.className = 'search-name';
    searchName.textContent = 'Поиск';

    searchDiv.append(searchName);

    const search:HTMLInputElement = document.createElement('input');
    search.className = 'search';
    search.autofocus = true;
    search.type = 'search';
    search.placeholder = 'Что ищем?';

    searchDiv.append(search);

    document.getElementsByClassName('filters')[0].prepend(searchDiv);
  }
}

export default Search;
