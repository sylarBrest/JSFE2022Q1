export type SortBy = 'id' | 'wins' | 'time';

export type SortOrder = 'ASC' | 'DESC';

export type View = 'Garage' | 'Winners';

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
  time: number,
};

export type WinnerCar = {
  id?: number,
  wins: number,
  time: number,
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

export type CreateInput = {
  name: string,
  color: string,
};

export type UpdateInput = {
  id: number,
  name: string,
  color: string,
  disabled: boolean,
};

export type Storage = {
  view: View,
  garagePage: number,
  garage: Car[],
  garageLength: number,
  winnersPage: number,
  winners: WinnerCar[],
  winnersLength: number,
  sortBy: SortBy,
  sortOrder: SortOrder,
  drivingAnimation: Record<string, State>,
  createCarInputState: CreateInput,
  updateCarInputState: UpdateInput,
};

export type Cars = {
  cars: Car[],
  length: number,
};

export type Winners = {
  winners: WinnerCar[],
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

export type SaveFn<T> = (element: T) => Promise<T>;

export type SpecifiedPromiseFn<T, U> = (param: T) => Promise<U>;

export type GetCarsFn = (page?: number) => Promise<Cars>;

export type GetWinnersFn = (
  page?: number,
  sortBy?: SortBy,
  sortOrder?: SortOrder,
  limit?: number,
) => Promise<Winners>;

export type EmptyStringFn = () => string;

export type EmptyVoidFn = () => void;

export type DrawFn = (color: string) => string;

export type RenderCarFn = (car: Car) => string;

export type RenderWinnerFn = (winner: WinnerCar, index: number) => string;

export type EmptyPromiseVoidFn = () => Promise<void>;

export type CarArrayFn = (count?: number) => Car[];

export type PointFn = (element: HTMLDivElement) => Point;

export type DistanceFn = (car: HTMLDivElement, flag: HTMLDivElement) => number;

export type AnimationStateFn = (
  car: HTMLDivElement,
  distance: number,
  animationTime: number,
) => State;

export type NumberVoidFn = (timestamp: number) => void;

export type PromisingPromiseFn = (
  promises: Promise<RaceResult>[],
  indexes: number[],
) => Promise<WinnerResult>;
