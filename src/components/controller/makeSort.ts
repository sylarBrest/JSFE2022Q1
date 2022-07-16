interface Sorting {
  sortElements(): void;
}

class Sorting implements Sorting {
  private bikeCards;

  constructor() {
    this.bikeCards = document.getElementsByClassName('card');
  }
  
  sortElements(): void {
    const sortOptions = document.getElementsByClassName('sort')[0] as HTMLSelectElement;
    
    const sortBy = () => {
      const allBikes = [...this.bikeCards] as HTMLDivElement[];

      for (const element of this.bikeCards) {
        element.remove();
      }

      switch (sortOptions.selectedOptions[0]) {
        case sortOptions.options[0]:
          allBikes.sort((a, b) => ((a.dataset.bikeName?.toLowerCase() as string) < (b.dataset.bikeName?.toLowerCase() as string) ? -1 : 1));
          break;
        case sortOptions.options[1]:
          allBikes.sort((a, b) => ((a.dataset.bikeName?.toLowerCase() as string) > (b.dataset.bikeName?.toLowerCase() as string) ? -1 : 1));
          break;
        case sortOptions.options[2]:
          allBikes.sort((a, b) => {
            const yearA = +(a.getElementsByClassName('card-year')[0].textContent?.split(': ')[1] as string);
            const yearB = +(b.getElementsByClassName('card-year')[0].textContent?.split(': ')[1] as string);
            return (yearA < yearB) ? -1 : 1;
          });
          break;
        case sortOptions.options[3]:
          allBikes.sort((a, b) => {
            const yearA = +(a.getElementsByClassName('card-year')[0].textContent?.split(': ')[1] as string);
            const yearB = +(b.getElementsByClassName('card-year')[0].textContent?.split(': ')[1] as string);
            return (yearA > yearB) ? -1 : 1;
          });
          break;
        default:
          break;
      }

      document.getElementsByClassName('cards')[0].append(...allBikes);
    }

    sortOptions.addEventListener('change', sortBy);
  }
}

export default Sorting;