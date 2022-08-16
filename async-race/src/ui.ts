import * as Ui from './ui/index';
import { ESortingBy } from './types';

export default function listeners(): void {
  document.body.addEventListener('click', (event: MouseEvent) => {
    if (event.target instanceof HTMLButtonElement) {
      if (event.target.classList.contains('garage-button')) {
        Ui.switchToGarageView();
      }
      if (event.target.classList.contains('winners-button')) {
        Ui.switchToWinnersView();
      }
      if (event.target.classList.contains('create-car-button')) {
        Ui.addNewCar();
      }
      if (event.target.classList.contains('select-button')) {
        Ui.prepareUpdate(+event.target.dataset.carSelectId);
      }
      if (event.target.classList.contains('remove-button')) {
        Ui.removeSelectedCar(+event.target.dataset.carRemoveId);
      }
      if (event.target.classList.contains('update-car-button')) {
        Ui.updateSelectedCar(Ui.getSelectedCarId());
      }
      if (event.target.classList.contains('race-button')) {
        Ui.racing(Ui.carStarting);
      }
      if (event.target.classList.contains('reset-button')) {
        Ui.resetting();
      }
      if (event.target.classList.contains('generate-cars-button')) {
        Ui.generateCars();
      }
      if (event.target.classList.contains('start-button')) {
        Ui.carStarting(+event.target.dataset.carStartId);
      }
      if (event.target.classList.contains('stop-button')) {
        Ui.carStopping(+event.target.dataset.carStopId);
      }
      if (event.target.classList.contains('next-button')) {
        Ui.nextPage();
      }
      if (event.target.classList.contains('prev-button')) {
        Ui.prevPage();
      }
    }

    if (event.target instanceof HTMLTableCellElement) {
      if (event.target.classList.contains('wins-sort')) {
        Ui.sortWinners(ESortingBy.wins);
      }
      if (event.target.classList.contains('time-sort')) {
        Ui.sortWinners(ESortingBy.time);
      }
    }
  });
}
