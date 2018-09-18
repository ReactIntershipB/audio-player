import { Model } from '../Model';
import { observable, action } from 'mobx';

export class SearchModel extends Model {
    @observable term = '';
    @observable termText = '';
    @observable filterName = 'artist';
    staticQueryURL = 'search?q=';

    get dataList() {
        return this.data.data ? this.data.data : [];
    }

    get dataWithoutDuplicates() {
        const ids = [];
        return this.dataList.reduce((result, nextItem) => {
            if (ids.indexOf(nextItem.album.id) < 0) {
                ids.push(nextItem.album.id);
                return [...result, nextItem];
            }
            return result;
        }, []);
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
