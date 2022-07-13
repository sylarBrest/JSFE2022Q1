import { bikes } from '../../../bikes';
import { BikeData } from '../../../types';

import './card.scss';

class Card {
  public drawCard() {
    bikes.forEach((bike: BikeData) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.backgroundColor = bike.buy ? '#7789ab' : '#ffffff';
      
      const cardName = document.createElement('h3');
      cardName.className = 'card-name';
      cardName.textContent = bike.name;
      
      const cardImage = document.createElement('img');
      cardImage.className = 'card-image';
      cardImage.src = bike.photo;

      const cardInfo = document.createElement('div');
      cardInfo.className = 'card-info';

      const cardManufacturer = document.createElement('p');
      cardManufacturer.className = 'card-manufacturer';
      cardManufacturer.textContent = `Производитель: ${bike.manufacturer}`;

      const cardYear = document.createElement('p');
      cardYear.className = 'card-year';
      cardYear.textContent = `Модельный год: ${bike.year}`;

      const cardCategory = document.createElement('p');
      cardCategory.className = 'card-category';
      cardCategory.textContent = `Категория: ${bike.category}`;

      const cardWheelSize = document.createElement('p');
      cardWheelSize.className = 'card-wheel-size';
      cardWheelSize.textContent = `Размер колёс: ${bike.wheels}"`;

      const cardFrameSize = document.createElement('p');
      cardFrameSize.className = 'card-frame-size';
      cardFrameSize.textContent = `Размер рамы: ${bike.size}`;

      const cardColor = document.createElement('p');
      cardColor.className = 'card-color';
      cardColor.textContent = `Цвет: ${bike.color}`;

      const cardStockAmount = document.createElement('p');
      cardStockAmount.className = 'card-stock-amount';
      cardStockAmount.textContent = `Количество на складе: ${bike.stock}`;

      const cardPopular = document.createElement('p');
      cardPopular.className = 'card-popular';
      cardPopular.textContent = `Популярный: ${bike.popular ? 'да' : 'нет'}`;

      const cardInCartButton = document.createElement('button');
      cardInCartButton.className = 'card-buy';
      cardInCartButton.style.visibility = bike.buy ? 'visible' : 'hidden';

      cardInfo.append(cardManufacturer, cardYear, cardCategory,
        cardWheelSize, cardFrameSize, cardColor, cardStockAmount, cardPopular);
      card.append(cardName, cardImage, cardInfo);
      document.getElementsByClassName('cards')[0].append(card);
    })
  }
}

export default Card;