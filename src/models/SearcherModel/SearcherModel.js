import { Model } from './../Model';
import { observable, action } from 'mobx';

export class SearcherModel extends Model {
    constructor() {
        super();

        this.model = new Model();
    }

    @observable term = '';
    @observable filterName = 'artist';

    @action
    findSongs(term, filterName) {
        this.model.getSongsFromAPI(term, filterName)
            .then(songsRes => console.log(songsRes))
            .catch(err => console.log(err));
    }

    fetchData = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(this.value);
                this.data = data;
                resolve(true);
            }, 2000);
        });
    };
}

const data = [
    {
        id: 0,
        title: 'Song',
        author: 'Author1',
        album: 'Chocolate cake dessert sweet roll jujubes',
        time: '03:14'
    },
    {
        id: 1,
        title: 'Banana Song',
        author: 'Author2',
        album: 'Lollipop chupa chups tart bonbon',
        time: '02:30'
    },
    {
        id: 2,
        title: 'Song title',
        author: 'Author3',
        album: 'Gummi bears wafer pastry macaroon icing biscuit',
        time: '04:02'
    },
    {
        id: 3,
        title: 'Despacito',
        author: 'Author4',
        album: 'Jujubes caramels jelly carrot cake',
        time: '03:18'
    }
];
