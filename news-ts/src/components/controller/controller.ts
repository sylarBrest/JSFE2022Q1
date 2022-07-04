import AppLoader from './appLoader';
import { Callback } from '../types/types';

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
