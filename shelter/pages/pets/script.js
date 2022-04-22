//for pets
import petsData from '../../assets/js/pets.js';
import { openPopup } from '../../assets/js/script.js';

//Arrange cards with pets
let currentPage = 1;
const petsCards = document.querySelector('.pets-cards');
function arrangeCards(amount) {
    for (let i = 0; i < amount; i++) {
        const card = `<div class="pets-card" data-pet="${pets[i]}">
        <img src="${pets[i]['img']}" alt="${pets[i]['name']}" class="pets-card-image">
        <h4 class="pets-card-title">${pets[i]['name']}</h4>
        <button class="pets-button">Learn more</button>
        </div>
        `;
        petsCards.insertAdjacentHTML('beforeend', card);
    }
}

//Get amount of cards relative to media-query
const amountCards = function() {
    if (window.matchMedia('(max-width: 767px)').matches) {
        return 3;
    }
    if (window.matchMedia('(max-width: 1279px)').matches) {
        return 6;
    }
    return 8;
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

//Animation of pagination
const letAnimate = () => {
    const petsCardImage = document.querySelectorAll('.pets-card-image');
    petsCardImage.forEach(el => el.animate([
        { 
            opacity: 0,
        },
        { 
            opacity: 1,
        },
    ], 1500));
}

const pets = getPetsArray();

//Fill card with pets of current page
const fillCard = (page, amount) => {
    letAnimate();
    const card = document.querySelectorAll('.pets-card'),
          temp = pets.slice((page - 1) * amount, page * amount);
    card.forEach((el, ind) => {
        const cardImage = el.querySelector('.pets-card-image'),
              cardTitle = el.querySelector('.pets-card-title');
        cardImage.src = petsData[temp[ind]]['img'];
        cardTitle.textContent = petsData[temp[ind]]['name'];
        el.dataset['pet'] = temp[ind];
    });
}

//Fill cards with pagination
const fillCards = () => {
    arrangeCards(amountCards());
    fillCard(currentPage, amountCards());
    const petsCard = document.querySelectorAll('.pets-card');
    petsCard.forEach(el => el.addEventListener('click', openPopup));
}

window.addEventListener('load', fillCards);

//Pagination
const firstPage = document.querySelector('.first-page');
const prevPage = document.querySelector('.prev-page');
const curPage = document.querySelector('.current-page');
const nextPage = document.querySelector('.next-page');
const lastPage = document.querySelector('.last-page');

//Go to next page
const fillNextPage = () => {
    currentPage++;
    fillCard(currentPage, amountCards());
    curPage.textContent = currentPage;
    firstPage.removeAttribute('disabled');
    prevPage.removeAttribute('disabled');
    if (currentPage === Math.floor(pets.length / amountCards())) {
        nextPage.setAttribute('disabled', 'disabled');
        lastPage.setAttribute('disabled', 'disabled');
    }
}

//go to previous page
const fillPrevPage = () => {
    currentPage--;
    fillCard(currentPage, amountCards());
    curPage.textContent = currentPage;
    lastPage.removeAttribute('disabled');
    nextPage.removeAttribute('disabled');
    if (currentPage === 1) {
        prevPage.setAttribute('disabled', 'disabled');
        firstPage.setAttribute('disabled', 'disabled');
    }
}

//go to last page
const fillLastPage = () => {
    currentPage = Math.floor(pets.length / amountCards());
    fillCard(currentPage, amountCards());
    curPage.textContent = currentPage;
    firstPage.removeAttribute('disabled');
    prevPage.removeAttribute('disabled');
    nextPage.setAttribute('disabled', 'disabled');
    lastPage.setAttribute('disabled', 'disabled');
}

//go to first page
const fillFirstPage = () => {
    currentPage = 1;
    fillCard(currentPage, amountCards());
    curPage.textContent = currentPage;
    lastPage.removeAttribute('disabled');
    nextPage.removeAttribute('disabled');
    prevPage.setAttribute('disabled', 'disabled');
    firstPage.setAttribute('disabled', 'disabled');
}

nextPage.addEventListener('click', fillNextPage);
prevPage.addEventListener('click', fillPrevPage);
lastPage.addEventListener('click', fillLastPage);
firstPage.addEventListener('click', fillFirstPage);

/* TO DO list
1. Перерисовывать карточки с изменением ширины экрана (window.onresize)
*/