import { Model } from '../Model';
import { observable, action } from 'mobx';

export class SearchModel extends Model {
    @observable term = '';
    @observable termText = '';
    @observable filterName = 'artist';

    get dataWithoutDuplicates() {
        const albumIds = [];
        return this.data.filter(item => {
            if (albumIds.indexOf(item.album.id) < 0) {
                albumIds.push(item.album.id);
                return item;
            }
        });
    }

    @action
    find(term, filterName) {
        this.getData(term, filterName);
    }

    @action
    setTermText = (text) => {
        this.termText = text;
    }
}

export const searchModel = new SearchModel();
