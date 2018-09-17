import React, { Component } from 'react';
import { Avatar } from 'antd';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

// import { PlaylistModel } from '../../models/PlaylistModel/PlaylistModel';
import List from '../common/List';
import './Playlist.css';

@observer
export default class Playlist extends Component {
  constructor() {
    super();
    this.ui = new PlaylistUI();
  }

  setSongByPosition(position) {
      const alignedPosition = this.alignePosition(position);
      const song = this.model.playlist[alignedPosition];
      this.changeSong(song, alignedPosition);
  }

  alignePosition(position) {
    if (position < 0) return this.model.playlist.length - 1;
    if (position > this.model.playlist.length - 1) return 0;
    return position;
  }

  changeSong(song) {
    this.ui.updateCurrentSong(song.id);
  }

  getSongPosition(song) {
    return this.model.playlist.indexOf(song);
  }

    iconChange = (id) => {
      return this.ui.currentlyPlaying === id ? 'pause' : 'caret-right';
    }

    render () {
        return (
            <div className='playlist-container'>
                <div className='avatar'>
                    <Avatar shape='square' size={64} icon='fire' />
                    <h2>Top Hits</h2>
                </div>
                <div>
                    <List buttonType={this.iconChange} onClick={this.setSongByPosition} data={this.model.playlist} getDescription={this.ui.getDescription}/>
                </div>
                </div>
              );
    }
}

class PlaylistUI {
    @observable
    currentlyPlaying;

    currentSongPosition;

    @observable
    isPaused = false;

    @action
    updateCurrentSong = (id) => {
      this.currentlyPlaying = id;
    }

    getDescription(author, album) {
        return `${author}, ${album}`;
    }
}
