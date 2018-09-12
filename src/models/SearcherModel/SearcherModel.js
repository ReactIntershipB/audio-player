import Model from './../Model';
import { observable, action } from 'mobx';

import { getSongsFromAPI } from '../Model';

export class SearcherModel extends Model {
    @observable term = "";

    @action
    findSongs(term) {
        
        getSongsFromAPI(term)
            .then(songsRes => console.log(songsRes))
            .catch(err => console.log(err));
    }
}
