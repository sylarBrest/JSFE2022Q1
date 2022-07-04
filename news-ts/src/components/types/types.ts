type NewsDataArray = readonly [data: NewsData];

type NewsData = {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: {
        id: string;
        name: string;
    };
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

type HTMLEl = HTMLElement | null;

type Resp = {
    endpoint: string;
    options?: URLOptions;
};

type Callback = (data?: Data | string) => void;

type URLOptions = {
    [key: string]: string;
};

export { HTMLEl, Data, NewsData, NewsDataArray, SourceDataArray, Resp, Callback, URLOptions };
