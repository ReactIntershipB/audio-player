import { Model } from '../Model';
import { action } from 'mobx';

export class AlbumModel extends Model {
  @action
  find = (albumId) => {
    this.getData(`album/${albumId}`);
  }
}

export const albumModel = new AlbumModel();
