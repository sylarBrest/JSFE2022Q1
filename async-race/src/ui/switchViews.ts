import { EViews, EmptyPromiseVoidFn } from '../types';
import storage from '../storage';
import { renderGarageView, renderWinnersView } from '../render/index';
import { updateGarageView, updateWinnersView } from './updateViews';
import rememberInputs from './rememberInputs';

export const switchToGarageView: EmptyPromiseVoidFn = async (): Promise<void> => {
  const winnersButton = <HTMLButtonElement>document.getElementsByClassName('winners-button')[0];
  winnersButton.disabled = false;

  storage.view = EViews.garage;

  const currentView = <HTMLDivElement>document.getElementsByClassName('winners-view')[0];

  if (currentView) {
    currentView.remove();
  }

  document.getElementsByClassName('main-container')[0].innerHTML += renderGarageView();

  await updateGarageView();

  const garageButton = <HTMLButtonElement>document.getElementsByClassName('garage-button')[0];
  garageButton.disabled = true;
};

export const switchToWinnersView: EmptyPromiseVoidFn = async (): Promise<void> => {
  rememberInputs();
  await updateWinnersView();

  const garageButton = <HTMLButtonElement>document.getElementsByClassName('garage-button')[0];
  garageButton.disabled = false;

  storage.view = EViews.winners;

  const currentView = <HTMLDivElement>document.getElementsByClassName('garage-view')[0];

  if (currentView) {
    currentView.remove();
  }

  document.getElementsByClassName('main-container')[0].innerHTML += renderWinnersView();

  await updateWinnersView();

  const winnersButton = <HTMLButtonElement>document.getElementsByClassName('winners-button')[0];
  winnersButton.disabled = true;
};
