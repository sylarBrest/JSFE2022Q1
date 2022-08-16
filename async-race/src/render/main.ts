import { EmptyPromiseVoidFn } from '../types';
import renderFooter from './footer';
import renderViewSwitch from './viewSwitch';
import renderGarageView from './garageView';

const renderMain: EmptyPromiseVoidFn = async (): Promise<void> => {
  const main: HTMLElement = document.createElement('main');
  main.className = 'main';
  main.innerHTML = `
    <div class="container main-container">
      ${renderViewSwitch()}
      ${renderGarageView()}
    </div>`;

  document.body.appendChild(main);
  document.body.removeChild(document.getElementsByClassName('footer')[0]);
  document.body.innerHTML += renderFooter();
};

export default renderMain;
