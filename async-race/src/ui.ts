import * as Api from './api';
import * as Utils from './utils';
import * as Render from './render';
import {
  Car,
  Initial,
  RaceResult,
  SortBy,
  SortingBy,
  SortingOrder,
  Views,
  Winner,
  WinnerResult,
  EmptyPromiseVoidFn,
  SpecifiedPromiseFn,
  PromisingPromiseFn,
  EmptyVoidFn,
  WinnerCar,
} from './types';
import { FINISH_FLAG_WIDTH } from './constants';
import storage from './storage';

let selectedCar: Car = null;

const updateGarageView: EmptyPromiseVoidFn = async (): Promise<void> => {
  const { cars, length } = await Api.getAllCars(storage.garagePage);

  storage.garage = cars;
  storage.garageLength = length;

  if (!cars.length) {
    storage.garagePage -= 1;
    updateGarageView();
  }

  Utils.prevButtonUpdateState();
  Utils.nextButtonUpdateState();
};

const updateWinnersView: EmptyPromiseVoidFn = async (): Promise<void> => {
  const { winners, length } = await Api.getWinners(
    storage.winnersPage,
    storage.sortBy,
    storage.sortOrder,
  );

  storage.winners = winners;
  storage.winnersLength = length;

  Utils.prevButtonUpdateState();
  Utils.nextButtonUpdateState();
};

const addNewCar: EmptyPromiseVoidFn = async (): Promise<void> => {
  const carNameInput = <HTMLInputElement>document.getElementsByClassName('create-car-text')[0];
  const carColorInput = <HTMLInputElement>document.getElementsByClassName('create-car-color')[0];

  await Api.createCar({ color: carColorInput.value, name: carNameInput.value });
  await updateGarageView();

  document.getElementsByClassName('garage')[0].innerHTML = Render.renderGarage();

  carNameInput.value = Initial.value;
  carColorInput.value = Initial.color;
};

const saveUpdateCarInfo: EmptyVoidFn = (): void => {
  const carNameInput = <HTMLInputElement>document.getElementsByClassName('update-car-text')[0];
  storage.updateCarInputState.name = carNameInput.value;
  carNameInput.addEventListener('input', () => {
    storage.updateCarInputState.name = carNameInput.value;
  });

  const carColorInput = <HTMLInputElement>document.getElementsByClassName('update-car-color')[0];
  storage.updateCarInputState.color = carColorInput.value;
  carColorInput.addEventListener('input', () => {
    storage.updateCarInputState.color = carColorInput.value;
  });

  const carUpdate = <HTMLDivElement>document.getElementsByClassName('update-car')[0];

  storage.updateCarInputState.id = +carUpdate.dataset.updateCarId;

  if (storage.updateCarInputState.id) {
    storage.updateCarInputState.disabled = false;
  }
};

const cleanUpdateCarInfo: EmptyVoidFn = (): void => {
  storage.updateCarInputState = {
    id: 0,
    name: Initial.value,
    color: Initial.color,
    disabled: true,
  };
};

const updateSelectedCar: SpecifiedPromiseFn<number, void> = async (id: number): Promise<void> => {
  const carUpdate = <HTMLDivElement>document.getElementsByClassName('update-car')[0];
  const carNameInput = <HTMLInputElement>document.getElementsByClassName('update-car-text')[0];
  const carColorInput = <HTMLInputElement>document.getElementsByClassName('update-car-color')[0];
  const updateButton = <HTMLButtonElement>document.getElementsByClassName('update-car-button')[0];

  await Api.updateCar({
    name: carNameInput.value,
    id,
    color: carColorInput.value,
  });
  await updateGarageView();

  document.getElementsByClassName('garage')[0].innerHTML = Render.renderGarage();

  carNameInput.value = Initial.value;
  carColorInput.value = Initial.color;

  carUpdate.dataset.updateCarId = '0';
  carNameInput.disabled = true;
  carColorInput.disabled = true;
  updateButton.disabled = true;

  cleanUpdateCarInfo();

  selectedCar = null;
};

const prepareUpdate: SpecifiedPromiseFn<number, void> = async (id: number): Promise<void> => {
  selectedCar = await Api.getCar(id);

  const carUpdate = <HTMLDivElement>document.getElementsByClassName('update-car')[0];
  carUpdate.dataset.updateCarId = id.toString();

  const carNameInput = <HTMLInputElement>document.getElementsByClassName('update-car-text')[0];
  carNameInput.disabled = false;
  carNameInput.value = selectedCar.name;

  const carColorInput = <HTMLInputElement>document.getElementsByClassName('update-car-color')[0];
  carColorInput.disabled = false;
  carColorInput.value = selectedCar.color;

  const updateButton = <HTMLButtonElement>document.getElementsByClassName('update-car-button')[0];
  updateButton.disabled = false;
};

