import * as Render from './render';
import * as API from './api';
import Listeners from './ui';

import './scss/style.scss';

console.log('Start Async-race task');

API.getAllCars();

document.getElementsByTagName('body')[0].innerHTML = `
  ${Render.renderHeader()}
  ${Render.renderFooter()}
`;

Render.renderMain();

Listeners();
