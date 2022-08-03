import * as Api from './api';
import { renderGarage } from './render';

import storage from './storage';

const updateGarageStorage = async () => {
  const { data, length } = await Api.getAllCars(storage.garagePage);
  storage.garage = data;
  storage.garageLength = length;
};

const addCarToBase = async () => {
  const carName = <HTMLInputElement>document.getElementsByClassName('create-car-text')[0];
  const carColor = <HTMLInputElement>document.getElementsByClassName('create-car-color')[0];
  await Api.createCar({ color: carColor.value, name: carName.value });
  await updateGarageStorage();
  document.getElementsByClassName('garage')[0].innerHTML = renderGarage();
  carName.value = '';
  carColor.value = '#ffffff';
};

export default function Listeners() {
  const createButton = document.getElementsByClassName('create-car-button')[0];
  createButton?.addEventListener('click', addCarToBase);
}
