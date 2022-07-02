import AppLoader from './appLoader';

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

type Callback = (data?: Data | string) => void;

interface AppController {
    getSources(callback: Callback): void;
    getNews(e: Event, callback: Callback): void;
}

class AppController extends AppLoader implements AppController {
    public getSources(callback: Callback): void {
        super.getResp({ endpoint: 'sources' }, callback);
    }

    public getNews(e: Event, callback: Callback): void {
        let target: HTMLElement = e.target as HTMLElement;
        const newsContainer: HTMLElement = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId !== null)
                    if (newsContainer.getAttribute('data-source') !== sourceId) {
                        newsContainer.setAttribute('data-source', sourceId);
                        super.getResp(
                            {
                                endpoint: 'everything',
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                    }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
