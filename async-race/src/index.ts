import * as Render from './render';
import * as API from './api';
import * as Utils from './utils';
import listeners from './ui';
import './self-check';

import './scss/style.scss';

API.getAllCars();

document.body.innerHTML = `
  ${Render.renderHeader()}
  ${Render.renderFooter()}
`;

Render.renderMain();

Utils.prevButtonUpdateState();
Utils.nextButtonUpdateState();

listeners();
