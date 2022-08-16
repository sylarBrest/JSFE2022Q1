import {
  EInitial,
  TWinnerCar,
  SpecifiedPromiseFn,
  EmptyVoidFn,
} from '../types';
import storage from '../storage';
import { getWinners } from '../api/index';

export const cleanUpdateCarInfo: EmptyVoidFn = (): void => {
  storage.updateCarInputState = {
    id: 0,
    name: EInitial.value,
    color: EInitial.color,
    disabled: true,
  };
};

export const isWinner: SpecifiedPromiseFn<number, boolean> = async (
  id: number,
): Promise<boolean> => {
  const winnersIds: number[] = (await getWinners(
    1,
    storage.sortBy,
    storage.sortOrder,
    storage.winnersLength,
  )).winners.map((winner: TWinnerCar) => winner.id);

  return winnersIds.includes(id);
};
