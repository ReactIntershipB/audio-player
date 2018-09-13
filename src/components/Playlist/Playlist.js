import React, { Component } from 'react';
import { List, Button, Avatar } from 'antd';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import './Playlist.css';

const data = [
    {
        id: 0,
        title: 'Tytuł1',
        author: 'Author1',
        album: 'Chocolate cake dessert sweet roll jujubes',
        time: '03:14'
    },
    {
        id: 1,
        title: 'Tytuł2',
        author: 'Author2',
        album: 'Lollipop chupa chups tart bonbon',
        time: '02:30'
    },
    {
        id: 2,
        title: 'Tytuł3',
        author: 'Author3',
        album: 'Gummi bears wafer pastry macaroon icing biscuit',
        time: '04:02'
    },
    {
        id: 3,
        title: 'Tytuł4',
        author: 'Author4',
        album: 'Jujubes caramels jelly carrot cake',
        time: '03:18'
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
                                        avatar={<Button type='primary' shape='circle' icon={this.iconChange(item.id)} size='large' onClick={() => this.ui.onSongClick(item.id)}/>}
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

class PlaylistUI {
    @observable
    currentlyPlaying = null;
    @observable
    isPaused = false;

    @action
    onSongClick = (id) => {
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
