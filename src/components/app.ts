import AppView from "./view/appView";
import MakeSearch from "./controller/makeSearch";

interface App {
  start(): void;
}

class App implements App{
  private search: MakeSearch;
  private appView: AppView;

  constructor() {
    this.search = new MakeSearch();
    this.appView = new AppView();
  }

  public start(): void {
    this.appView.drawComponents();
    this.search.searchOnPage();
  }
}

export default App;