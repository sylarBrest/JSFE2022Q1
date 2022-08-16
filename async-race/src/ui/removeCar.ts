import { SpecifiedPromiseFn } from '../types';
import { deleteCar, deleteWinner } from '../api/index';
import { renderGarage } from '../render/index';
import { isWinner } from './helpers';
import { updateGarageView, updateWinnersView } from './updateViews';

const removeSelectedCar: SpecifiedPromiseFn<number, void> = async (id: number): Promise<void> => {
  if (await isWinner(id)) {
    await deleteWinner(id);
  }

  await deleteCar(id);
  await updateGarageView();
  await updateWinnersView();

  document.getElementsByClassName('garage')[0].innerHTML = renderGarage();
};

export default removeSelectedCar;
