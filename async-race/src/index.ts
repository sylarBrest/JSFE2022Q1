import * as Render from './render';
import * as API from './api';
import * as Utils from './utils';

import './scss/style.scss';
import Listeners from './ui';

console.log('Start Async-race task');

API.getAllCars();

document.body.innerHTML = `
  ${Render.renderHeader()}
  ${Render.renderFooter()}
`;

Render.renderMain();

Utils.prevButtonUpdateState();
Utils.nextButtonUpdateState();

Listeners();
