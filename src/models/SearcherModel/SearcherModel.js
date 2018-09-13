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
