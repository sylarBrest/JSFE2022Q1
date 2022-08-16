import { EInitial, TCar, SpecifiedPromiseFn } from '../types';
import { getCar, updateCar } from '../api/index';
import { renderGarage } from '../render/index';
import { updateGarageView } from './updateViews';
import { cleanUpdateCarInfo } from './helpers';

let selectedCar: TCar = null;

export const getSelectedCarId = () => selectedCar.id;

export const updateSelectedCar: SpecifiedPromiseFn<number, void> = async (
  id: number,
): Promise<void> => {
  const carUpdate = <HTMLDivElement>document.getElementsByClassName('update-car')[0];
  const carNameInput = <HTMLInputElement>document.getElementsByClassName('update-car-text')[0];
  const carColorInput = <HTMLInputElement>document.getElementsByClassName('update-car-color')[0];
  const updateButton = <HTMLButtonElement>document.getElementsByClassName('update-car-button')[0];

  await updateCar({
    name: carNameInput.value,
    id,
    color: carColorInput.value,
  });
  await updateGarageView();

  document.getElementsByClassName('garage')[0].innerHTML = renderGarage();

  carNameInput.value = EInitial.value;
  carColorInput.value = EInitial.color;

  carUpdate.dataset.updateCarId = '0';
  carNameInput.disabled = true;
  carColorInput.disabled = true;
  updateButton.disabled = true;

  cleanUpdateCarInfo();

  selectedCar = null;
};

export const prepareUpdate: SpecifiedPromiseFn<number, void> = async (
  id: number,
): Promise<void> => {
  selectedCar = await getCar(id);

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
