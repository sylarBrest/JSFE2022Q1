import Page from './view/page';

interface App {
  start(): void;
}

class App implements App {
  private page: Page;

  constructor() {
    this.page = new Page();
  }

  start(): void {
    this.page.getView();
  }
}

export default App;
