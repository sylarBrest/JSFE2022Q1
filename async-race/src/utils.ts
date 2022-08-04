import { CAR_BRANDS, CAR_MODELS, MAX_CREATED_CARS } from './constants';
import { Car } from './types';

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

export default (count = MAX_CREATED_CARS): Car[] => new Array<Car>(count)
  .fill({ name: getRandomCarName(), color: getRandomCarColor() })
  .map((car) => ({ name: getRandomCarName(), color: getRandomCarColor() }) || car);
