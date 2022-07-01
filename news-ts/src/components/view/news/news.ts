import './news.css';

interface News {
    draw(data: DataArray): void;
}

type DataArray = readonly [data: Data];

type Source = {
    id: string;
    name: string;
};

type Data = {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: Source;
    title: string;
    url: string;
    urlToImage: string;
};

type HTMLEl = HTMLElement | null;

class News implements News {
    public draw(data: DataArray) {
        const news = data.length >= 10 ? data.filter((_item: Data, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLEl = document.querySelector('#newsItemTemp');
        if (newsItemTemp) {
            const newsItem: HTMLTemplateElement = newsItemTemp as HTMLTemplateElement;
            news.forEach((item: Data, idx: number) => {
                const newsCloneTemp: HTMLTemplateElement = newsItem.content.cloneNode(true) as HTMLTemplateElement;
                const newsClone: HTMLEl = newsCloneTemp;

                if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

                const metaPhoto: HTMLEl = newsClone.querySelector<HTMLElement>('.news__meta-photo');
                if (metaPhoto) {
                    metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                }

                const metaAuthor: HTMLEl = newsClone.querySelector('.news__meta-author');
                if (metaAuthor) {
                    metaAuthor.textContent = item.author || item.source.name;
                }

                const metaDate: HTMLEl = newsClone.querySelector('.news__meta-date');
                if (metaDate) {
                    metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                }

                const descriptionTitle: HTMLEl = newsClone.querySelector('.news__description-title');
                if (descriptionTitle) descriptionTitle.textContent = item.title;

                const descriptionSource: HTMLEl = newsClone.querySelector('.news__description-source');
                if (descriptionSource) descriptionSource.textContent = item.source.name;

                const descriptionContent: HTMLEl = newsClone.querySelector('.news__description-content');
                if (descriptionContent) descriptionContent.textContent = item.description;

                newsClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);

                fragment.append(newsClone);
            });
        }

        const newsElement: HTMLEl = document.querySelector('.news');
        if (newsElement) newsElement.innerHTML = '';
        newsElement?.appendChild(fragment);
    }
}

export default News;
