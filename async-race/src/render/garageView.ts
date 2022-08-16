import { EmptyStringFn } from '../types';
import storage from '../storage';
import renderGarage from './garage';
import renderPaginationButtonsContainer from './pagination';

const renderCreateCarContainer: EmptyStringFn = (): string => `
  <div class="create-car">
    <input class="text-input create-car-text" aria-label="Name of new car" type="text" value="${storage.createCarInputState.name}">
    <input class="color-input create-car-color" aria-label="Color of new car" type="color" value="${storage.createCarInputState.color}">
    <button class="button create-car-button">Create</button>
  </div>
`;

const renderWinnerMessage: EmptyStringFn = (): string => `
  <p class="winner-message"></p>
`;

const renderUpdateCarContainer: EmptyStringFn = (): string => {
  const disabled: string = storage.updateCarInputState.disabled ? 'disabled' : '';
  return `
    <div class="update-car" data-update-car-id="${storage.updateCarInputState.id}">
      <input class="text-input update-car-text" aria-label="Name of selected car" type="text" value="${storage.updateCarInputState.name}" ${disabled}>
      <input class="color-input update-car-color" aria-label="Color of selected car" type="color" value="${storage.updateCarInputState.color}" ${disabled}>
      <button class="button update-car-button" ${disabled}>Update</button>
    </div>
  `;
};

const renderControlButtonsContainer: EmptyStringFn = (): string => `
  <div class="control-buttons">
    <button class="button race-button">Race</button>
    <button class="button reset-button" disabled>Reset</button>
    <button class="button generate-cars-button">Generate cars</button>
  </div>
`;

const renderGarageView: EmptyStringFn = (): string => `
  <section class="view garage-view">
    <div class="view-heading">  
      <div class="controls">
        ${renderCreateCarContainer()}
        ${renderUpdateCarContainer()}
        ${renderControlButtonsContainer()}
      </div>
      ${renderWinnerMessage()}
    </div>
    <div class="garage">
      ${renderGarage()}
    </div>
    ${renderPaginationButtonsContainer()}
  </section>
`;

export default renderGarageView;
