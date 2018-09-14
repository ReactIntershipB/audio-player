import { Model } from '../Model';
import { observable, action } from 'mobx';

export class SearchModel extends Model {
    @observable term = '';
    @observable filterName = 'artist';

    @action
    find(term, filterName) {
      this.getData(term, filterName);
    }
}

export const searchModel = new SearchModel();
