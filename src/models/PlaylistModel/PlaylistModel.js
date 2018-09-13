import { Model } from './../Model';
import { observable, action } from 'mobx';

export class PlaylistModel extends Model {
  constructor() {
    super();

    this.model = new Model();
  }

    @observable
    playlist = [];

    init = (term) => {
      return this.findSongs(term);
    }

    findSongs(term) {
      this.model.getSongsFromAPI(term, 'artist')
        .then(res => this.setPlaylist(res.data))
        .catch(err => console.log(err));
    }

    @action
    setPlaylist = (data) => {
      this.playlist = [...data];
    }
}
