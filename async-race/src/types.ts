export type Car = {
  color: string,
  id: number,
  name: string,
};

export type Storage = {
  view: string,
  pageGarage: number,
  garage: Car[],
  garageLength: number,
};
