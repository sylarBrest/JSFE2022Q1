import { getAllCars } from './api/index';
import { renderHeader, renderMain, renderFooter } from './render/index';
import { prevButtonUpdateState, nextButtonUpdateState } from './utils';
import listeners from './ui';
import './self-check';

import './scss/style.scss';

getAllCars();

document.body.innerHTML = `
  ${renderHeader()}
  ${renderFooter()}
`;

renderMain();

prevButtonUpdateState();
nextButtonUpdateState();

listeners();
