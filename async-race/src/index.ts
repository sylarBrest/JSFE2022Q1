import * as Render from './render';

import './scss/style.scss';

console.log('Start Async-race task');

document.getElementsByTagName('body')[0].innerHTML = `
  ${Render.renderHeader()}
  ${Render.renderMain()}
  ${Render.renderFooter()}`;
