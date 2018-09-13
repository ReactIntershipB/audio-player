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
        title: 'No trailing space',
        author: 'Linter',
        album: 'Chocolate cake dessert sweet roll jujubes',
        time: 194
    },
    {
        id: 1,
        title: 'I\'m forgotten',
        author: 'Var',
        album: 'Lollipop chupa chups tart bonbon',
        time: 160
    },
    {
        id: 2,
        title: 'I don\'t have this',
        author: 'Arrow function',
        album: 'Gummi bears wafer pastry macaroon icing biscuit',
        time: 242
    },
    {
        id: 3,
        title: 'Deadline is coming',
        author: 'Scrum master',
        album: 'Jujubes caramels jelly carrot cake',
        time: 198
    }
];
