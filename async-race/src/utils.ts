import {
  CAR_BRANDS,
  CAR_MODELS,
  COLOR_SYMBOLS,
  MAX_CREATED_CARS,
  MAX_ITEMS_PER_PAGE_GARAGE,
  MAX_ITEMS_PER_PAGE_WINNERS,
} from './constants';
import {
  Car,
  Point,
  State,
  Views,
} from './types';
import storage from './storage';

const getRandomCarName = (): string => {
  const brand = CAR_BRANDS[Math.floor(Math.random() * CAR_BRANDS.length)];
  const model = CAR_MODELS[Math.floor(Math.random() * CAR_MODELS.length)];

  return `${brand} ${model}`;
};

const getRandomCarColor = (): string => {
  let color = '#';

  for (let index = 0; index < 6; index += 1) {
    color += COLOR_SYMBOLS[Math.floor(Math.random() * COLOR_SYMBOLS.length)];
  }

  return color;
};

export const prevButtonUpdateState = ():void => {
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

export const nextButtonUpdateState = (): void => {
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

const getElementCenter = (element: HTMLDivElement): Point => {
  const {
    top,
    left,
    width,
    height,
  } = element.getBoundingClientRect();

  return {
    x: left + width / 2,
    y: top + height / 2,
  };
};

export const getDistanceToDrive = (car: HTMLDivElement, flag: HTMLDivElement): number => {
  const start: Point = getElementCenter(car);
  const finish: Point = getElementCenter(flag);

  return Math.hypot(start.x - finish.x, start.y - finish.y);
};

export const animateDriving = (
  car: HTMLDivElement,
  distance: number,
  animationTime: number,
): State => {
  let start: number = null;
  const state: State = {};
  const raceCar: HTMLDivElement = car;

  function step(timestamp: number) {
    if (!start) {
      start = timestamp;
    }

    const time: number = timestamp - start;
    const passed: number = Math.round(time * (distance / animationTime));
    raceCar.style.transform = `translateX(${Math.min(passed, distance)}px)`;

    if (passed < distance) {
      state.id = window.requestAnimationFrame(step);
    }
  }

  state.id = window.requestAnimationFrame(step);

  return state;
};
