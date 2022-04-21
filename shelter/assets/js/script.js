import variable from './params.js';
// Hamburger menu
const toggleMenu = () => {
  variable['hamburger'].classList.toggle('open');
  variable['nav'].classList.toggle('open');
  variable['body'].classList.toggle('open');
  variable['logo'].classList.toggle('open');
};

const closeMenu = (event) => {
  if ((event.target.classList.contains('nav-link')) || (event.target.classList.contains('darken'))) {
    variable['hamburger'].classList.remove('open');
    variable['nav'].classList.remove('open');
    variable['body'].classList.remove('open');
    variable['logo'].classList.remove('open');
  }
};

variable['hamburger'].addEventListener('click', toggleMenu);
variable['nav'].addEventListener('click', closeMenu);
variable['darken'][0].addEventListener('click', closeMenu);

// Popup (modal window)
const openPopup = (event) => {
  if (event.currentTarget.classList.contains('pets-card')) {
    variable['popup'].classList.add('open');
    variable['darken'][1].classList.add('open');
    variable['body'].classList.add('open');
  }
};

const closePopup = (event) => {
  console.log(event.target)
  if ((event.target.classList.contains('button-close')) || (event.target.classList.contains('darken'))) {
    variable['popup'].classList.remove('open');
    variable['darken'][1].classList.remove('open');
    variable['body'].classList.remove('open');
  }
};

variable['pets-card'].forEach(el => el.addEventListener('click', openPopup));
variable['popup'].addEventListener('click', closePopup);
variable['darken'][1].addEventListener('click', closePopup);