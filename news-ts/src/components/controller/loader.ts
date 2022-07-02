interface Loader {
    baseLink: string;
    options: object;
    getResp(options: Resp, callback: Callback): void;
    errorHandler(res: Response): Response;
    makeUrl(options: object, endpoint: string): string;
}

type Resp = {
    endpoint: string;
    options: object;
};

type Callback = (data?: string) => void;

type URLOptions = {
    [key: string]: string;
};

class Loader implements Loader {
    constructor(baseLink: string, options: object) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }: Resp,
        callback: Callback = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    public errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    public makeUrl(options: object, endpoint: string) {
        const urlOptions: URLOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: string, endpoint: string, callback: Callback, options: object = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: string) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
