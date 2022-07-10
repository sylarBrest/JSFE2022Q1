import './style.scss';
import { footer } from './footer/footer';
import { setFavicons } from './head/favicon';
import './assets/favicon.ico';

console.log("Hello World!");

const main = document.getElementsByClassName('main')[0];

main.textContent = 'HELLO WORLD!';
footer.textContent = 'hu is hu!';

setFavicons('assets/favicon.ico');