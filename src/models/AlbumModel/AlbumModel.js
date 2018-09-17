import { Model } from '../Model';
import { observable, action } from 'mobx';

export class AlbumModel extends Model {
  @observable loading = true;

  @action
  find = (albumId) => {
    this.loading = true;
    this.getData(`album/${albumId}`)
      .then(() => {
          this.loading = false;
      });
  }

  getDuration = (duration) => {
    const durationMin = Math.floor(duration / 60);
    const durationSec = duration % 60;
    const formattedDurationSec = this.formatNumber(durationSec);

    return `${durationMin}:${formattedDurationSec}`;
  }

  formatNumber = (num) => {
    if (num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
}

export const albumModel = new AlbumModel();
