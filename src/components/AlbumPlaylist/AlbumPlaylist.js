import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Avatar, Alert } from 'antd';
import { observer, inject } from 'mobx-react';

import { PlaylistPlayButton } from './PlaylistPlayButton/PlaylistPlayButton';

import './AlbumPlaylist.css';

@inject('albumModel')
@observer
export default class Playlist extends Component {
  componentDidMount() {
    this.props.albumModel.getData(this.props.match.params.id);
  }

  get errorMessage() {
    return (
      <div>
        <Alert message="Album does not exist" type="info" showIcon />
      </div>
    );
  }

  get playlist() {
    const { album } = this.props.albumModel;
    const { albumModel } = this.props;

    return (
      <div>
        <div className='avatar'>
          <Avatar shape='square' size={64} src={album.cover_small} />
          <h2>{album.title}</h2>
        </div>
        <div>
          {album.tracks && album.tracks.data.map(item => {
            return (
              <div key={item.id}>
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <PlaylistPlayButton/>
                    }
                    title={item.title}
                    description={item.artist.name}
                  />
                  <div>{albumModel.getDuration(item.duration)}</div>
                </List.Item>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    const { album } = this.props.albumModel;
    console.log('RENDER!!!');

    return (
      <div className='playlist-container'>
        {album.error ? this.errorMessage : this.playlist}
      </div>
    );
  }
}

Playlist.propTypes = {
  mediator: PropTypes.object,
  albumModel: PropTypes.object,
  match: PropTypes.any
};
