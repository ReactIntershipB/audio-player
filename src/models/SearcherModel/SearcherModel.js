import { Model } from './../Model';
import { observable, action } from 'mobx';

export class SearcherModel extends Model {
    @observable term = '';
    @observable filterName = 'artist';

    @action
    find(term, filterName) {
      this.getData(term, filterName);
    }
}
