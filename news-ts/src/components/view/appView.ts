import News from './news/news';
import Sources from './sources/sources';

interface AppView {
    news: News;
    sources: Sources;
    drawNews(data: Data): void;
    drawSources(data: Data): void;
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

class AppView {
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
