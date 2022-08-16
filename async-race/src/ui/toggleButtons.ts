import { EmptyVoidFn } from '../types';
import { prevButtonUpdateState, nextButtonUpdateState } from '../utils';

export const disableButtons: EmptyVoidFn = (): void => {
  const raceButton = <HTMLButtonElement>document.getElementsByClassName('race-button')[0];
  const createCarButton = <HTMLButtonElement>document.getElementsByClassName('create-car-button')[0];
  const winnersButton = <HTMLButtonElement>document.getElementsByClassName('winners-button')[0];
  const generateCarsButton = <HTMLButtonElement>document.getElementsByClassName('generate-cars-button')[0];
  const selectButtons = <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName('select-button');
  const removeButtons = <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName('remove-button');
  const prevButton = <HTMLButtonElement>document.getElementsByClassName('prev-button')[0];
  const nextButton = <HTMLButtonElement>document.getElementsByClassName('next-button')[0];

  Array.from(selectButtons).forEach((selectButton: HTMLButtonElement) => {
    const currentButton = selectButton;
    currentButton.disabled = true;
  });

  Array.from(removeButtons).forEach((removeButton: HTMLButtonElement) => {
    const currentButton = removeButton;
    currentButton.disabled = true;
  });

  raceButton.disabled = true;
  createCarButton.disabled = true;
  winnersButton.disabled = true;
  generateCarsButton.disabled = true;
  prevButton.disabled = true;
  nextButton.disabled = true;
};

export const enableButtons: EmptyVoidFn = (): void => {
  const createCarButton = <HTMLButtonElement>document.getElementsByClassName('create-car-button')[0];
  const winnersButton = <HTMLButtonElement>document.getElementsByClassName('winners-button')[0];
  const generateCarsButton = <HTMLButtonElement>document.getElementsByClassName('generate-cars-button')[0];
  const selectButtons = <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName('select-button');
  const removeButtons = <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName('remove-button');
  const resetButton = <HTMLButtonElement>document.getElementsByClassName('reset-button')[0];

  Array.from(selectButtons).forEach((selectButton: HTMLButtonElement) => {
    const currentButton = selectButton;
    currentButton.disabled = false;
  });

  Array.from(removeButtons).forEach((removeButton: HTMLButtonElement) => {
    const currentButton = removeButton;
    currentButton.disabled = false;
  });

  createCarButton.disabled = false;
  winnersButton.disabled = false;
  generateCarsButton.disabled = false;
  resetButton.disabled = false;

  prevButtonUpdateState();
  nextButtonUpdateState();
};
