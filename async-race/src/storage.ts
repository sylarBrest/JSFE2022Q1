import { Storage } from './types';
import { getAllCars } from './api';

const { data: garage, length: garageLength } = await getAllCars(1);

const storage: Storage = {
  view: 'Garage',
  garagePage: 1,
  garage,
  garageLength,
};

export default storage;
