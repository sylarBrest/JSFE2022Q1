import {
  MAX_ITEMS_PER_PAGE_GARAGE,
  MAX_ITEMS_PER_PAGE_WINNERS,
  BASE_URL_GARAGE,
  BASE_URL_WINNERS,
  BASE_URL_ENGINE,
} from './constants';
import {
  Car,
  Cars,
  Engine,
  Success,
  Winner,
  Winners,
} from './types';

export const getAllCars = async (pageNumber = 1): Promise<Cars> => {
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

  return data;
};

export const startEngine = async (id: number): Promise<Engine> => {
  const res: Response = await fetch(`${BASE_URL_ENGINE}?id=${id}&status=started`, { method: 'PATCH' });
  const data: Engine = await res.json();

  return data;
};

export const stopEngine = async (id: number): Promise<Engine> => {
  const res: Response = await fetch(`${BASE_URL_ENGINE}?id=${id}&status=stopped`, { method: 'PATCH' });
  const data: Engine = await res.json();

  return data;
};

export const drive = async (id: number): Promise<Success> => {
  const res: Response = await fetch(`${BASE_URL_ENGINE}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
  const data: Success = res.status !== 200 ? { success: false } : { ...(await res.json()) };

  return data;
};

export const getWinners = async (pageNumber = 1, sort = 'id', order = 'ASC'): Promise<Winners> => {
  const res: Response = await fetch(
    `${BASE_URL_WINNERS}?_page=${pageNumber}&_limit=${MAX_ITEMS_PER_PAGE_WINNERS}&_sort=${sort}&_order=${order}`,
  );
  const data: Winner[] = await res.json();

  return {
    winners: await Promise.all(data.map(async (winner: Winner) => ({
      ...winner,
      car: await getCar(winner.id),
    }))),
    length: +res.headers.get('X-Total-Count'),
  };
};

export const getWinner = async (id: number): Promise<Winner> => {
  const res: Response = await fetch(`${BASE_URL_WINNERS}/${id}`);
  const data: Winner = await res.json();

  return data;
};

export const deleteWinner = async (id: number): Promise<Winner> => {
  const res: Response = await fetch(`${BASE_URL_WINNERS}/${id}`, { method: 'DELETE' });
  const data: Winner = await res.json();

  return data;
};
