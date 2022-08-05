export type Car = {
  color: string,
  id?: number,
  name: string,
};

export type Winners = {
  id?: number,
  wins: number,
  time: string,
  car: Car,
};

export type Storage = {
  view: string,
  garagePage: number,
  garage: Car[],
  garageLength: number,
  winnersPage: number,
  winners: Winners[],
  winnersLength: number,
};
