import petsData from '../../assets/js/pets.js';
import { openPopup } from '../../assets/js/script.js';
// Self-check
let requirements = `Начали`;

console.log(requirements);

//Arrange cards with pets in carousel
const carousel = document.querySelector('.carousel');
function arrangeCards(amount) {
    let slider = '';
    for (let j = 1; j <= 3; j++) {
        let t;
        switch (j) {
           case 1: t = ' prev'; break;
           case 2: t = ' active'; break;
           case 3: t = ' next'; break;
        }
        slider += `<div class="pets-cards${t}">
        `;
        for (let i = 0; i < amount; i++) {
            const ind = j * (i + 1) - 1;
            const card = `<div class="pets-card" data-pet="${pets[ind]}">
            <img src="${petsData[pets[ind]]['img']}" alt="${petsData[pets[ind]]['name']}" class="pets-card-image">
            <h4 class="pets-card-title">${petsData[pets[ind]]['name']}</h4>
            <button class="pets-button">Learn more</button>
            </div>
            `;
            slider += card;
        }
        slider += `</div>
        `;
    }
    carousel.insertAdjacentHTML('beforeend', slider);
}

//Get amount of cards relative to media-query
const amountCards = function() {
    if (window.matchMedia('(max-width: 767px)').matches) {
        return 1;
    }
    if (window.matchMedia('(max-width: 1279px)').matches) {
        return 2;
    }
    return 3;
}

//Pseudo-random array of 8 pets
const getRndArray = () => {
    let res = [];
    res.push(Math.floor(8 * Math.random()));
    while (res.length < 8) {
        const r = Math.floor(8 * Math.random());
        if (res.indexOf(r) === -1) {
            res.push(r);
        }
    }
    return res;
}

//Get Arrayof 8 pets by 6
const getPetsArray = () => {
    let pets = getRndArray();
    for (let j = 1; j < 6; j++) {
        let temp = [],
            res = getRndArray();
        for (let i = 0; i < res.length; i++) {
            ((pets.slice(-5).indexOf(res[i]) === -1) && (pets.slice(-2).indexOf(res[i]) === -1))
                ? pets.push(res[i])
                : temp.push(res[i]);
        }
        pets.push(...temp);
    }
    return pets;
}

const pets = getPetsArray();

console.log(pets);

const fillCards = () => {
    arrangeCards(amountCards());
//    fillCard(currentPage, amountCards());
    const petsCard = document.querySelectorAll('.pets-card');
    petsCard.forEach(el => el.addEventListener('click', openPopup));
}

window.addEventListener('load', fillCards);

//Carousel
const prevButton = document.querySelector('.pets-prev');
const nextButton = document.querySelector('.pets-next');

const createCardTemplate = () => {
    const card = document.createElement('div');
    card.classList.add('card');
    return card;
  }
  
  const moveLeft = () => {
    carousel.classList.add('transition-left');
    prevButton.removeEventListener('click', moveLeft);
    nextButton.removeEventListener('click', moveRight);
  };
  
  const moveRight = () => {
    carousel.classList.add('transition-right');
    prevButton.removeEventListener('click', moveLeft);
    nextButton.removeEventListener('click', moveRight);
  };
  
  prevButton.addEventListener('click', moveLeft);
  nextButton.addEventListener('click', moveRight);
  
  carousel.addEventListener('animationend', (animationEvent) => {
    const prevCards = document.querySelector('.prev');
    const nextCards = document.querySelector('.next');
    let changedItem;
    if (animationEvent.animationName === 'move-left') {
        carousel.classList.remove('transition-left');
        changedItem = prevCards;
        document.querySelector('.pets-cards.active').innerHTML = prevCards.innerHTML;
    } else {
        carousel.classList.remove('transition-right');
        changedItem = nextCards;
        document.querySelector('.pets-cards.active').innerHTML = nextCards.innerHTML;
    }

    changedItem.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const card = createCardTemplate();
        card.innerText = Math.floor(Math.random() * 8);
        changedItem.appendChild(card);
    }
    
    prevButton.addEventListener('click', moveLeft);
    nextButton.addEventListener('click', moveRight);
  })