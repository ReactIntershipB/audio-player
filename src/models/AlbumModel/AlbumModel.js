import { Model } from '../Model';
import { observable, action } from 'mobx';
import { CORS_ALLOW_URL } from '../../config/api_config';

import axios from 'axios';

export class AlbumModel extends Model {
  // setSongByPosition(position) {
  //   const alignedPosition = this.alignPosition(position);
  //   const song = this.data[alignedPosition];
  //   this.changeSong(song, alignedPosition);
  // }

  // alignPosition(position) {
  //   if (position < 0) return this.data.length - 1;
  //   if (position > this.data.length - 1) return 0;
  //   return position;
  // }

  // changeSong(song, position) {
  //   this.ui.updateCurrentSong(song.id);
  //   this.props.mediator.setCurrentSong(song.id);
  //   this.props.mediator.setCurrentSongPostion(position);
  // }

  // getSongPosition(song) {
  //   return this.model.data.indexOf(song);
  // }

  @observable album = {};

  albumApiUrl = `${CORS_ALLOW_URL}https://api.deezer.com/album/`;

  @action
  getData = (albumId) => {
    return axios.get(`${this.albumApiUrl}${albumId}`)
      .then(res => {
        this.album = res.data;
      })
      .catch(err => console.log(err));
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
