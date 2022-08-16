import * as Api from './api/index';
import * as Render from './render/index';
import * as Utils from './utils';
import listeners from './ui';
import './self-check';

import './scss/style.scss';

Api.getAllCars();

document.body.innerHTML = `
  ${Render.renderHeader()}
  ${Render.renderFooter()}
`;

Render.renderMain();

Utils.prevButtonUpdateState();
Utils.nextButtonUpdateState();

listeners();
