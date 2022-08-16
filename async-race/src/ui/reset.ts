import { EmptyPromiseVoidFn } from '../types';
import storage from '../storage';
import { carStopping } from './driveCar';

const resetting: EmptyPromiseVoidFn = async (): Promise<void> => {
  const resetButton = <HTMLButtonElement>document.getElementsByClassName('reset-button')[0];
  resetButton.disabled = true;

  storage.garage.map(({ id }) => carStopping(id));

  const winnerMessage = <HTMLDivElement>document.getElementsByClassName('winner-message')[0];
  winnerMessage.innerHTML = '';

  const raceButton = <HTMLButtonElement>document.getElementsByClassName('race-button')[0];
  raceButton.disabled = false;
};

export default resetting;
