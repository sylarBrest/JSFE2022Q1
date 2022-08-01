import './page.scss';

import Garage from './garage';

interface Page {
  getView(): void;
}

class Page implements Page {
  private garage: Garage;

  constructor() {
    this.garage = new Garage();
  }

  private drawPage(view: string): string {
    return view;
  }

  getView(): void {
    document.getElementsByTagName('body')[0].innerHTML = this.drawPage(this.garage.drawCar('#f0b'));
  }
}

export default Page;
