// import * as Render from './render';
import { MAX_ITEMS_PER_PAGE_GARAGE, BASE_URL } from './constants';
import { Car } from './types';

export const getAllCars = async (pageNumber = 1) => {
  const res: Response = await fetch(`${BASE_URL}/garage?_page=${pageNumber}&_limit=${MAX_ITEMS_PER_PAGE_GARAGE}`);
  // const data = await res.json();
  return {
    data: await res.json(),
    length: +res.headers.get('X-Total-Count'),
  };
};

export const getCar = async (id: number) => {
  const res: Response = await fetch(`${BASE_URL}/garage?id=${id}`);
  return res.json();
};

export const createCar = async (car: Car) => {
  const res: Response = await fetch(
    `${BASE_URL}/garage`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    },
  );
  return res.json();
};

export const updateCar = async (car: Car) => {
  const res: Response = await fetch(
    `${BASE_URL}/garage/${car.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    },
  );
  return res.json();
};

export const deleteCar = async (id: number) => {
  const res: Response = await fetch(`${BASE_URL}/garage/${id}`, { method: 'DELETE' });
  return res.json();
};
