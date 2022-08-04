import * as Api from './api';
import { renderGarage } from './render';
import storage from './storage';

const updateGarageStorage = async () => {
  const { cars, length } = await Api.getAllCars(storage.garagePage);
  storage.garage = cars;
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
  console.log(Api.getCar(+button.dataset.carSelectId));
  const selectedCar = await Api.getCar(+button.dataset.carSelectId);

  const carName = <HTMLInputElement>document.getElementsByClassName('update-car-text')[0];
  carName.disabled = false;
  carName.value = selectedCar.name;

  const carColor = <HTMLInputElement>document.getElementsByClassName('update-car-color')[0];
  carColor.disabled = false;
  carColor.value = selectedCar.color;

  const updateButton = <HTMLButtonElement>document.getElementsByClassName('update-car-button')[0];
  updateButton.disabled = false;

  updateButton.addEventListener('click', async () => {
    await Api.updateCar({
      name: carName.value,
      id: selectedCar.id,
      color: carColor.value,
    });
    await updateGarageStorage();

    document.getElementsByClassName('garage')[0].innerHTML = renderGarage();

    carName.value = '';
    carColor.value = '#ffffff';
    carName.disabled = true;
    carColor.disabled = true;
    updateButton.disabled = true;
  });
};

const removeCar = async (event: Event) => {
  const button = event.target as HTMLButtonElement;
  await Api.deleteCar(+button.dataset.carRemoveId);
  await updateGarageStorage();
  document.getElementsByClassName('garage')[0].innerHTML = renderGarage();
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
      if (event.target.classList.contains('remove-button')) {
        removeCar(event);
      }
    }
  });
}
