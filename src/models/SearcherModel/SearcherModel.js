import { Model } from './../Model';
import { observable, action } from 'mobx';

export class SearcherModel extends Model {
    constructor() {
        super();

        this.model = new Model();
    }

    @observable term = '';

    @action
    findSongs(term) {
        this.model.getSongsFromAPI(this.model.getAPIBaseURL, term)
            .then(songsRes => console.log(songsRes))
            .catch(err => console.log(err));
    }
}
