import AppController from '../controller/controller';
import AppView from '../view/appView';

interface App {
    controller: AppController;
    view: AppView;
    start(): void;
}

type NewsDataArray = readonly [data: NewsData];

type Source = {
    id: string;
    name: string;
};

type NewsData = {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: Source;
    title: string;
    url: string;
    urlToImage: string;
};

type SourceDataArray = readonly [data: Pick<SourceData, 'id' | 'name'>];

type SourceData = {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
};

type Data = {
    status: string;
    articles?: NewsDataArray;
    totalResults?: number;
    sources?: SourceDataArray;
};

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
