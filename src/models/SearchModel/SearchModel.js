import { Model } from '../Model';
import { observable, action } from 'mobx';

export class SearchModel extends Model {
    @observable term = '';
    @observable termText = '';
    @observable filterName = 'artist';
    staticQueryURL = 'search?q=';

    get dataWithoutDuplicates() {
        if (this.data.data) {
            const albumIds = [];
            return this.data.data.filter(item => {
                if (albumIds.indexOf(item.album.id) < 0) {
                    albumIds.push(item.album.id);
                    return item;
                }
            });
        }
        return [];
    }

    @action
    find(term, filterName) {
      this.getData(`${this.staticQueryURL}${filterName}:"${term}"`);
    }

    @action
    inputChange = (term) => {
      this.term = term;
    }

    @action
    filterChange = (filter) => {
       this.filterName = filter;
    }

    @action
    setTermText = (text) => {
        this.termText = text;
    }
}

export const searchModel = new SearchModel();
