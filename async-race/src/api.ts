import storage from './storage';
import * as Render from './render';
import { MAX_ITEMS_PER_PAGE_GARAGE } from './constants';

export const getGarage = async (url: string) => {
  const res: Response = await fetch(`${url}/garage`);
  const data = await res.json();
  console.log(data);
  storage.garage.push(...data);
  storage.garageLength = data.length;
  Render.updateGarageLength(data.length);
  console.log(document.getElementsByClassName('garage')[0]);
  document.getElementsByClassName('garage')[0].insertAdjacentHTML('beforeend', Render.renderTrack(data));
};

export const getGaragePage = async (
  pageNumber: number,
  url = 'http://127.0.0.1:3000',
  limit: number = MAX_ITEMS_PER_PAGE_GARAGE,
) => {
  const res: Response = await fetch(`${url}/garage?_page=${pageNumber}&_limit=${limit}`);
  const data = await res.json();
  console.log(data);
  storage.garageLength = data.length;
  Render.updateGarageLength(data.length);
};
