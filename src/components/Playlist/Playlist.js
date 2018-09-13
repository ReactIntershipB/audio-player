import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

import { PlaylistModel } from '../../models/PlaylistModel/PlaylistModel';
import { PlaylistPlayButton } from './PlaylistPlayButton/PlaylistPlayButton';

import './Playlist.css';

@observer
export default class Playlist extends Component {
  constructor() {
    super();
    this.ui = new PlaylistUI();
    this.model = new PlaylistModel();
  }

  changeSong(song, position) {
    this.ui.updateCurrentSong(song.id);
  }

  getSongPosition(song) {
    return this.model.data.indexOf(song);
  }

  iconChange = (id) => {
    return this.ui.currentlyPlaying === id ? 'pause' : 'caret-right';
  }

  onClickHandler = (item) => {
    this.changeSong(item, this.getSongPosition(item));
  }

  render() {
    return (
      <div className='playlist-container'>
        <div className='avatar'>
          <Avatar shape='square' size={64} icon='fire' />
          <h2>Top Hits</h2>
        </div>
        <div>
          {this.model.data.map(item => {
            return (
              <div key={item.id}>
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <PlaylistPlayButton
                        item={item}
                        icon={this.iconChange(item.id)}
                        onClick={this.onClickHandler(item)}
                      />
                    }
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
  currentlyPlaying = '';

  @observable
  isPaused = false;

  @action
  updateCurrentSong = (id) => {
    this.currentlyPlaying = id;
  }
}
