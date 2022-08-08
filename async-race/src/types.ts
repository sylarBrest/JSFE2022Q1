export type SortBy = 'id' | 'wins' | 'time';

export type SortOrder = 'ASC' | 'DESC';

export enum SortingBy {
  id = 'id',
  wins = 'wins',
  time = 'time',
}

export enum SortingOrder {
  asc = 'ASC',
  desc = 'DESC',
}

export enum Views {
  garage = 'Garage',
  winners = 'Winners',
}

export enum Initial {
  color = '#ffffff',
  value = '',
}

export type Car = {
  color: string,
  id?: number,
  name: string,
};

export type Engine = {
  velocity: number,
  distance: number,
};

export type Winner = {
  id?: number,
  wins: number,
  time: string,
  car: Car,
};

export type Success = {
  success: boolean,
};

export type State = {
  [key: string]: number;
};

export type Point = {
  x: number,
  y: number,
};

export type Storage = {
  view: string,
  garagePage: number,
  garage: Car[],
  garageLength: number,
  winnersPage: number,
  winners: Winner[],
  winnersLength: number,
  sortBy: SortBy,
  sortOrder: SortOrder,
  drivingAnimation: Record<string, State>,
};

export type Cars = {
  cars: Car[],
  length: number,
};

export type Winners = {
  winners: Winner[],
  length: number,
};

export type RaceResult = {
  finished: boolean,
  id: number,
  time: number,
};

export type WinnerResult = {
  id?: number,
  name: string,
  color: string,
  time: number,
};
