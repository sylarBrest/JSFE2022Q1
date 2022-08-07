import {
  Car,
  Initial,
  SortingBy,
  Winner,
} from './types';
import storage from './storage';
import { MAX_ITEMS_PER_PAGE_WINNERS } from './constants';

export function renderHeader(): string {
  return `
    <header class="header">
      <div class="container header-container">
      <div class="header-logo"></div>
      <h1 class="header-name">Async Race</h1></div>
    </header>
  `;
}

function renderViewSwitch(): string {
  return `
    <div class="view-switch">
      <button class="button garage-button" disabled>To garage</button>
      <button class="button winners-button">To winners</button>
    </div>
  `;
}

function renderCreateCarContainer(): string {
  return `
    <div class="create-car">
      <input class="text-input create-car-text" aria-label="Name of new car" type="text">
      <input class="color-input create-car-color" aria-label="Color of new car" type="color" value="${Initial.color}">
      <button class="button create-car-button">Create</button>
    </div>
  `;
}

function renderUpdateCarContainer(): string {
  return `
    <div class="update-car">
      <input class="text-input update-car-text" aria-label="Name of selected car" type="text" disabled>
      <input class="color-input update-car-color" aria-label="Color of selected car" type="color" value="${Initial.color}" disabled>
      <button class="button update-car-button" disabled>Update</button>
    </div>
  `;
}

function renderControlButtonsContainer(): string {
  return `
    <div class="control-buttons">
      <button class="button race-button">Race</button>
      <button class="button reset-button">Reset</button>
      <button class="button generate-cars-button">Generate cars</button>
    </div>
  `;
}

function drawCar(color: string): string {
  return `
    <svg class="car-image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 454 125" width="454px" height="125px">
      <rect id="ee-background" x="0" y="0" width="454" height="125" style="fill: white; fill-opacity: 0; pointer-events: none;"/>
        <g transform="matrix(0.9765625596046448, 0, 0, 0.9765625596046448, -23.21494859303357, -188.74765682228812)">
          <path fill="${color}" d="M355.975 292.25a24.82 24.82 0 1 0 24.82-24.81 24.84 24.84 0 0 0-24.82 24.81zm-253-24.81a24.81 24.81 0 1 1-24.82 24.81 24.84 24.84 0 0 1 24.81-24.81zm-76.67-71.52h67.25l-13.61 49.28 92-50.28h57.36l1.26 34.68 32 14.76 11.74-14.44h15.62l3.16 16c137.56-13 192.61 29.17 192.61 29.17s-7.52 5-25.93 8.39c-3.88 3.31-3.66 14.44-3.66 14.44h24.2v16h-52v-27.48c-1.84.07-4.45.41-7.06.47a40.81 40.81 0 1 0-77.25 23h-204.24a40.81 40.81 0 1 0-77.61-17.67c0 1.24.06 2.46.17 3.67h-36z"/>
        </g>
    </svg>`;
}

function drawFinish(): string {
  return `
    <svg version="1.1" class="finish-image" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20.695 20.695" style="enable-background:new 0 0 20.695 20.695;" xml:space="preserve">
      <path style="fill:#030104;" d="M10.099,3.996l0.898,1.453L9.372,6.64L8.447,5.144L7.141,5.952L6.332,4.645L7.64,3.836l0.809,1.306 L10.099,3.996z M10.181,7.946L9.374,6.64L8.066,7.448l0.807,1.306L10.181,7.946z M17.667,5.115l-0.144,0.312 c-0.26,1.43-1.146,2.388-1.805,2.795c-1.426,0.881-2.903,0.353-2.964,0.331c-0.958-0.203-1.814-0.087-2.52,0.35 C8.926,9.712,8.553,11.37,8.55,11.389l-0.087,0.407l5.182,8.378l-0.839,0.521L3.577,5.775C3.4,5.845,3.193,5.787,3.089,5.619 C2.971,5.428,3.03,5.18,3.22,5.062l0.694-0.428C4.102,4.516,4.352,4.575,4.47,4.766C4.568,4.925,4.537,5.12,4.414,5.251 l0.249,0.404l0.006-0.013C5.211,4.327,5.901,3.404,6.719,2.9c1.484-0.917,2.84-0.154,2.897-0.121 c1.16,0.676,1.986,0.458,2.474,0.156c0.209-0.13,0.319-0.256,0.319-0.256c1.146-1.005,1.607-2.143,1.81-2.559 c0.202-0.415,0.563,0.383,0.563,0.383L17.667,5.115z M14.049,1.209l0.209,0.338l0.513-0.4l-0.41-0.662 C14.277,0.652,14.201,0.956,14.049,1.209z M8.442,10.6l-0.235,0.146l0.111,0.177C8.35,10.83,8.393,10.717,8.442,10.6z M12.691,8.188l-0.18-0.291l-0.176,0.238C12.452,8.148,12.572,8.164,12.691,8.188z M13.958,7.312L13.251,6.17l1.433-1.01 l-0.809-1.306l-1.431,1.012l-0.839-1.355c-0.168,0.04-0.356,0.064-0.563,0.062L10.1,3.997L9.582,3.163 C9.534,3.136,9.487,3.112,9.438,3.084C9.422,3.075,9.297,3.005,9.092,2.937L7.639,3.836L7.158,3.061 C7.075,3.1,6.99,3.147,6.904,3.2C6.569,3.407,6.259,3.697,5.97,4.06l0.361,0.586L5.184,5.354C5.132,5.465,5.081,5.575,5.031,5.693 l0.707,1.126L7.14,5.952l0.926,1.495L6.675,8.308l0.817,1.3l1.381-0.854l0.351,0.565c0.227-0.264,0.497-0.514,0.825-0.718 c0.132-0.08,0.269-0.147,0.408-0.21l-0.276-0.446l1.632-1.176l-0.816-1.32l1.445-0.583l0.807,1.305l-1.435,0.598l0.669,1.081 L13.958,7.312z M17.147,4.951l-0.021-0.034l-0.502,0.456l-0.698-1.126l0.526-0.409l-0.871-1.394L15.117,2.94l-0.858-1.39 l-0.757,0.468c-0.133,0.176-0.281,0.349-0.438,0.519l0.812,1.315l1.243-0.913l0.807,1.308l-1.241,0.912l0.707,1.142l-1.396,1.072 l0.576,0.93c0.312-0.065,0.639-0.182,0.961-0.381c0.205-0.127,0.397-0.282,0.576-0.461l-0.717-1.159l1.232-0.929l0.41,0.663 L17.147,4.951z"/>
    </svg>`;
}

