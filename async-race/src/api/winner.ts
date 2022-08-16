import {
  TWinner,
  TWinners,
  SaveFn,
  SpecifiedPromiseFn,
  GetWinnersFn,
} from '../types';
import { MAX_ITEMS_PER_PAGE_WINNERS, BASE_URL_WINNERS } from '../constants';
import { getCar } from './car';

export const getWinners: GetWinnersFn = async ({
  page: pageNumber = 1,
  sortBy: sort = 'id',
  sortOrder: order = 'ASC',
  limit = MAX_ITEMS_PER_PAGE_WINNERS,
}): Promise<TWinners> => {
  const url = `${BASE_URL_WINNERS}?_page=${pageNumber}&_limit=${limit}&_sort=${sort}&_order=${order}`;
  const res: Response = await fetch(url);
  const data: TWinner[] = await res.json();

  return {
    winners: await Promise.all(data.map(async (winner: TWinner) => ({
      ...winner,
      car: await getCar(winner.id),
    }))),
    length: +res.headers.get('X-Total-Count'),
  };
};

export const getWinner: SpecifiedPromiseFn<number, TWinner> = async (
  id: number,
): Promise<TWinner> => {
  const res: Response = await fetch(`${BASE_URL_WINNERS}/${id}`);
  const data: TWinner = await res.json();

  return data;
};

export const createWinner: SaveFn<TWinner> = async (winner: TWinner): Promise<TWinner> => {
  const res: Response = await fetch(
    BASE_URL_WINNERS,
    {
      method: 'POST',
      body: JSON.stringify(winner),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const data: TWinner = await res.json();

  return data;
};

export const updateWinner: SaveFn<TWinner> = async (winner: TWinner): Promise<TWinner> => {
  const res: Response = await fetch(
    `${BASE_URL_WINNERS}/${winner.id}`,
    {
      method: 'PUT',
      body: JSON.stringify(winner),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const data: TWinner = await res.json();

  return data;
};

export const deleteWinner: SpecifiedPromiseFn<number, TWinner> = async (
  id: number,
): Promise<TWinner> => {
  const res: Response = await fetch(
    `${BASE_URL_WINNERS}/${id}`,
    { method: 'DELETE' },
  );
  const data: TWinner = await res.json();

  return data;
};
