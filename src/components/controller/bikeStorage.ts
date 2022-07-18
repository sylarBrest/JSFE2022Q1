interface BikeStorage {
  getBikesFromStorage(): HTMLDivElement[];
  setBikesToStorage(items: HTMLDivElement[]): void;
  getBikesFromRemovedStorage(): HTMLDivElement[];
  setBikesToRemovedStorage(removedItems: HTMLDivElement[]): void;
}

class BikeStorage implements BikeStorage {
  private bikeCards: HTMLDivElement[];

  private bikeCardsAll;

  private removedBikeCards: HTMLDivElement[];

  constructor(startCards = document.getElementsByClassName('card') as HTMLCollectionOf<HTMLDivElement>) {
    this.bikeCardsAll = startCards;
    this.bikeCards = [];
    this.removedBikeCards = [];
  }

  initBikeStorage() {
    this.bikeCards.push(...this.bikeCardsAll);
  }

  getBikesFromStorage(): HTMLDivElement[] {
    return this.bikeCards;
  }

  setBikesToStorage(items: HTMLDivElement[]): void {
    this.bikeCards.push(...items);
  }

  removeBikesFromStorage(): void {
    this.bikeCards = [];
  }

  writeBikeStorageToDOM(items: HTMLDivElement[]): void {
    this.setBikesToStorage(items);
    document.getElementsByClassName('cards')[0].append(...items);
  }

  getBikesFromRemovedStorage(): HTMLDivElement[] {
    return this.removedBikeCards;
  }

  setBikesToRemovedStorage(removedItems: HTMLDivElement[]): void {
    this.removedBikeCards.push(...removedItems);
  }
}

export default BikeStorage;
