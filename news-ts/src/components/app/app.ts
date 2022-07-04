import AppController from '../controller/controller';
import AppView from '../view/appView';
import { Data } from '../types/types';

interface App {
    controller: AppController;
    view: AppView;
    start(): void;
}

class App implements App {
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start() {
        document
            .querySelector('.sources')
            ?.addEventListener('click', (e: Event) =>
                this.controller.getNews(e, (data) => this.view.drawNews(data as Data))
            );
        this.controller.getSources((data) => this.view.drawSources(data as Data));
    }
}

export default App;
