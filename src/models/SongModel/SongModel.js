import { Model } from '../Model';
import { observable, computed, action } from 'mobx';

export class SongModel extends Model {
    @observable currentSongId = 0;

    find () {
      this.getData(`/track/${this.currentSongId}`);
    }

    @computed get songLink () {
      return this.data.preview;
    }

    @computed get songTitle () {
      return this.data.title;
    }

    @computed get songLength () {
      // return this.data.duration;
      return 220;
    }

    @computed get songDurationString() {
      return `0 : ${30 % 60}`;
    }

    @computed get songLoaded () {
      return !!this.data.preview;
    }

    @action setCurrentSongId(id) {
      this.currentSongId = id;
    }
}

export const songModel = new SongModel();
