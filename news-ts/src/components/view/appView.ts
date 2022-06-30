import News from './news/news';
import Sources from './sources/sources';

interface AppView {
    drawNews(data: object): void;
    drawSources(data: object): void;
}

class AppView {
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
