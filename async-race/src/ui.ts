import * as Api from './api';
import * as Utils from './utils';
import * as Render from './render';
import storage from './storage';
import {
  Car,
  Initial,
  SortBy,
  SortingBy,
  SortingOrder,
  Views,
} from './types';
import { FINISH_FLAG_WIDTH } from './constants';

let selectedCar: Car = null;

const updateGarageView = async () => {
  const { cars, length } = await Api.getAllCars(storage.garagePage);

  storage.garage = cars;
  storage.garageLength = length;

  Utils.prevButtonUpdateState();
  Utils.nextButtonUpdateState();
};

const updateWinnersView = async () => {
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

const addNewCar = async () => {
  const carNameInput = <HTMLInputElement>document.getElementsByClassName('create-car-text')[0];
  const carColorInput = <HTMLInputElement>document.getElementsByClassName('create-car-color')[0];

  await Api.createCar({ color: carColorInput.value, name: carNameInput.value });
  await updateGarageView();

  document.getElementsByClassName('garage')[0].innerHTML = Render.renderGarage();

  carNameInput.value = Initial.value;
  carColorInput.value = Initial.color;
};

const updateSelectedCar = async (event: Event) => {
  const selectButton = <HTMLButtonElement>event.target;

  selectedCar = await Api.getCar(+selectButton.dataset.carSelectId);

  const carNameInput = <HTMLInputElement>document.getElementsByClassName('update-car-text')[0];
  carNameInput.disabled = false;
  carNameInput.value = selectedCar.name;

  const carColorInput = <HTMLInputElement>document.getElementsByClassName('update-car-color')[0];
  carColorInput.disabled = false;
  carColorInput.value = selectedCar.color;

  const updateButton = <HTMLButtonElement>document.getElementsByClassName('update-car-button')[0];
  updateButton.disabled = false;

  updateButton.addEventListener('click', async () => {
    await Api.updateCar({
      name: carNameInput.value,
      id: selectedCar.id,
      color: carColorInput.value,
    });
    await updateGarageView();

    document.getElementsByClassName('garage')[0].innerHTML = Render.renderGarage();

    carNameInput.value = Initial.value;
    carColorInput.value = Initial.color;

    carNameInput.disabled = true;
    carColorInput.disabled = true;
    updateButton.disabled = true;

    selectedCar = null;
  });
};

const removeSelectedCar = async (event: Event) => {
  const removeButton = <HTMLButtonElement>event.target;
  const selectedCarID = +removeButton.dataset.carRemoveId;

  await Api.deleteCar(selectedCarID);
  await Api.deleteWinner(selectedCarID);
  await updateGarageView();
  await updateWinnersView();

  document.getElementsByClassName('garage')[0].innerHTML = Render.renderGarage();
};

const generateCars = async () => {
  await Promise.all(Utils.getRandomCars().map((car: Car) => Api.createCar(car)));
  await updateGarageView();

  document.getElementsByClassName('garage')[0].innerHTML = Render.renderGarage();
};

const nextPage = async () => {
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

const prevPage = async () => {
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

const sortWinners = async (sortBy: SortBy) => {
  const prevSortBy = storage.sortBy;
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

const switchToGarageView = async () => {
  const winnersButton = <HTMLButtonElement>document.getElementsByClassName('winners-button')[0];
  winnersButton.disabled = false;

  storage.view = Views.garage;

  const currentView = document.getElementsByClassName('winners-view')[0];

  if (currentView) {
    currentView.remove();
  }

  document.getElementsByClassName('main-container')[0].innerHTML += Render.renderGarageView();

  await updateGarageView();

  const garageButton = <HTMLButtonElement>document.getElementsByClassName('garage-button')[0];
  garageButton.disabled = true;
};

const switchToWinnersView = async () => {
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

const carStarting = async (event: Event) => {
  const startButton = <HTMLButtonElement>event.target;
  const id: number = +startButton.dataset.carStartId;

  startButton.disabled = true;
  startButton.classList.add('working');

  const { velocity, distance } = await Api.startEngine(id);
  const time: number = Math.round(distance / velocity);

  startButton.classList.remove('working');
  const stopButton = <HTMLButtonElement>startButton.parentElement.getElementsByClassName('stop-button')[0];
  stopButton.disabled = false;

  const car = <HTMLDivElement>startButton.parentElement.getElementsByClassName('car')[0];
  const finish = <HTMLDivElement>startButton.parentElement.getElementsByClassName('finish')[0];

  const screenDistance = Math.floor(Utils.getDistanceToDrive(car, finish)) + FINISH_FLAG_WIDTH;
  storage.drivingAnimation[id] = Utils.animateDriving(car, screenDistance, time);

  const { success } = await Api.drive(id);

  if (!success) {
    window.cancelAnimationFrame(storage.drivingAnimation[id].id);
  }

  return { success, id, time };
};

const carStopping = async (event: Event) => {
  const stopButton = <HTMLButtonElement>event.target;
  const id: number = +stopButton.dataset.carStopId;

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

export default function Listeners(): void {
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
        updateSelectedCar(event);
      }
      if (event.target.classList.contains('remove-button')) {
        removeSelectedCar(event);
      }
      if (event.target.classList.contains('generate-cars-button')) {
        generateCars();
      }
      if (event.target.classList.contains('start-button')) {
        carStarting(event);
      }
      if (event.target.classList.contains('stop-button')) {
        carStopping(event);
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
