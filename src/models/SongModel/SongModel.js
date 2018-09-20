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
      return 30; // Hardcoded data for demo version of API
    }

    @computed get songLoaded () {
      return !!this.data.preview;
    }

    @action setCurrentSongId (id) {
      this.currentSongId = id;
    }

    @action changeSongRandomly (songsIdList) {
      const targetSongIndex = Math.floor((Math.random() * songsIdList.length) + 1);
      this.currentSongId = songsIdList[targetSongIndex];
    }

    @action changeSongByDirection (songsIdList, direction) {
      const currentSongIndex = songsIdList.findIndex(
        (songId) => songId === this.currentSongId
      );

      let targetSongIndex;

      if (direction === 'previous') {
        targetSongIndex = (currentSongIndex - 1) >= 0 ? (currentSongIndex - 1) : (songsIdList.length - 1);
      } else if (direction === 'next') {
        targetSongIndex = (currentSongIndex + 1) < songsIdList.length ? (currentSongIndex + 1) : 0;
      }

      this.currentSongId = songsIdList[targetSongIndex];
    }
}

export const songModel = new SongModel();
