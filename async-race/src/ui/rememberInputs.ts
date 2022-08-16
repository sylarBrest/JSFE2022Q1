import { EmptyVoidFn } from '../types';
import storage from '../storage';

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

const rememberInputs: EmptyVoidFn = (): void => {
  const createCarName = <HTMLInputElement>document.getElementsByClassName('create-car-text')[0];
  const createCarColor = <HTMLInputElement>document.getElementsByClassName('create-car-color')[0];

  storage.createCarInputState.name = createCarName.value;
  storage.createCarInputState.color = createCarColor.value;

  saveUpdateCarInfo();
};

export default rememberInputs;
