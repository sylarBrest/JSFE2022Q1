import * as Api from './api';
import * as Utils from './utils';
import { renderGarage } from './render';
import storage from './storage';
import { Car } from './types';

let selectedCar: Car = null;

const updateGarageStorage = async () => {
  const { cars, length } = await Api.getAllCars(storage.garagePage);
  storage.garage = cars;
  storage.garageLength = length;

  Utils.prevButtonUpdateState();

  Utils.nextButtonUpdateState();
};

const addNewCar = async () => {
  const carNameInput = <HTMLInputElement>document.getElementsByClassName('create-car-text')[0];
  const carColorInput = <HTMLInputElement>document.getElementsByClassName('create-car-color')[0];

  await Api.createCar({ color: carColorInput.value, name: carNameInput.value });
  await updateGarageStorage();

  document.getElementsByClassName('garage')[0].innerHTML = renderGarage();

  carNameInput.value = '';
  carColorInput.value = '#ffffff';
};

const updateSelectedCar = async (event: Event) => {
  const selectButton = event.target as HTMLButtonElement;
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
    await updateGarageStorage();

    document.getElementsByClassName('garage')[0].innerHTML = renderGarage();

    carNameInput.value = '';
    carColorInput.value = '#ffffff';
    carNameInput.disabled = true;
    carColorInput.disabled = true;
    updateButton.disabled = true;
    selectedCar = null;
  });
};

const removeSelectedCar = async (event: Event) => {
  const removeButton = event.target as HTMLButtonElement;
  await Api.deleteCar(+removeButton.dataset.carRemoveId);
  await updateGarageStorage();
  document.getElementsByClassName('garage')[0].innerHTML = renderGarage();
};

const generateCars = async () => {
  await Promise.all(Utils.getRandomCars().map((car: Car) => Api.createCar(car)));
  await updateGarageStorage();
  document.getElementsByClassName('garage')[0].innerHTML = renderGarage();
};

const nextPage = async () => {
  storage.garagePage += 1;
  await updateGarageStorage();
  document.getElementsByClassName('garage')[0].innerHTML = renderGarage();
};

const prevPage = async () => {
  storage.garagePage -= 1;
  await updateGarageStorage();
  document.getElementsByClassName('garage')[0].innerHTML = renderGarage();
};

export default function Listeners() {
  document.body.addEventListener('click', (event) => {
    if (event.target instanceof HTMLButtonElement) {
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
      if (event.target.classList.contains('next-button')) {
        nextPage();
      }
      if (event.target.classList.contains('prev-button')) {
        prevPage();
      }
    }
  });
}
