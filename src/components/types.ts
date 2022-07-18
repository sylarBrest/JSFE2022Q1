export type VoidEmptyFunction = () => void;

export type VoidEventFunction = (e: Event) => void;

export type VoidEventParamFunction = (e: Event, param: string) => void;

export type BikeData = {
  num: number,
  buy: boolean,
  category: string,
  color: string,
  manufacturer: string,
  name: string,
  photo: string,
  popular: boolean,
  size: string,
  stock: number,
  wheels: number,
  year: number
};

export type BikeDataArray = BikeData[];

export type BikeFilterObject = {
  [key: string]: string[] | boolean,
  manufacturers: string[],
  wheelSize: string[],
  frameSize: string[],
  colors: string[],
  categories: string[],
  popular: boolean
};
