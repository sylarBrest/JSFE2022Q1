import petsData from '../../assets/js/pets.js';
import { openPopup } from '../../assets/js/script.js';
// Self-check
let requirements = `Начали`;

console.log(requirements);

//Arrange cards with pets in carousel
const carousel = document.querySelector('.carousel');
function arrangeCards(amount) {
    let slider = '',
        ind = 0;
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
            const card = `<div class="pets-card" data-pet="${pets[ind]}">
            <img src="${petsData[pets[ind]]['img']}" alt="${petsData[pets[ind]]['name']}" class="pets-card-image">
            <h4 class="pets-card-title">${petsData[pets[ind]]['name']}</h4>
            <button class="pets-button">Learn more</button>
            </div>
            `;
            ind++;
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

//Pseudo-random array of 3 pets
const getNewRndArray = () => {
    let res = [];
    while (res.length < amountCards()) {
        const r = Math.floor(8 * Math.random());
        if (res.indexOf(r) === -1) {
            res.push(r);
        }
    }
    return res;
}

const getRndArray = (init) => {
    let res = [];
    while (res.length < amountCards()) {
        const r = Math.floor(8 * Math.random());
        if ((res.indexOf(r) === -1) && (init.indexOf(r) === -1)) {
            res.push(r);
        }
    }
    return res;
}

//Get Array of 3 pets by 3
const getPetsArray = () => {
    let pets = getNewRndArray();
    for (let j = 1; j < 3; j++) {
        pets.push(...getRndArray(pets.slice((j - 1) * amountCards(), amountCards() * j)));
    }
    return pets;
}

const pets = getPetsArray();

const fillCards = () => {
    arrangeCards(amountCards());
    const petsCard = document.querySelectorAll('.pets-card');
    petsCard.forEach(el => el.addEventListener('click', openPopup));
}

window.addEventListener('load', fillCards);

//Carousel
const prevButton = document.querySelector('.pets-prev');
const nextButton = document.querySelector('.pets-next');

const createCardTemplate = () => {
    const card = `<div class="pets-card" data-pet="">
    <img src="" alt="pet-image" class="pets-card-image">
    <h4 class="pets-card-title"></h4>
    <button class="pets-button">Learn more</button>
    </div>
    `;
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
    const actCards = document.querySelector('.pets-cards.active');
    let changedItem,
        arr = [], arrP = [], arrN = [];
    prevCards.querySelectorAll('.pets-card').forEach(el => arrP.push(+el.dataset['pet']));
    nextCards.querySelectorAll('.pets-card').forEach(el => arrN.push(+el.dataset['pet']));
    if (animationEvent.animationName === 'move-left') {
        carousel.classList.remove('transition-left');
        changedItem = prevCards;
        actCards.innerHTML = prevCards.innerHTML;
        let petArr = getRndArray(arrP);
        nextCards.querySelectorAll('.pets-card').forEach((el, ind) => {
            const cardImage = el.querySelector('.pets-card-image'),
                  cardTitle = el.querySelector('.pets-card-title');
            cardImage.src = petsData[petArr[ind]]['img'];
            cardTitle.textContent = petsData[petArr[ind]]['name'];
            el.dataset['pet'] = petArr[ind];
        })
    } else {
        carousel.classList.remove('transition-right');
        changedItem = nextCards;
        actCards.innerHTML = nextCards.innerHTML;
        let petArr = getRndArray(arrN);
        prevCards.querySelectorAll('.pets-card').forEach((el, ind) => {
            const cardImage = el.querySelector('.pets-card-image'),
                  cardTitle = el.querySelector('.pets-card-title');
            cardImage.src = petsData[petArr[ind]]['img'];
            cardTitle.textContent = petsData[petArr[ind]]['name'];
            el.dataset['pet'] = petArr[ind];
        })
    }
    changedItem.querySelectorAll('.pets-card').forEach(el => arr.push(+el.dataset['pet']));

    changedItem.innerHTML = '';
    for (let i = 0; i < amountCards(); i++) {
        const card = createCardTemplate();
        changedItem.insertAdjacentHTML('beforeend', card);
    }

    let petArr = getRndArray(arr);
    changedItem.querySelectorAll('.pets-card').forEach((el, ind) => {
        const cardImage = el.querySelector('.pets-card-image'),
              cardTitle = el.querySelector('.pets-card-title');
        cardImage.src = petsData[petArr[ind]]['img'];
        cardTitle.textContent = petsData[petArr[ind]]['name'];
        el.dataset['pet'] = petArr[ind];
    })

    const petsCard = document.querySelectorAll('.pets-card');
    petsCard.forEach(el => el.addEventListener('click', openPopup));
    prevButton.addEventListener('click', moveLeft);
    nextButton.addEventListener('click', moveRight);
})