function renderCarPath(car: Car): string {
  return `
    <div class="car-path" data-car-path-id="${car.id}">
      <div class="car-controls">
        <button class="button select-button" data-car-select-id="${car.id}">Select</button>
        <button class="button remove-button" data-car-remove-id="${car.id}">Remove</button>
        <p class="car-name" data-car-name-id="${car.id}">${car.name}</p>
      </div>
      <div class="path">
        <button class="button start-button" data-car-start-id="${car.id}">➤</button>
        <button class="button stop-button" data-car-stop-id="${car.id}" disabled>↺</button>
        <div class="car" data-car-id="${car.id}">
          ${drawCar(car.color)}
        </div>
        <div class="finish" data-finish-id="${car.id}">
          ${drawFinish()}
        </div>
      </div>
    </div>
  `;
}

function renderWinnerLine(winner: Winner, index: number): string {
  const winnerNumber = (storage.winnersPage - 1) * MAX_ITEMS_PER_PAGE_WINNERS + index + 1;

  return `
    <tr class="winner-line">
      <td class="td-number">${winnerNumber}</td>
      <td class="td-car">${drawCar(winner.car.color)}</td>
      <td class="td-name">${winner.car.name}</td>
      <td class="td-wins">${winner.wins}</td>
      <td class="td-time">${winner.time}</td>
    </tr>
  `;
}

function renderTrack(): string {
  return `
    <div class="track">
      ${storage.garage.reduce((track: string, car: Car) => track + renderCarPath(car), '')}
    </div>
  `;
}

function renderPaginationButtonsContainer(): string {
  return `
    <div class="pagination">
      <button class="button prev-button">Prev</button>
      <button class="button next-button">Next</button>
    </div>
  `;
}

export function renderGarage(): string {
  return `
    <h2 class="title">Garage (${storage.garageLength})</h2>
    <h3 class="page">Page #${storage.garagePage}</h3>
    ${renderTrack()}
  `;
}

export function renderWinners(): string {
  const styleSortByWins = storage.sortBy === SortingBy.wins ? storage.sortOrder.toLowerCase() : '';
  const styleSortByTime = storage.sortBy === SortingBy.time ? storage.sortOrder.toLowerCase() : '';
  const winnersLines = storage.winners.reduce((
    lines: string,
    winner: Winner,
    index: number,
  ) => lines + renderWinnerLine(winner, index), '');

  return `
    <h2 class="title">Winners (${storage.winnersLength})</h2>
    <h3 class="page">Page #${storage.winnersPage}</h3>
    <table class="winners-table">
      <tr class="table-head">
        <th class="head-cell">Number</th>
        <th class="head-cell">Car</th>
        <th class="head-cell name">Name</th>
        <th class="head-cell sort wins-sort ${styleSortByWins}">Wins</th>
        <th class="head-cell sort time-sort ${styleSortByTime}">Best time</th>
      </tr>
      ${winnersLines}
    </table>
  `;
}

export function renderGarageView(): string {
  return `
    <section class="view garage-view">
      <div class="controls">
        ${renderCreateCarContainer()}
        ${renderUpdateCarContainer()}
        ${renderControlButtonsContainer()}
      </div>
      <div class="garage">
        ${renderGarage()}
      </div>
      ${renderPaginationButtonsContainer()}
    </section>
  `;
}

export function renderWinnersView(): string {
  return `
    <section class="view winners-view">
      <div class="winners">
        ${renderWinners()}
      </div>
      ${renderPaginationButtonsContainer()}
    </section>
  `;
}

export function renderFooter(): string {
  return `
    <footer class="footer">
      <div class="container footer-container">
        <div class="footer-data">
          <span class="copy-year">© 2022</span>
          <span class="github">
            <a class="github-link" href="https://github.com/sylarBrest" target="_blank" rel="noopener noreferrer">sylarBrest</a>
          </span>
        </div>
        <a class="rss-logo" href="https://rs.school/js-stage0/" target="_blank" rel="noopener noreferrer" title="Rolling Scope School"></a>
      </div>
    </footer>
  `;
}

export async function renderMain() {
  const main = document.createElement('main');
  main.className = 'main';
  main.innerHTML = `
    <div class="container main-container">
      ${renderViewSwitch()}
      ${renderGarageView()}
    </div>`;

  document.body.appendChild(main);
  document.body.removeChild(document.getElementsByClassName('footer')[0]);
  document.body.innerHTML += renderFooter();
}
