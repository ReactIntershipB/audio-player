import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import { observer, inject } from 'mobx-react';

import './AlbumPlaylist.css';
import Spinner from './../common/Spinner';
import ListComponent from '../common/List';

@inject('albumModel')
@observer
export default class Playlist extends Component {
  componentDidMount() {
    this.props.albumModel.find(this.props.match.params.id);
  }

  get playlist() {
    const { data, loading } = this.props.albumModel;
    return (loading || data.error || !data.tracks ? null : <ListComponent heading={'tak'} data={data.tracks.data} avatar={data.cover_small}/>);
  }

  get spinner() {
    const { loading } = this.props.albumModel;
    return loading ? <Spinner /> : null;
  }

  get errorMessage() {
    const { error } = this.props.albumModel.data;
    return error ? <Alert message="Album does not exist" type="info" showIcon /> : null;
  }

  render() {
    return (
      <div className='playlist-container'>
        {this.spinner}
        {this.errorMessage}
        {this.playlist}
      </div>
    );
  }
}

Playlist.propTypes = {
  mediator: PropTypes.object,
  albumModel: PropTypes.object,
  match: PropTypes.any
};
