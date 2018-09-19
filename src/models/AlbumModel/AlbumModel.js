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
}

export const albumModel = new AlbumModel();
