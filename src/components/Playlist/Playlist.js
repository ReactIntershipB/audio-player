import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Button, Avatar } from 'antd';
import { observer } from 'mobx-react';
import { observable, action, reaction } from 'mobx';

import './Playlist.css';

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

@observer
class Playlist extends Component {
    constructor () {
        super();
        this.ui = new PlaylistUI();
        this.model = new PlaylistModel();
    }

    componentDidMount () {
        this.model.init();
        reaction(() => this.props.mediator.currentSongPosition,
                 (position) => this.setSongByPosition(position));
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
        this.props.mediator.setCurrentSong(song.id);
        this.props.mediator.setCurrentSongPostion(position);
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
                        {this.model.playlist.map(item => {
                         return (
                             <div key={item.id}>
                            <List.Item>
                                    <List.Item.Meta
                                        avatar={<Button type="primary" shape="circle" icon={this.iconChange(item.id)} size="large" onClick={() => this.changeSong(item, this.getSongPosition(item))}/>}
                                        title={item.title}
                                        description={`${item.author}, ${item.album}`}
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

Playlist.propTypes = {
    mediator: PropTypes.object
  };

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

class PlaylistModel {
    @observable
    playlist = [];

    init = () => {
      return this.fetchPlaylist();
    }

    fetchPlaylist = () => {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              this.playlist = data;
              resolve(true);
          }, 2000);
      });
    }
}

export default Playlist;
