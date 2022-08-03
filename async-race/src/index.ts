import * as Render from './render';
import * as API from './api';
import store from './storage';
import { BASE_URL } from './constants';

import './scss/style.scss';

console.log('Start Async-race task');

API.getGarage(BASE_URL);

document.getElementsByTagName('body')[0].innerHTML = `
  ${Render.renderHeader()}
  ${Render.renderMain()}
  ${Render.renderFooter()}`;

console.log(store);
