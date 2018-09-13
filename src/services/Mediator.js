import { observable, action } from 'mobx';

class Mediator {
   @observable
   currentSongId;

   @observable
   currentSongPosition;

   @observable
   playlist; // []

   @action
   setCurrentSong(songId) {
     this.currentSongId = songId;
   }

   setCurrentSongPostion(position) {
     this.currentSongPosition = position;
   }

   @action
   setPlaylist(playlist) {
     this.playlist = [...playlist];
   }

   @action
   getNextSong() {
     if (this.currentSongPosition === undefined || this.currentSongPosition === null) {
       this.currentSongPosition = 0;
     } else {
       this.currentSongPosition++;
     }
   }

   @action
   getPreviousSong() {
     if (this.currentSongPosition === undefined || this.currentSongPosition === null) {
       this.currentSongPosition = -1;
     } else {
       this.currentSongPosition--;
     }
   }
}

export default new Mediator();
