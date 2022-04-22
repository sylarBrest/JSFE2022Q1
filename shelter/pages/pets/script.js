//for pets
import petsData from '../../assets/js/pets.js';
import { openPopup } from '../../assets/js/script.js';

const petsCards = document.querySelector('.pets-cards');
function arrangeCards() {
    for (let i = 0; i < 8; i++) {
        const card = `<div class="pets-card" data-pet="${pets[i]}">
        <img src="${pets[i]['img']}" alt="${pets[i]['name']}" class="pets-card-image">
        <h4 class="pets-card-title">${pets[i]['name']}</h4>
        <button class="pets-button">Learn more</button>
        </div>
        `;
        petsCards.insertAdjacentHTML('beforeend', card);
    }
}

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

const fillCards = () => {
    arrangeCards();
    const card = document.querySelectorAll('.pets-card'),
          temp = pets.slice(0, 8);
    card.forEach((el, ind) => {
        const cardImage = el.querySelector('.pets-card-image'),
              cardTitle = el.querySelector('.pets-card-title');
        cardImage.src = petsData[temp[ind]]['img'];
        cardTitle.textContent = petsData[temp[ind]]['name'];
        el.dataset['pet'] = temp[ind];
    })
    const petsCard = document.querySelectorAll('.pets-card');
    petsCard.forEach(el => el.addEventListener('click', openPopup));
}

window.addEventListener('load', fillCards);