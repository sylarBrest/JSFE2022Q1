import {
  CAR_BRANDS,
  CAR_MODELS,
  MAX_CREATED_CARS,
  MAX_ITEMS_PER_PAGE_GARAGE,
} from './constants';
import { Car } from './types';
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
  prevButton.disabled = storage.garagePage === 1;
};

export const nextButtonUpdateState = () => {
  const nextButton = <HTMLButtonElement>document.getElementsByClassName('next-button')[0];
  nextButton.disabled = storage.garagePage >= Math.ceil(
    storage.garageLength / MAX_ITEMS_PER_PAGE_GARAGE,
  );
};

export const getRandomCars = (count = MAX_CREATED_CARS): Car[] => new Array<Car>(count)
  .fill({ name: getRandomCarName(), color: getRandomCarColor() })
  .map((car) => ({ name: getRandomCarName(), color: getRandomCarColor() }) || car);
