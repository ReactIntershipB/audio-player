import { Model } from './../Model';
import { observable, action } from 'mobx';

class SongModel extends Model {
    @observable
    currentSongId = 0;

    @action
    setCurrentSongId(id) {
       this.currentSongId = id;
    }
}

export const songModel = new SongModel();
