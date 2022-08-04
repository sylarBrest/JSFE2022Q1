import * as Api from './api';
import { renderGarage } from './render';

import storage from './storage';

const updateGarageStorage = async () => {
  const { data, length } = await Api.getAllCars(storage.garagePage);
  storage.garage = data;
  storage.garageLength = length;
};

const addCar = async () => {
  const carName = <HTMLInputElement>document.getElementsByClassName('create-car-text')[0];
  const carColor = <HTMLInputElement>document.getElementsByClassName('create-car-color')[0];
  await Api.createCar({ color: carColor.value, name: carName.value });
  await updateGarageStorage();
  document.getElementsByClassName('garage')[0].innerHTML = renderGarage();
  carName.value = '';
  carColor.value = '#ffffff';
};

const updateCar = async (event: Event) => {
  const button = event.target as HTMLButtonElement;
  const car = await Api.getCar(+button.dataset.carSelectId);

  const carName = <HTMLInputElement>document.getElementsByClassName('update-car-text')[0];
  carName.removeAttribute('disabled');
  carName.value = car[0].name;

  const carColor = <HTMLInputElement>document.getElementsByClassName('update-car-color')[0];
  carColor.removeAttribute('disabled');
  carColor.value = car[0].color;

  const updateButton = <HTMLButtonElement>document.getElementsByClassName('update-car-button')[0];
  updateButton.removeAttribute('disabled');
  updateButton.addEventListener('click', async () => {
    await Api.updateCar({
      name: carName.value,
      id: +button.dataset.carSelectId,
      color: carColor.value,
    });
    await updateGarageStorage();
    document.getElementsByClassName('garage')[0].innerHTML = renderGarage();
    carName.value = '';
    carColor.value = '#ffffff';
    carName.setAttribute('disabled', '');
    carColor.setAttribute('disabled', '');
    updateButton.setAttribute('disabled', '');
  });
};

export default function Listeners() {
  document.body.addEventListener('click', (event) => {
    if (event.target instanceof HTMLButtonElement) {
      if (event.target.classList.contains('create-car-button')) {
        addCar();
      }
      if (event.target.classList.contains('select-button')) {
        updateCar(event);
      }
    }
  });
}
