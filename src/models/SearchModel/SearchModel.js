import { Model } from '../Model';
import { observable, action } from 'mobx';

export class SearchModel extends Model {
    @observable term = '';
    @observable filterName = 'artist';

    get albumData() {
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
}

export const searchModel = new SearchModel();
