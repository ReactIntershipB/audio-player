import { Model } from '../Model';
import { action, computed } from 'mobx';

export class AlbumModel extends Model {
  @action
  find = (albumId) => {
    this.getData(`album/${albumId}`);
  }

  @computed
  get songsIdList () {
    return this.data.tracks.data.map(
      (song) => song.id
    );
  }

  changeSongRandomly () {
    const targetSongIndex = Math.floor((Math.random() * this.songsIdList.length) + 1);
    return this.songsIdList[targetSongIndex];
  }

  changeSongByDirection (direction, currentSongId) {
    const currentSongIndex = this.songsIdList.findIndex(
      (songId) => songId === currentSongId
    );

    let targetSongIndex;

    if (direction === 'previous') {
      targetSongIndex = (currentSongIndex - 1) >= 0 ? (currentSongIndex - 1) : (this.songsIdList.length - 1);
    } else if (direction === 'next') {
      targetSongIndex = (currentSongIndex + 1) < this.songsIdList.length ? (currentSongIndex + 1) : 0;
    }

    return this.songsIdList[targetSongIndex];
  }
}

export const albumModel = new AlbumModel();
