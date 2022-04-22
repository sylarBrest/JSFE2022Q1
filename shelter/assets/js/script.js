import variable from './params.js';
import petsData from './pets.js';
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

const fillPopup = (number) => {
  const popupPetImage = variable['popup'].querySelector('.popup-pet-image');
  const popupPetName = variable['popup'].querySelector('.popup-pet-name');
  const popupPetTypeBreed = variable['popup'].querySelector('.popup-pet-typebreed');
  const popupPetDescription = variable['popup'].querySelector('.popup-pet-description');
  const popupPetAge = variable['popup'].querySelector('.popup-pet-age');
  const popupPetInoculations = variable['popup'].querySelector('.popup-pet-inoculations');
  const popupPetDiseases = variable['popup'].querySelector('.popup-pet-diseases');
  const popupPetParasites = variable['popup'].querySelector('.popup-pet-parasites');
  popupPetImage.src = petsData[number]['img'];
  popupPetName.textContent = petsData[number]['name'];
  popupPetTypeBreed.textContent = `${petsData[number]['type']} - ${petsData[number]['breed']}`;
  popupPetDescription.textContent = petsData[number]['description'];
  popupPetAge.textContent = petsData[number]['age'];
  popupPetInoculations.textContent = petsData[number]['inoculations'].join(', ');
  popupPetDiseases.textContent = petsData[number]['diseases'].join(', ');
  popupPetParasites.textContent = petsData[number]['parasites'].join(', ');
}

const openPopup = (event) => {
  fillPopup(event.currentTarget.dataset['pet']);
  if (event.currentTarget.classList.contains('pets-card')) {
    variable['popup'].classList.add('open');
    variable['darken'][1].classList.add('open');
    variable['body'].classList.add('open');
  }
};

const closePopup = (event) => {
  if ((event.target.classList.contains('button-close')) || (event.target.classList.contains('darken'))) {
    variable['popup'].classList.remove('open');
    variable['darken'][1].classList.remove('open');
    variable['body'].classList.remove('open');
  }
};

variable['pets-card'].forEach(el => el.addEventListener('click', openPopup));
variable['popup'].addEventListener('click', closePopup);
variable['darken'][1].addEventListener('click', closePopup);

export { openPopup };