import { TCar, EmptyStringFn, RenderCarFn } from '../types';
import { drawCar, drawFinish } from './draw';
import storage from '../storage';

const renderCarPath: RenderCarFn = (car: TCar): string => `
  <div class="car-path" data-car-path-id="${car.id}">
    <div class="car-controls">
      <button class="button select-button" data-car-select-id="${car.id}">Select</button>
      <button class="button remove-button" data-car-remove-id="${car.id}">Remove</button>
      <p class="car-name" data-car-name-id="${car.id}">${car.name}</p>
    </div>
    <div class="path">
      <button class="button start-button" data-car-start-id="${car.id}">➤</button>
      <button class="button stop-button" data-car-stop-id="${car.id}" disabled>↺</button>
      <div class="car" data-car-id="${car.id}">
        ${drawCar(car.color)}
      </div>
      <div class="finish" data-finish-id="${car.id}">
        ${drawFinish()}
      </div>
    </div>
  </div>
`;
const renderTrack: EmptyStringFn = (): string => `
  <div class="track">
    ${storage.garage.reduce((track: string, car: TCar) => track + renderCarPath(car), '')}
  </div>
`;

const renderGarage: EmptyStringFn = (): string => `
  <h2 class="title">Garage (${storage.garageLength})</h2>
  <h3 class="page">Page #${storage.garagePage}</h3>
  ${renderTrack()}
`;

export default renderGarage;
