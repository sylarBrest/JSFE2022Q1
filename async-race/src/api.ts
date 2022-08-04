import { MAX_ITEMS_PER_PAGE_GARAGE, BASE_URL } from './constants';
import { Car } from './types';

export const getAllCars = async (pageNumber = 1): Promise<{ cars: Car[], length: number } > => {
  const res: Response = await fetch(`${BASE_URL}/garage?_page=${pageNumber}&_limit=${MAX_ITEMS_PER_PAGE_GARAGE}`);
  const data: Car[] = await res.json();
  return {
    cars: data,
    length: +res.headers.get('X-Total-Count'),
  };
};

export const getCar = async (id: number): Promise<Car> => {
  const res: Response = await fetch(`${BASE_URL}/garage?id=${id}`);
  const data: Car = await res.json();
  return data;
};

export const createCar = async (car: Car): Promise<Car> => {
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
  const data: Car = await res.json();
  return data;
};

export const updateCar = async (car: Car): Promise<Car> => {
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
  const data: Car = await res.json();
  return data;
};

export const deleteCar = async (id: number): Promise<Car> => {
  const res: Response = await fetch(`${BASE_URL}/garage/${id}`, { method: 'DELETE' });
  const data: Car = await res.json();
  console.log(data);
  return data;
};
