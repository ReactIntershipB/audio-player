import { Model } from './../Model';
import { observable, action } from 'mobx';

export class PlaylistModel extends Model {
    @observable
    playlist = [];

    init = (term) => {
      return this.find(term);
    }

    find(term) {
        this.getData(term, 'artist')
            .then(res => this.setPlaylist(res.data))
            .catch(err => console.log(err));
    }

    @action
    setPlaylist = (data) => {
      this.playlist = [...data];
    }
}

export const playlistModel = new PlaylistModel();
