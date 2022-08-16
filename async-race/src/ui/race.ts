import {
  TCar,
  TWinner,
  TRaceResult,
  TWinnerResult,
  SpecifiedPromiseFn,
  PromisingPromiseFn,
} from '../types';
import storage from '../storage';
import { getWinner, createWinner, updateWinner } from '../api/index';
import { enableButtons, disableButtons } from './toggleButtons';
import { isWinner } from './helpers';

const saveWinner: SpecifiedPromiseFn<TWinnerResult, void> = async (
  winner: TWinnerResult,
): Promise<void> => {
  if (await isWinner(winner.id)) {
    const winnerInfo: TWinner = await getWinner(winner.id);
    await updateWinner({
      id: winner.id,
      wins: winnerInfo.wins + 1,
      time: winner.time < winnerInfo.time ? winner.time : winnerInfo.time,
    });
  } else {
    await createWinner({ id: winner.id, wins: 1, time: winner.time });
  }
};

export const raceAll: PromisingPromiseFn = async (
  promises: Promise<TRaceResult>[],
  indexes: number[],
): Promise<TWinnerResult> => {
  const { finished, id, time } = await Promise.race(promises).finally(() => enableButtons());

  if (!finished) {
    const failedCarIndex: number = indexes.findIndex((index: number) => index === id);
    const restPromises: Promise<TRaceResult>[] = [
      ...promises.slice(0, failedCarIndex),
      ...promises.slice(failedCarIndex + 1, promises.length),
    ];
    const restIndexes: number[] = [
      ...indexes.slice(0, failedCarIndex),
      ...indexes.slice(failedCarIndex + 1, indexes.length),
    ];

    return raceAll(restPromises, restIndexes);
  }

  return {
    ...storage.garage.find((car: TCar) => car.id === id),
    time: +(time / 1000).toFixed(2),
  };
};

export const racing: SpecifiedPromiseFn<
SpecifiedPromiseFn<number, TRaceResult>, TWinnerResult
> = async (
  action: SpecifiedPromiseFn<number, TRaceResult>,
): Promise<TWinnerResult> => {
  disableButtons();

  const promises: Promise<TRaceResult>[] = storage.garage.map(({ id }) => action(id));
  const winner: TWinnerResult = await raceAll(promises, storage.garage.map((car: TCar) => car.id));

  const winnerMessage = <HTMLDivElement>document.getElementsByClassName('winner-message')[0];
  winnerMessage.innerHTML = `${winner.name} won in ${winner.time} s`;

  saveWinner(winner);

  return winner;
};
