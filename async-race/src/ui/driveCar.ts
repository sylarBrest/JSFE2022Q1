import { TRaceResult, SpecifiedPromiseFn } from '../types';
import { FINISH_FLAG_WIDTH } from '../constants';
import storage from '../storage';
import { startEngine, drive, stopEngine } from '../api/index';
import { getDistanceToDrive, animateDriving } from '../utils';

export const carStarting: SpecifiedPromiseFn<number, TRaceResult> = async (
  id: number,
): Promise<TRaceResult> => {
  const startButton: HTMLButtonElement = Array.from(
    <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName('start-button'),
  ).find((button: HTMLButtonElement) => +button.dataset.carStartId === id);

  startButton.disabled = true;
  startButton.classList.add('working');

  const { velocity, distance } = await startEngine(id);
  const time: number = Math.round(distance / velocity);

  startButton.classList.remove('working');
  const stopButton = <HTMLButtonElement>startButton.parentElement.getElementsByClassName('stop-button')[0];
  stopButton.disabled = false;

  const car = <HTMLDivElement>startButton.parentElement.getElementsByClassName('car')[0];
  const finish = <HTMLDivElement>startButton.parentElement.getElementsByClassName('finish')[0];

  const screenDistance: number = Math.floor(getDistanceToDrive(car, finish))
    + FINISH_FLAG_WIDTH;
  storage.drivingAnimation[id] = animateDriving(car, screenDistance, time);

  const { success: finished } = await drive(id);

  if (!finished) {
    window.cancelAnimationFrame(storage.drivingAnimation[id].id);
  }

  return { finished, id, time };
};

export const carStopping: SpecifiedPromiseFn<number, void> = async (id: number): Promise<void> => {
  const stopButton: HTMLButtonElement = Array.from(
    <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName('stop-button'),
  ).find((button: HTMLButtonElement) => +button.dataset.carStopId === id);

  stopButton.disabled = true;
  stopButton.classList.add('working');

  await stopEngine(id);

  stopButton.classList.remove('working');

  const startButton = <HTMLButtonElement>stopButton.parentElement.getElementsByClassName('start-button')[0];
  startButton.disabled = false;

  const car = <HTMLDivElement>stopButton.parentElement.getElementsByClassName('car')[0];
  car.style.transform = 'translateX(0)';

  if (storage.drivingAnimation[id]) {
    window.cancelAnimationFrame(storage.drivingAnimation[id].id);
  }
};
