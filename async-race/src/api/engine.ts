import { TEngine, TSuccess, SpecifiedPromiseFn } from '../types';
import { BASE_URL_ENGINE } from '../constants';

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
