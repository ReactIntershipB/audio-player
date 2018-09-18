import { Model } from '../Model';
import { observable, computed } from 'mobx';

export class SongModel extends Model {
    @observable song = {};

    init = () => {
      this.getData('/track/3135556');
    }

    @computed get currentSong () {
      return this.data;
    }

    @computed get songLink () {
      return this.data.preview;
    }

    @computed get songTitle () {
      return this.data.title;
    }

    @computed get songLength () {
      // return this.data.duration;
      return 30;
    }
}

export const songModel = new SongModel();
