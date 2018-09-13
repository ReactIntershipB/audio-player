import { Model } from './../Model';
import { observable } from 'mobx';

const data = [
    {
        id: 0,
        title: 'No trailing space',
        author: 'Linter',
        album: 'Chocolate cake dessert sweet roll jujubes',
        time: 194
    },
    {
        id: 1,
        title: 'I\'m forgotten',
        author: 'Var',
        album: 'Lollipop chupa chups tart bonbon',
        time: 160
    },
    {
        id: 2,
        title: 'I don\'t have this',
        author: 'Arrow function',
        album: 'Gummi bears wafer pastry macaroon icing biscuit',
        time: 242
    },
    {
        id: 3,
        title: 'Deadline is coming',
        author: 'Scrum master',
        album: 'Jujubes caramels jelly carrot cake',
        time: 198
    }
  ];

export class PlayerModel extends Model {
    @observable
    track;

    init = (songId) => {
      return this.find(songId);
    }

    find = (songId) => {
      return this.fetch(songId).then(song => {
        this.track = song;
      });
    }

    fetch = (songId) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const matchedSong = data.filter(song => song.id === songId);
          if (matchedSong.length) resolve(matchedSong[0]);
        }, 500);
      });
    }
}
