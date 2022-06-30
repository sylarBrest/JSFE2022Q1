import './sources.css';

interface Sources {
    draw(data: Data): void;
}

type Data = readonly [data: DataArray];

type DataArray = {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
};

class Sources {
    public draw(data: Data) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLElement | null = document.getElementById('sourceItemTemp');
        if (sourceItemTemp) {
            const sourceItem: HTMLTemplateElement = <HTMLTemplateElement>sourceItemTemp;

            data.forEach((item) => {
                const sourceCloneTemp: HTMLElement | null = <HTMLElement>sourceItem.content.cloneNode(true);
                if (sourceCloneTemp) {
                    const sourceClone: HTMLElement | null = <HTMLElement>(
                        sourceCloneTemp.querySelector('.source__item-name')
                    );
                    sourceClone.textContent = item.name;
                    sourceClone.setAttribute('data-source-id', item.id);
                    fragment.append(sourceClone);
                }
            });
        }
        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;
