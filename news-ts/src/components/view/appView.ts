import News from './news/news';
import Sources from './sources/sources';
import { Data, NewsDataArray, SourceDataArray } from '../types/types';

interface AppView {
    news: News;
    sources: Sources;
    drawNews(data: Data): void;
    drawSources(data: Data): void;
}

class AppView implements AppView {
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: Data) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values as NewsDataArray);
    }

    public drawSources(data: Data) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values as SourceDataArray);
    }
}

export default AppView;
