import {
  TCar,
  TCars,
  TEngine,
  TSuccess,
  TWinner,
  TWinners,
  SaveFn,
  SpecifiedPromiseFn,
  GetCarsFn,
  GetWinnersFn,
} from './types';
import {
  MAX_ITEMS_PER_PAGE_GARAGE,
  MAX_ITEMS_PER_PAGE_WINNERS,
  BASE_URL_GARAGE,
  BASE_URL_WINNERS,
  BASE_URL_ENGINE,
} from './constants';

export const getAllCars: GetCarsFn = async (pageNumber = 1): Promise<TCars> => {
  const url = `${BASE_URL_GARAGE}?_page=${pageNumber}&_limit=${MAX_ITEMS_PER_PAGE_GARAGE}`;
  const res: Response = await fetch(url);
  const data: TCar[] = await res.json();

  return {
    cars: data,
    length: +res.headers.get('X-Total-Count'),
  };
};

export const getCar: SpecifiedPromiseFn<number, TCar> = async (id: number): Promise<TCar> => {
  const res: Response = await fetch(`${BASE_URL_GARAGE}/${id}`);
  const data: TCar = await res.json();

  return data;
};

export const createCar: SaveFn<TCar> = async (car: TCar): Promise<TCar> => {
  const res: Response = await fetch(
    BASE_URL_GARAGE,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    },
  );
  const data: TCar = await res.json();

  return data;
};

export const updateCar: SaveFn<TCar> = async (car: TCar): Promise<TCar> => {
  const res: Response = await fetch(
    `${BASE_URL_GARAGE}/${car.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    },
  );
  const data: TCar = await res.json();

  return data;
};

export const deleteCar: SpecifiedPromiseFn<number, TCar> = async (id: number): Promise<TCar> => {
  const res: Response = await fetch(
    `${BASE_URL_GARAGE}/${id}`,
    { method: 'DELETE' },
  );
  const data: TCar = await res.json();

  return data;
};

export const startEngine: SpecifiedPromiseFn<number, TEngine> = async (
  id: number,
): Promise<TEngine> => {
  const res: Response = await fetch(
    `${BASE_URL_ENGINE}?id=${id}&status=started`,
    { method: 'PATCH' },
  );
  const data: TEngine = await res.json();

  return data;
};

export const stopEngine: SpecifiedPromiseFn<number, TEngine> = async (
  id: number,
): Promise<TEngine> => {
  const res: Response = await fetch(
    `${BASE_URL_ENGINE}?id=${id}&status=stopped`,
    { method: 'PATCH' },
  );
  const data: TEngine = await res.json();

  return data;
};

export const drive: SpecifiedPromiseFn<number, TSuccess> = async (
  id: number,
): Promise<TSuccess> => {
  const res: Response = await fetch(
    `${BASE_URL_ENGINE}?id=${id}&status=drive`,
    { method: 'PATCH' },
  ).catch();
  const data: TSuccess = res.status !== 200 ? { success: false } : { ...(await res.json()) };

  return data;
};

export const getWinners: GetWinnersFn = async (
  pageNumber = 1,
  sort = 'id',
  order = 'ASC',
  limit = MAX_ITEMS_PER_PAGE_WINNERS,
): Promise<TWinners> => {
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
