import {
  CAR_BRANDS,
  CAR_MODELS,
  MAX_CREATED_CARS,
  MAX_ITEMS_PER_PAGE_GARAGE,
  MAX_ITEMS_PER_PAGE_WINNERS,
} from './constants';
import { Car, Views } from './types';
import storage from './storage';

const getRandomCarName = () => {
  const brand = CAR_BRANDS[Math.floor(Math.random() * CAR_BRANDS.length)];
  const model = CAR_MODELS[Math.floor(Math.random() * CAR_MODELS.length)];

  return `${brand} ${model}`;
};

const getRandomCarColor = () => {
  const symbols = '0123456789abcdef';
  let color = '#';

  for (let index = 0; index < 6; index += 1) {
    color += symbols[Math.floor(Math.random() * symbols.length)];
  }

  return color;
};

export const prevButtonUpdateState = () => {
  const prevButton = <HTMLButtonElement>document.getElementsByClassName('prev-button')[0];

  switch (storage.view) {
    case Views.garage:
      prevButton.disabled = storage.garagePage === 1;
      break;
    case Views.winners:
      prevButton.disabled = storage.winnersPage === 1;
      break;
    default:
      break;
  }
};

export const nextButtonUpdateState = () => {
  const nextButton = <HTMLButtonElement>document.getElementsByClassName('next-button')[0];

  switch (storage.view) {
    case Views.garage:
      nextButton.disabled = storage.garagePage >= Math.ceil(
        storage.garageLength / MAX_ITEMS_PER_PAGE_GARAGE,
      );
      break;
    case Views.winners:
      nextButton.disabled = storage.winnersPage >= Math.ceil(
        storage.winnersLength / MAX_ITEMS_PER_PAGE_WINNERS,
      );
      break;
    default:
      break;
  }
};

export const getRandomCars = (count = MAX_CREATED_CARS): Car[] => new Array<Car>(count)
  .fill({ name: getRandomCarName(), color: getRandomCarColor() })
  .map((car) => ({ name: getRandomCarName(), color: getRandomCarColor() }) || car);
