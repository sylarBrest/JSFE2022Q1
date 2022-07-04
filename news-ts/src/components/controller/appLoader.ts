import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '9a018f38d1374fa1bf42264d0da880ff', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
