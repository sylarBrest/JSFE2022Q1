import * as Ui from './ui/index';
import { ESortingBy } from './types';

export default function listeners(): void {
  document.body.addEventListener('click', (event: MouseEvent) => {
    const clickTarget: EventTarget = event.target;
    if (clickTarget instanceof HTMLButtonElement) {
      const buttonClassList: DOMTokenList = clickTarget.classList;
      switch (true) {
        case buttonClassList.contains('garage-button'):
          Ui.switchToGarageView();
          break;
        case buttonClassList.contains('winners-button'):
          Ui.switchToWinnersView();
          break;
        case buttonClassList.contains('select-button'):
          Ui.prepareUpdate(+clickTarget.dataset.carSelectId);
          break;
        case buttonClassList.contains('remove-button'):
          Ui.removeSelectedCar(+clickTarget.dataset.carRemoveId);
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
          Ui.carStarting(+clickTarget.dataset.carStartId);
          break;
        case buttonClassList.contains('stop-button'):
          Ui.carStopping(+clickTarget.dataset.carStopId);
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

    if (clickTarget instanceof HTMLTableCellElement) {
      const tHeadClassList: DOMTokenList = clickTarget.classList;
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
