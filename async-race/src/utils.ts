import {
  EViews,
  TCar,
  TPoint,
  TState,
  EmptyStringFn,
  EmptyVoidFn,
  CarArrayFn,
  PointFn,
  DistanceFn,
  AnimationStateFn,
  NumberVoidFn,
} from './types';
import {
  CAR_BRANDS,
  CAR_MODELS,
  COLOR_SYMBOLS,
  MAX_CREATED_CARS,
  MAX_ITEMS_PER_PAGE_GARAGE,
  MAX_ITEMS_PER_PAGE_WINNERS,
} from './constants';
import storage from './storage';

const getRandomCarName: EmptyStringFn = (): string => {
  const brand: string = CAR_BRANDS[Math.floor(Math.random() * CAR_BRANDS.length)];
  const model: string = CAR_MODELS[Math.floor(Math.random() * CAR_MODELS.length)];

  return `${brand} ${model}`;
};

const getRandomCarColor: EmptyStringFn = (): string => {
  let color = '#';

  for (let index = 0; index < 6; index += 1) {
    color += COLOR_SYMBOLS[Math.floor(Math.random() * COLOR_SYMBOLS.length)];
  }

  return color;
};

export const prevButtonUpdateState: EmptyVoidFn = (): void => {
  const prevButton = <HTMLButtonElement>document.getElementsByClassName('prev-button')[0];

  switch (storage.view) {
    case EViews.garage:
      prevButton.disabled = storage.garagePage === 1;
      break;
    case EViews.winners:
      prevButton.disabled = storage.winnersPage === 1;
      break;
    default:
      break;
  }
};

export const nextButtonUpdateState: EmptyVoidFn = (): void => {
  const nextButton = <HTMLButtonElement>document.getElementsByClassName('next-button')[0];

  switch (storage.view) {
    case EViews.garage:
      nextButton.disabled = storage.garagePage >= Math.ceil(
        storage.garageLength / MAX_ITEMS_PER_PAGE_GARAGE,
      );
      break;
    case EViews.winners:
      nextButton.disabled = storage.winnersPage >= Math.ceil(
        storage.winnersLength / MAX_ITEMS_PER_PAGE_WINNERS,
      );
      break;
    default:
      break;
  }
};

export const getRandomCars: CarArrayFn = (
  count: number = MAX_CREATED_CARS,
): TCar[] => new Array<TCar>(count)
  .fill({ name: getRandomCarName(), color: getRandomCarColor() })
  .map((car: TCar) => ({ name: getRandomCarName(), color: getRandomCarColor() }) || car);

const getElementCenter: PointFn = (element: HTMLDivElement): TPoint => {
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

export const getDistanceToDrive: DistanceFn = (
  car: HTMLDivElement,
  flag: HTMLDivElement,
): number => {
  const start: TPoint = getElementCenter(car);
  const finish: TPoint = getElementCenter(flag);

  return Math.hypot(start.x - finish.x, start.y - finish.y);
};

export const animateDriving: AnimationStateFn = (
  car: HTMLDivElement,
  distance: number,
  animationTime: number,
): TState => {
  let start: number = null;
  const state: TState = {};
  const raceCar: HTMLDivElement = car;

  const step: NumberVoidFn = (timestamp: number) => {
    if (!start) {
      start = timestamp;
    }

    const time: number = timestamp - start;
    const passed: number = Math.round(time * (distance / animationTime));
    raceCar.style.transform = `translateX(${Math.min(passed, distance)}px)`;

    if (passed < distance) {
      state.id = window.requestAnimationFrame(step);
    }
  };

  state.id = window.requestAnimationFrame(step);

  return state;
};
