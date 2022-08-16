import {
  ESortingBy,
  TWinnerCar,
  EmptyStringFn,
  RenderWinnerFn,
} from '../types';
import { MAX_ITEMS_PER_PAGE_WINNERS } from '../constants';
import storage from '../storage';
import { drawCar } from './draw';

const renderWinnerLine: RenderWinnerFn = (winner: TWinnerCar, index: number): string => {
  const winnerNumber: number = (storage.winnersPage - 1) * MAX_ITEMS_PER_PAGE_WINNERS + index + 1;

  return `
    <tr class="winner-line">
      <td class="td-number">${winnerNumber}</td>
      <td class="td-car">${drawCar(winner.car.color)}</td>
      <td class="td-name">${winner.car.name}</td>
      <td class="td-wins">${winner.wins}</td>
      <td class="td-time">${winner.time}</td>
    </tr>
  `;
};

const renderWinners: EmptyStringFn = (): string => {
  const styleSortByWins: string = storage.sortBy === ESortingBy.wins
    ? storage.sortOrder.toLowerCase()
    : '';
  const styleSortByTime: string = storage.sortBy === ESortingBy.time
    ? storage.sortOrder.toLowerCase()
    : '';
  const winnersLines: string = storage.winners.reduce((
    lines: string,
    winner: TWinnerCar,
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
};

export default renderWinners;
