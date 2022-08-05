import {
  MAX_ITEMS_PER_PAGE_GARAGE,
  MAX_ITEMS_PER_PAGE_WINNERS,
  BASE_URL_GARAGE,
  BASE_URL_WINNERS,
} from './constants';
import { Car, Winners } from './types';

export const getAllCars = async (pageNumber = 1): Promise<{ cars: Car[], length: number }> => {
  const res: Response = await fetch(`${BASE_URL_GARAGE}?_page=${pageNumber}&_limit=${MAX_ITEMS_PER_PAGE_GARAGE}`);
  const data: Car[] = await res.json();
  return {
    cars: data,
    length: +res.headers.get('X-Total-Count'),
  };
};

export const getCar = async (id: number): Promise<Car> => {
  const res: Response = await fetch(`${BASE_URL_GARAGE}/${id}`);
  const data: Car = await res.json();
  return data;
};

export const createCar = async (car: Car): Promise<Car> => {
  const res: Response = await fetch(
    `${BASE_URL_GARAGE}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    },
  );
  const data: Car = await res.json();
  return data;
};

export const updateCar = async (car: Car): Promise<Car> => {
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
  const data: Car = await res.json();
  return data;
};

export const deleteCar = async (id: number): Promise<Car> => {
  const res: Response = await fetch(`${BASE_URL_GARAGE}/${id}`, { method: 'DELETE' });
  const data: Car = await res.json();
  console.log(data);
  return data;
};

export const getWinners = async (pageNumber = 1, sort = 'id', order = 'ASC') => {
  const res: Response = await fetch(`${BASE_URL_WINNERS}?_page=${pageNumber}&_limit=${MAX_ITEMS_PER_PAGE_WINNERS}&_sort=${sort}&_order=${order}`);
  const data: Winners[] = await res.json();
  return {
    winners: await Promise.all(data.map(async (winner) => ({
      ...winner,
      car: await getCar(winner.id),
    }))),
    length: +res.headers.get('X-Total-Count'),
  };
};
