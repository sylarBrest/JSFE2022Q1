import { CAR_BRANDS, CAR_MODELS } from './constants';

export const getRandomCarName = () => {
  const brand = CAR_BRANDS[Math.floor(Math.random() * CAR_BRANDS.length)];
  const model = CAR_MODELS[Math.floor(Math.random() * CAR_MODELS.length)];

  return `${brand} ${model}`;
};

export const getRandomCarColor = () => {
  const symbols = '0123456789abcdef';
  let color = '#';

  for (let index = 0; index < 6; index += 1) {
    color += symbols[Math.floor(Math.random() * symbols.length)];
  }

  return color;
};
