import { Model } from './../Model';
import { observable, computed } from 'mobx';

export class PlaylistModel extends Model {
    @observable
    data = [];

    init = (term) => {
      return this.find(term);
    }

    find(term) {
      this.getData(term, 'artist')
        .then(res => this.setPlaylist(res.data))
        .catch(err => console.log(err));
    }

    setSongByPosition(position) {
      const alignedPosition = this.alignPosition(position);
      const song = this.data[alignedPosition];
      this.changeSong(song, alignedPosition);
    }

    alignPosition(position) {
      if (position < 0) return this.data.length - 1;
      if (position > this.data.length - 1) return 0;
      return position;
    }

    @computed
    get itemDescription() {
      return this.data.map((item) => this.parseItem(item));
    }

    parseItem = (item) => {
      return `${item.artist.name}, ${item.album.title}`;
    }
}
