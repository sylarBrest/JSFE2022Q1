import './sources.css';
import { HTMLEl, SourceDataArray } from '../../types/types';

interface Sources {
    draw(data: SourceDataArray): void;
}

class Sources implements Sources {
    public draw(data: SourceDataArray) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLEl = document.getElementById('sourceItemTemp');
        if (sourceItemTemp) {
            const sourceItem: HTMLTemplateElement = sourceItemTemp as HTMLTemplateElement;

            data.forEach((item) => {
                const sourceCloneTemp: HTMLTemplateElement = sourceItem.content.cloneNode(true) as HTMLTemplateElement;
                const sourceClone: HTMLEl = sourceCloneTemp.querySelector('.source__item-name');
                if (sourceClone) sourceClone.textContent = item.name;
                sourceCloneTemp.querySelector('.source__item')?.setAttribute('data-source-id', item.id);
                fragment.append(sourceCloneTemp);
            });
        }
        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
