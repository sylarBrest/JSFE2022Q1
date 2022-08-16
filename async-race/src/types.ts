export type SortBy = 'id' | 'wins' | 'time';

export type SortOrder = 'ASC' | 'DESC';

export type View = 'Garage' | 'Winners';

export enum ESortingBy {
  id = 'id',
  wins = 'wins',
  time = 'time',
}

export enum ESortingOrder {
  asc = 'ASC',
  desc = 'DESC',
}

export enum EViews {
  garage = 'Garage',
  winners = 'Winners',
}

export enum EInitial {
  color = '#ffffff',
  value = '',
}

export type TCar = {
  color: string,
  id?: number,
  name: string,
};

export type TEngine = {
  velocity: number,
  distance: number,
};

export type TWinner = {
  id?: number,
  wins: number,
  time: number,
};

export type TWinnerCar = {
  id?: number,
  wins: number,
  time: number,
  car: TCar,
};

export type TSuccess = {
  success: boolean,
};

export type TState = {
  [key: string]: number;
};

export type TPoint = {
  x: number,
  y: number,
};

export type TCreateInput = {
  name: string,
  color: string,
};

export type TUpdateInput = {
  id: number,
  name: string,
  color: string,
  disabled: boolean,
};

export type TStorage = {
  view: View,
  garagePage: number,
  garage: TCar[],
  garageLength: number,
  winnersPage: number,
  winners: TWinnerCar[],
  winnersLength: number,
  sortBy: SortBy,
  sortOrder: SortOrder,
  drivingAnimation: Record<string, TState>,
  createCarInputState: TCreateInput,
  updateCarInputState: TUpdateInput,
};

export type TCars = {
  cars: TCar[],
  length: number,
};

export type TWinners = {
  winners: TWinnerCar[],
  length: number,
};

export type TRaceResult = {
  finished: boolean,
  id: number,
  time: number,
};

export type TWinnerResult = {
  id?: number,
  name: string,
  color: string,
  time: number,
};

export type TGetWinnerOptions = {
  page: number,
  sortBy: SortBy,
  sortOrder: SortOrder,
  limit: number,
};

export type SaveFn<T> = (element: T) => Promise<T>;

export type SpecifiedPromiseFn<T, U> = (param: T) => Promise<U>;

export type GetCarsFn = (page?: number) => Promise<TCars>;

export type GetWinnersFn = (options: Partial<TGetWinnerOptions>) => Promise<TWinners>;

export type EmptyStringFn = () => string;

export type EmptyVoidFn = () => void;

export type DrawFn = (color: string) => string;

export type RenderCarFn = (car: TCar) => string;

export type RenderWinnerFn = (winner: TWinnerCar, index: number) => string;

export type EmptyPromiseVoidFn = () => Promise<void>;

export type CarArrayFn = (count?: number) => TCar[];

export type PointFn = (element: HTMLDivElement) => TPoint;

export type DistanceFn = (car: HTMLDivElement, flag: HTMLDivElement) => number;

export type AnimationStateFn = (
  car: HTMLDivElement,
  distance: number,
  animationTime: number,
) => TState;

export type NumberVoidFn = (timestamp: number) => void;

export type PromisingPromiseFn = (
  promises: Promise<TRaceResult>[],
  indexes: number[],
) => Promise<TWinnerResult>;
