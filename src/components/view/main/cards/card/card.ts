import { BikeData } from '../../../../types';

import bikes from '../../../../bikeData';

import './card.scss';

interface Card {
  drawCard(): void;
}

class Card implements Card {
  public drawCard(): void {
    bikes.forEach((bike: BikeData) => {
      const card: HTMLDivElement = document.createElement('div');
      card.className = 'card';
      card.setAttribute('data-bike-num', bike.num.toString());

      const cardName: HTMLHeadingElement = document.createElement('h2');
      cardName.className = 'card-name';
      cardName.textContent = bike.name;

      const cardImage: HTMLImageElement = document.createElement('img');
      cardImage.className = 'card-image';
      cardImage.alt = `${bike.name}`;
      cardImage.src = bike.photo;

      const cardInfoDiv: HTMLDivElement = document.createElement('div');
      cardInfoDiv.className = 'card-info-all';

      const cardBagImage: HTMLDivElement = document.createElement('div');
      cardBagImage.className = 'card-bag';

      const cardInfo: HTMLDivElement = document.createElement('div');
      cardInfo.className = 'card-info';

      const cardManufacturer: HTMLParagraphElement = document.createElement('p');
      cardManufacturer.className = 'card-manufacturer';
      cardManufacturer.textContent = `Производитель: ${bike.manufacturer}`;

      const cardYear: HTMLParagraphElement = document.createElement('p');
      cardYear.className = 'card-year';
      cardYear.textContent = `Модельный год: ${bike.year}`;

      const cardCategory: HTMLParagraphElement = document.createElement('p');
      cardCategory.className = 'card-category';
      cardCategory.textContent = `Категория: ${bike.category}`;

      const cardWheelSize: HTMLParagraphElement = document.createElement('p');
      cardWheelSize.className = 'card-wheel-size';
      cardWheelSize.textContent = `Размер колёс: ${bike.wheels}"`;

      const cardFrameSize: HTMLParagraphElement = document.createElement('p');
      cardFrameSize.className = 'card-frame-size';
      cardFrameSize.textContent = `Размер рамы: ${bike.frame}`;

      const cardColor: HTMLParagraphElement = document.createElement('p');
      cardColor.className = 'card-color';
      cardColor.textContent = `Цвет: ${bike.color}`;

      const cardStockAmount: HTMLParagraphElement = document.createElement('p');
      cardStockAmount.className = 'card-stock-amount';
      cardStockAmount.textContent = `Количество на складе: ${bike.stock}`;

      const cardPopular: HTMLParagraphElement = document.createElement('p');
      cardPopular.className = 'card-popular';
      cardPopular.textContent = `Популярный: ${bike.popular ? 'да' : 'нет'}`;

      cardInfo.append(
        cardManufacturer,
        cardYear,
        cardCategory,
        cardWheelSize,
        cardFrameSize,
        cardColor,
        cardStockAmount,
        cardPopular,
      );
      cardInfoDiv.append(cardInfo, cardBagImage);
      card.append(cardName, cardImage, cardInfoDiv);
      document.getElementsByClassName('cards')[0].append(card);
    });
  }
}

export default Card;
