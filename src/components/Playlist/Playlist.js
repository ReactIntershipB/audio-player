import React, { Component } from 'react';
import { List, Button, Avatar } from 'antd';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

import { PlaylistModel } from '../../models/PlaylistModel/PlaylistModel';
import './Playlist.css';

@observer
export default class Playlist extends Component {
  constructor() {
    super();
    this.ui = new PlaylistUI();
    this.model = new PlaylistModel();
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

  changeSong(song, position) {
    this.ui.updateCurrentSong(song.id);
  }

  getSongPosition(song) {
    return this.model.playlist.indexOf(song);
  }

    iconChange = (id) => {
      return this.ui.currentlyPlaying === id ? 'pause' : 'caret-right';
    }

    getplayButton = (item) => {
      return (
        <Button
          type='primary'
          shape='circle'
          icon={this.iconChange(item.id)}
          size='large'
          onClick={() => this.changeSong(item, this.getSongPosition(item))}
        />
      );
    }

    render() {
      return (
        <div className='playlist-container'>
          <div className='avatar'>
            <Avatar shape='square' size={64} icon='fire' />
            <h2>Top Hits</h2>
          </div>
          <div>
            {this.model.playlist.map(item => {
              return (
                <div key={item.id}>
                  <List.Item>
                    <List.Item.Meta
                      avatar={this.getplayButton(item)}
                      title={item.title}
                      description={`${item.artist.name}, ${item.album.title}`}
                    />
                    <div>{item.time}</div>
                  </List.Item>
                  <hr />
                </div>
              );
            })}
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
}
