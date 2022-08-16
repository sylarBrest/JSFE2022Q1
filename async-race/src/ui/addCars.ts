import { EInitial, TCar, EmptyPromiseVoidFn } from '../types';
import { createCar } from '../api/index';
import { renderGarage } from '../render/index';
import { getRandomCars } from '../utils';
import { updateGarageView } from './updateViews';

export const addNewCar: EmptyPromiseVoidFn = async (): Promise<void> => {
  const carNameInput = <HTMLInputElement>document.getElementsByClassName('create-car-text')[0];
  const carColorInput = <HTMLInputElement>document.getElementsByClassName('create-car-color')[0];

  await createCar({ color: carColorInput.value, name: carNameInput.value });
  await updateGarageView();

  document.getElementsByClassName('garage')[0].innerHTML = renderGarage();

  carNameInput.value = EInitial.value;
  carColorInput.value = EInitial.color;
};

export const generateCars: EmptyPromiseVoidFn = async (): Promise<void> => {
  await Promise.all(getRandomCars().map((car: TCar) => createCar(car)));
  await updateGarageView();

  document.getElementsByClassName('garage')[0].innerHTML = renderGarage();
};