const isWinner = async (id: number) => {
  const winnersIds: number[] = (await Api.getWinners(
    1,
    storage.sortBy,
    storage.sortOrder,
    storage.winnersLength,
  )).winners.map((winnerCar: WinnerCar) => winnerCar.id);

  return winnersIds.includes(id);
};

const removeSelectedCar: SpecifiedPromiseFn<number, void> = async (id: number): Promise<void> => {
  if (await isWinner(id)) {
    await Api.deleteWinner(id);
  }

  await Api.deleteCar(id);
  await updateGarageView();
  await updateWinnersView();

  document.getElementsByClassName('garage')[0].innerHTML = Render.renderGarage();
};

const generateCars: EmptyPromiseVoidFn = async (): Promise<void> => {
  await Promise.all(Utils.getRandomCars().map((car: Car) => Api.createCar(car)));
  await updateGarageView();

  document.getElementsByClassName('garage')[0].innerHTML = Render.renderGarage();
};

const nextPage: EmptyPromiseVoidFn = async (): Promise<void> => {
  switch (storage.view) {
    case Views.garage: {
      storage.garagePage += 1;
      await updateGarageView();
      document.getElementsByClassName('garage')[0].innerHTML = Render.renderGarage();
      break;
    }
    case Views.winners: {
      storage.winnersPage += 1;
      await updateWinnersView();
      document.getElementsByClassName('winners')[0].innerHTML = Render.renderWinners();
      break;
    }
    default:
      break;
  }
};

const prevPage: EmptyPromiseVoidFn = async (): Promise<void> => {
  switch (storage.view) {
    case Views.garage: {
      storage.garagePage -= 1;
      await updateGarageView();
      document.getElementsByClassName('garage')[0].innerHTML = Render.renderGarage();
      break;
    }
    case Views.winners: {
      storage.winnersPage -= 1;
      await updateWinnersView();
      document.getElementsByClassName('winners')[0].innerHTML = Render.renderWinners();
      break;
    }
    default:
      break;
  }
};

const sortWinners: SpecifiedPromiseFn<SortBy, void> = async (sortBy: SortBy): Promise<void> => {
  const prevSortBy: SortBy = storage.sortBy;
  storage.sortBy = sortBy;

  switch (storage.sortBy) {
    case SortingBy.id:
      break;
    default: {
      if (prevSortBy === storage.sortBy) {
        storage.sortOrder = storage.sortOrder === SortingOrder.asc
          ? SortingOrder.desc
          : SortingOrder.asc;
      } else {
        storage.sortOrder = SortingOrder.asc;
      }
    }
  }

  await updateWinnersView();

  document.getElementsByClassName('winners')[0].innerHTML = Render.renderWinners();
};

const rememberInputs: EmptyVoidFn = (): void => {
  const createCarName = <HTMLInputElement>document.getElementsByClassName('create-car-text')[0];
  const createCarColor = <HTMLInputElement>document.getElementsByClassName('create-car-color')[0];

  storage.createCarInputState.name = createCarName.value;
  storage.createCarInputState.color = createCarColor.value;

  saveUpdateCarInfo();
};

const switchToGarageView: EmptyPromiseVoidFn = async (): Promise<void> => {
  const winnersButton = <HTMLButtonElement>document.getElementsByClassName('winners-button')[0];
  winnersButton.disabled = false;

  storage.view = Views.garage;

  const currentView = <HTMLDivElement>document.getElementsByClassName('winners-view')[0];

  if (currentView) {
    currentView.remove();
  }

  document.getElementsByClassName('main-container')[0].innerHTML += Render.renderGarageView();

  await updateGarageView();

  const garageButton = <HTMLButtonElement>document.getElementsByClassName('garage-button')[0];
  garageButton.disabled = true;
};

const switchToWinnersView: EmptyPromiseVoidFn = async (): Promise<void> => {
  rememberInputs();
  await updateWinnersView();

  const garageButton = <HTMLButtonElement>document.getElementsByClassName('garage-button')[0];
  garageButton.disabled = false;

  storage.view = Views.winners;

  const currentView = <HTMLDivElement>document.getElementsByClassName('garage-view')[0];

  if (currentView) {
    currentView.remove();
  }

  document.getElementsByClassName('main-container')[0].innerHTML += Render.renderWinnersView();

  await updateWinnersView();

  const winnersButton = <HTMLButtonElement>document.getElementsByClassName('winners-button')[0];
  winnersButton.disabled = true;
};

