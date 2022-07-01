import './sources.css';

interface Sources {
    draw(data: DataArray): void;
}

type DataArray = readonly [data: Pick<Data, 'id' | 'name'>];

type Data = {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
};

type HTMLEl = HTMLElement | null;

class Sources implements Sources {
    public draw(data: DataArray) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLEl = document.getElementById('sourceItemTemp');
        if (sourceItemTemp) {
            const sourceItem: HTMLTemplateElement = sourceItemTemp as HTMLTemplateElement;

            data.forEach((item) => {
                const sourceCloneTemp: HTMLTemplateElement = sourceItem.content.cloneNode(true) as HTMLTemplateElement;
                const sourceClone: HTMLEl = sourceCloneTemp.querySelector('.source__item-name');
                if (sourceClone) sourceClone.textContent = item.name;
                sourceClone?.setAttribute('data-source-id', item.id);
                fragment.append(sourceClone as HTMLElement);
            });
        }
        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
