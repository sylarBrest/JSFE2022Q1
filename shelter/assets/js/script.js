import variable from './params.js';
// Hamburger menu
const toggleMenu = () => {
  variable['hamburger'].classList.toggle('open');
  variable['nav'].classList.toggle('open');
  variable['body'].classList.toggle('open');
  variable['logo'].classList.toggle('open');
};

const closeMenu = (event) => {
  if (event.target.classList.contains('nav-link') || event.target.classList.contains('darken')) {
    variable['hamburger'].classList.remove('open');
    variable['nav'].classList.remove('open');
    variable['body'].classList.remove('open');
    variable['logo'].classList.remove('open');
  }
};

variable['hamburger'].addEventListener('click', toggleMenu);
variable['nav'].addEventListener('click', closeMenu);
variable['darken'].addEventListener('click', closeMenu);