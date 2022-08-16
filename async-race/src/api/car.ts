import {
  TCar,
  TCars,
  SaveFn,
  SpecifiedPromiseFn,
  GetCarsFn,
} from '../types';
import { MAX_ITEMS_PER_PAGE_GARAGE, BASE_URL_GARAGE } from '../constants';

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
