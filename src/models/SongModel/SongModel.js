import { Model } from '../Model';
import { observable, computed, action } from 'mobx';

export class SongModel extends Model {
    @observable song = {};
    @observable currentSongId = 0;

    init = () => {
      console.debug('cuurenid', this.currentSongId);
      this.getData(`/track/3135556`);
    }

    @computed get songLink () {
      return this.data.preview;
    }

    @computed get songTitle () {
      return this.data.title;
    }

    @computed get songLength () {
      // return this.data.duration;
      return 30; // Hardcoded data for demo version of API
    }

    @action setCurrentSongId(id) {
      this.currentSongId = id;
    }
}

export const songModel = new SongModel();
