export type Car = {
  color: string,
  id?: number,
  name: string,
};

export type Storage = {
  view: string,
  garagePage: number,
  garage: Car[],
  garageLength: number,
};