const carStarting: SpecifiedPromiseFn<number, RaceResult> = async (
  id: number,
): Promise<RaceResult> => {
  const startButton = Array.from(
    <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName('start-button'),
  ).find((button: HTMLButtonElement) => +button.dataset.carStartId === id);

  startButton.disabled = true;
  startButton.classList.add('working');

  const { velocity, distance } = await Api.startEngine(id);
  const time: number = Math.round(distance / velocity);

  startButton.classList.remove('working');
  const stopButton = <HTMLButtonElement>startButton.parentElement.getElementsByClassName('stop-button')[0];
  stopButton.disabled = false;

  const car = <HTMLDivElement>startButton.parentElement.getElementsByClassName('car')[0];
  const finish = <HTMLDivElement>startButton.parentElement.getElementsByClassName('finish')[0];

  const screenDistance: number = Math.floor(Utils.getDistanceToDrive(car, finish))
    + FINISH_FLAG_WIDTH;
  storage.drivingAnimation[id] = Utils.animateDriving(car, screenDistance, time);

  const { success: finished } = await Api.drive(id);

  if (!finished) {
    window.cancelAnimationFrame(storage.drivingAnimation[id].id);
  }

  return { finished, id, time };
};

const carStopping: SpecifiedPromiseFn<number, void> = async (id: number): Promise<void> => {
  const stopButton = Array.from(
    <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName('stop-button'),
  ).find((button: HTMLButtonElement) => +button.dataset.carStopId === id);

  stopButton.disabled = true;
  stopButton.classList.add('working');

  await Api.stopEngine(id);

  stopButton.classList.remove('working');

  const startButton = <HTMLButtonElement>stopButton.parentElement.getElementsByClassName('start-button')[0];
  startButton.disabled = false;

  const car = <HTMLDivElement>stopButton.parentElement.getElementsByClassName('car')[0];
  car.style.transform = 'translateX(0)';

  if (storage.drivingAnimation[id]) {
    window.cancelAnimationFrame(storage.drivingAnimation[id].id);
  }
};

const saveWinner: SpecifiedPromiseFn<WinnerResult, void> = async (
  winner: WinnerResult,
): Promise<void> => {
  if (await isWinner(winner.id)) {
    const winnerInfo: Winner = await Api.getWinner(winner.id);
    await Api.updateWinner({
      id: winner.id,
      wins: winnerInfo.wins + 1,
      time: winner.time < winnerInfo.time ? winner.time : winnerInfo.time,
    });
  } else {
    await Api.createWinner({ id: winner.id, wins: 1, time: winner.time });
  }
};

const disableButtons: EmptyVoidFn = (): void => {
  const raceButton = <HTMLButtonElement>document.getElementsByClassName('race-button')[0];
  const createCarButton = <HTMLButtonElement>document.getElementsByClassName('create-car-button')[0];
  const winnersButton = <HTMLButtonElement>document.getElementsByClassName('winners-button')[0];
  const generateCarsButton = <HTMLButtonElement>document.getElementsByClassName('generate-cars-button')[0];
  const selectButtons = <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName('select-button');
  const removeButtons = <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName('remove-button');
  const prevButton = <HTMLButtonElement>document.getElementsByClassName('prev-button')[0];
  const nextButton = <HTMLButtonElement>document.getElementsByClassName('next-button')[0];

  Array.from(selectButtons).forEach((selectButton: HTMLButtonElement) => {
    const currentButton = selectButton;
    currentButton.disabled = true;
  });

  Array.from(removeButtons).forEach((removeButton: HTMLButtonElement) => {
    const currentButton = removeButton;
    currentButton.disabled = true;
  });

  raceButton.disabled = true;
  createCarButton.disabled = true;
  winnersButton.disabled = true;
  generateCarsButton.disabled = true;
  prevButton.disabled = true;
  nextButton.disabled = true;
};

