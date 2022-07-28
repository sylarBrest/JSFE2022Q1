interface BikeStorage {
  initBikeStorage(): void;
  getBikesFromStorage(): HTMLDivElement[];
  removeBikesFromStorage(): void;
  writeBikeStorageToDOM(items: HTMLDivElement[]): void;
}

class BikeStorage implements BikeStorage {
  private bikeCards: HTMLDivElement[];
  private bikeCardsAll: HTMLCollectionOf<HTMLDivElement>;

  constructor(startCards = document.getElementsByClassName('card') as HTMLCollectionOf<HTMLDivElement>) {
    this.bikeCardsAll = startCards;
    this.bikeCards = [];
  }

  public initBikeStorage(): void {
    this.bikeCards.push(...this.bikeCardsAll);
  }

  public getBikesFromStorage(): HTMLDivElement[] {
    return this.bikeCards;
  }

  private setBikesToStorage(items: HTMLDivElement[]): void {
    this.bikeCards.push(...items);
  }

  public removeBikesFromStorage(): void {
    this.bikeCards = [];
  }

  public writeBikeStorageToDOM(items: HTMLDivElement[]): void {
    this.setBikesToStorage(items);
    document.getElementsByClassName('cards')[0].append(...items);
  }
}

export default BikeStorage;
