import { Model } from '../Model';
import { observable, action } from 'mobx';

export class SearchModel extends Model {
    @observable term = '';
    @observable filterName = 'artist';

    apiQuery = 'search?q=';

    @action
    find(term, filterName) {
      this.getData(this.apiQuery, term, filterName);
    }

    @action
    inputChange = (term) => {
      this.term = term;
    }

    @action
    filterChange = (filterName) => {
      this.filterName = filterName;
    }
}

export const searchModel = new SearchModel();
