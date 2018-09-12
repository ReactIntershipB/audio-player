import { Model } from './../Model';
import { observable, computed, autorun } from 'mobx';

export class SearcherModel extends Model {
    constructor() {
        super();

        autorun(this.fetchData);
    }

    @observable
    data = [];

    @observable
    value = '';

    find = (value) => {
        console.log('Value in model: ' + value);
        this.value = value;
    }

    @computed
    get filteredData() {
        return this.data.filter((item) => (
            item.title.toLowerCase().includes(this.value.toLowerCase())
        ));
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

// this.model = new Model();
// @observable term = '';

// @action
// findSongs(term) {
//     this.model.getSongsFromAPI(this.model.getAPIBaseURL, term)
//         .then(songsRes => console.log(songsRes))
//         .catch(err => console.log(err));
// }
