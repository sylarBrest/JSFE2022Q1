import { EInitial, Storage } from './types';
import { getAllCars, getWinners } from './api';

const { cars: garage, length: garageLength } = await getAllCars(1);
const { winners, length: winnersLength } = await getWinners(1);

const storage: Storage = {
  view: 'Garage',
  garagePage: 1,
  garage,
  garageLength,
  winnersPage: 1,
  winners,
  winnersLength,
  sortBy: 'id',
  sortOrder: 'ASC',
  drivingAnimation: {},
  createCarInputState: {
    name: EInitial.value,
    color: EInitial.color,
  },
  updateCarInputState: {
    id: 0,
    name: EInitial.value,
    color: EInitial.color,
    disabled: true,
  },
};

export default storage;
