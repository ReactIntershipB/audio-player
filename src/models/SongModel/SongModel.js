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

    @computed get songAuthor() {
      if (this.data.artist) {
        return this.data.artist.name;
      }
    }

    @computed get songTitle () {
      return this.data.title;
    }

    @computed get songLength () {
      // return this.data.duration;
      return 30;
    }

    @computed get songDurationString() {
      return `0 : ${30 % 60}`;
    }

    @computed get songLoaded () {
      return !!this.data.preview;
    }

    @action setCurrentSongId (id) {
      this.currentSongId = id;
    }
}

export const songModel = new SongModel();
