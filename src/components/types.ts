export type VoidEmptyFunction = () => void;

export type VoidStringArrayFunction = (arr: string[]) => void;

export type VoidEventFunction = (e: Event) => void;

export type VoidEventParamFunction = (e: Event, param: string) => void;

export type Size = {
  [key: string]: number
};

export type TextContent = {
  manufacturer: string,
  wheels: string,
  frame: string,
  color: string,
  category: string
};

export type BikeData = {
  num: number,
  buy: boolean,
  category: string,
  color: string,
  manufacturer: string,
  name: string,
  photo: string,
  popular: boolean,
  frame: string,
  stock: number,
  wheels: number,
  year: number
};

export type BikeFilterObject = {
  [key: string]: string[] | boolean,
  manufacturers: string[],
  wheelSize: string[],
  frameSize: string[],
  colors: string[],
  categories: string[],
  popular: boolean
};
