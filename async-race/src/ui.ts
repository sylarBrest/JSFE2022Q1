import * as Ui from './ui/index';
import { ESortingBy } from './types';

export default function listeners(): void {
  document.body.addEventListener('click', (event: MouseEvent) => {
    if (event.target instanceof HTMLButtonElement) {
      const buttonClassList = event.target.classList;
      switch (true) {
        case buttonClassList.contains('garage-button'):
          Ui.switchToGarageView();
          break;
        case buttonClassList.contains('winners-button'):
          Ui.switchToWinnersView();
          break;
        case buttonClassList.contains('select-button'):
          Ui.prepareUpdate(+event.target.dataset.carSelectId);
          break;
        case buttonClassList.contains('remove-button'):
          Ui.removeSelectedCar(+event.target.dataset.carRemoveId);
          break;
        case buttonClassList.contains('create-car-button'):
          Ui.addNewCar();
          break;
        case buttonClassList.contains('update-car-button'):
          Ui.updateSelectedCar(Ui.getSelectedCarId());
          break;
        case buttonClassList.contains('race-button'):
          Ui.racing(Ui.carStarting);
          break;
        case buttonClassList.contains('reset-button'):
          Ui.resetting();
          break;
        case buttonClassList.contains('generate-cars-button'):
          Ui.generateCars();
          break;
        case buttonClassList.contains('start-button'):
          Ui.carStarting(+event.target.dataset.carStartId);
          break;
        case buttonClassList.contains('stop-button'):
          Ui.carStopping(+event.target.dataset.carStopId);
          break;
        case buttonClassList.contains('next-button'):
          Ui.nextPage();
          break;
        case buttonClassList.contains('prev-button'):
          Ui.prevPage();
          break;
        default:
          break;
      }
    }

    if (event.target instanceof HTMLTableCellElement) {
      const tHeadClassList = event.target.classList;
      switch (true) {
        case tHeadClassList.contains('wins-sort'):
          Ui.sortWinners(ESortingBy.wins);
          break;
        case tHeadClassList.contains('time-sort'):
          Ui.sortWinners(ESortingBy.time);
          break;
        default:
          break;
      }
    }
  });
}
