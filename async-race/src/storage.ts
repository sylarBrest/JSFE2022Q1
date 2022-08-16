import { EInitial, TStorage } from './types';
import { getAllCars, getWinners } from './api/index';

const { cars: garage, length: garageLength } = await getAllCars(1);
const { winners, length: winnersLength } = await getWinners({ page: 1 });

const storage: TStorage = {
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
