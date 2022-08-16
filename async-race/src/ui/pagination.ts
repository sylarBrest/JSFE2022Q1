import { EViews, EmptyPromiseVoidFn } from '../types';
import storage from '../storage';
import { renderGarage, renderWinners } from '../render/index';
import { updateGarageView, updateWinnersView } from './updateViews';

export const nextPage: EmptyPromiseVoidFn = async (): Promise<void> => {
  switch (storage.view) {
    case EViews.garage: {
      storage.garagePage += 1;
      await updateGarageView();
      document.getElementsByClassName('garage')[0].innerHTML = renderGarage();
      break;
    }
    case EViews.winners: {
      storage.winnersPage += 1;
      await updateWinnersView();
      document.getElementsByClassName('winners')[0].innerHTML = renderWinners();
      break;
    }
    default:
      break;
  }
};

export const prevPage: EmptyPromiseVoidFn = async (): Promise<void> => {
  switch (storage.view) {
    case EViews.garage: {
      storage.garagePage -= 1;
      await updateGarageView();
      document.getElementsByClassName('garage')[0].innerHTML = renderGarage();
      break;
    }
    case EViews.winners: {
      storage.winnersPage -= 1;
      await updateWinnersView();
      document.getElementsByClassName('winners')[0].innerHTML = renderWinners();
      break;
    }
    default:
      break;
  }
};
