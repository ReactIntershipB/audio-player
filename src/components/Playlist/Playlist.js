<<<<<<< e776ab64b48c96f6d7933e088b2e1595006f93b2
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Button, Avatar } from 'antd';
import { observer } from 'mobx-react';
import { observable, action, reaction } from 'mobx';

import { PlaylistModel } from '../../models/PlaylistModel/PlaylistModel';
import './Playlist.css';

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

export default Playlist;
=======
import React, { Component } from 'react'
import { List, Button, Avatar } from 'antd'
import './Playlist.css'

const data = [
    {
        title: "Tytuł1",
        author: "Author1",
        album: "Chocolate cake dessert sweet roll jujubes",
        time: "03:14"
    },
    {
        title: "Tytuł2",
        author: "Author2",
        album: "Lollipop chupa chups tart bonbon",
        time: "02:30"
    },
    {
        title: "Tytuł3",
        author: "Author3",
        album: "Gummi bears wafer pastry macaroon icing biscuit",
        time: "04:02"
    },
    {
        title: "Tytuł4",
        author: "Author4",
        album: "Jujubes caramels jelly carrot cake",
        time: "03:18"
    }
]

class Playlist extends Component {

    render() {
        return (
            <div className="playlist-container">
                <div className="avatar">
                    <Avatar shape="square" size={64} icon="fire" />
                    <h2>Top Hits</h2>
                </div>
                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Button type="primary" shape="circle" icon="caret-right" size="large" />}
                                    title={item.title}
                                    description={`${item.author}, ${item.album}`}
                                />
                                <div>{item.time}</div>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        )
    }
}

export default Playlist;
>>>>>>> Add Playlist component