const enableButtons: EmptyVoidFn = (): void => {
  const createCarButton = <HTMLButtonElement>document.getElementsByClassName('create-car-button')[0];
  const winnersButton = <HTMLButtonElement>document.getElementsByClassName('winners-button')[0];
  const generateCarsButton = <HTMLButtonElement>document.getElementsByClassName('generate-cars-button')[0];
  const selectButtons = <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName('select-button');
  const removeButtons = <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName('remove-button');
  const resetButton = <HTMLButtonElement>document.getElementsByClassName('reset-button')[0];

  Array.from(selectButtons).forEach((selectButton: HTMLButtonElement) => {
    const currentButton = selectButton;
    currentButton.disabled = false;
  });

  Array.from(removeButtons).forEach((removeButton: HTMLButtonElement) => {
    const currentButton = removeButton;
    currentButton.disabled = false;
  });

  createCarButton.disabled = false;
  winnersButton.disabled = false;
  generateCarsButton.disabled = false;
  resetButton.disabled = false;

  Utils.prevButtonUpdateState();
  Utils.nextButtonUpdateState();
};

const raceAll: PromisingPromiseFn = async (
  promises: Promise<RaceResult>[],
  indexes: number[],
): Promise<WinnerResult> => {
  const { finished, id, time } = await Promise.race(promises).finally(() => enableButtons());

  if (!finished) {
    const failedIndex: number = indexes.findIndex((index: number) => index === id);
    const restPromises: Promise<RaceResult>[] = [
      ...promises.slice(0, failedIndex),
      ...promises.slice(failedIndex + 1, promises.length),
    ];
    const restIndexes: number[] = [
      ...indexes.slice(0, failedIndex),
      ...indexes.slice(failedIndex + 1, indexes.length),
    ];

    return raceAll(restPromises, restIndexes);
  }

  return {
    ...storage.garage.find((car: Car) => car.id === id),
    time: +(time / 1000).toFixed(2),
  };
};

const racing: SpecifiedPromiseFn<SpecifiedPromiseFn<number, RaceResult>, WinnerResult> = async (
  action: SpecifiedPromiseFn<number, RaceResult>,
): Promise<WinnerResult> => {
  disableButtons();

  const promises: Promise<RaceResult>[] = storage.garage.map(({ id }) => action(id));
  const winner: WinnerResult = await raceAll(promises, storage.garage.map((car: Car) => car.id));

  const winnerMessage = <HTMLDivElement>document.getElementsByClassName('winner-message')[0];
  winnerMessage.innerHTML = `${winner.name} won in ${winner.time} s`;

  saveWinner(winner);

  return winner;
};

const resetting: EmptyPromiseVoidFn = async (): Promise<void> => {
  const resetButton = <HTMLButtonElement>document.getElementsByClassName('reset-button')[0];
  resetButton.disabled = true;

  storage.garage.map(({ id }) => carStopping(id));

  const winnerMessage = document.getElementsByClassName('winner-message')[0];
  winnerMessage.innerHTML = '';

  const raceButton = <HTMLButtonElement>document.getElementsByClassName('race-button')[0];
  raceButton.disabled = false;
};

export default function listeners(): void {
  document.body.addEventListener('click', (event: MouseEvent) => {
    if (event.target instanceof HTMLButtonElement) {
      if (event.target.classList.contains('garage-button')) {
        switchToGarageView();
      }
      if (event.target.classList.contains('winners-button')) {
        switchToWinnersView();
      }
      if (event.target.classList.contains('create-car-button')) {
        addNewCar();
      }
      if (event.target.classList.contains('select-button')) {
        prepareUpdate(+event.target.dataset.carSelectId);
      }
      if (event.target.classList.contains('remove-button')) {
        removeSelectedCar(+event.target.dataset.carRemoveId);
      }
      if (event.target.classList.contains('update-car-button')) {
        updateSelectedCar(selectedCar.id);
      }
      if (event.target.classList.contains('race-button')) {
        racing(carStarting);
      }
      if (event.target.classList.contains('reset-button')) {
        resetting();
      }
      if (event.target.classList.contains('generate-cars-button')) {
        generateCars();
      }
      if (event.target.classList.contains('start-button')) {
        carStarting(+event.target.dataset.carStartId);
      }
      if (event.target.classList.contains('stop-button')) {
        carStopping(+event.target.dataset.carStopId);
      }
      if (event.target.classList.contains('next-button')) {
        nextPage();
      }
      if (event.target.classList.contains('prev-button')) {
        prevPage();
      }
    }

    if (event.target instanceof HTMLTableCellElement) {
      if (event.target.classList.contains('wins-sort')) {
        sortWinners(SortingBy.wins);
      }
      if (event.target.classList.contains('time-sort')) {
        sortWinners(SortingBy.time);
      }
    }
  });
}
