import { Model } from '../Model';
import { observable, computed } from 'mobx';

export class SongModel extends Model {
    @observable song = {};

    init = () => {
      this.getData('/track/3135556');
    }

    @computed get currentSong () {
      console.debug('currentSong', JSON.stringify(this.data));
      return this.data;
    }
}

export const songModel = new SongModel();
