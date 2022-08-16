import { EmptyPromiseVoidFn } from '../types';
import storage from '../storage';
import { getAllCars, getWinners } from '../api/index';
import { prevButtonUpdateState, nextButtonUpdateState } from '../utils';

export const updateGarageView: EmptyPromiseVoidFn = async (): Promise<void> => {
  const { cars, length } = await getAllCars(storage.garagePage);

  storage.garage = cars;
  storage.garageLength = length;

  if (!cars.length) {
    storage.garagePage -= 1;
    updateGarageView();
  }

  prevButtonUpdateState();
  nextButtonUpdateState();
};

export const updateWinnersView: EmptyPromiseVoidFn = async (): Promise<void> => {
  const { winners, length } = await getWinners({
    page: storage.winnersPage,
    sortBy: storage.sortBy,
    sortOrder: storage.sortOrder,
  });

  storage.winners = winners;
  storage.winnersLength = length;

  prevButtonUpdateState();
  nextButtonUpdateState();
};
