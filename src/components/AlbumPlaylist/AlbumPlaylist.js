import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import { observer, inject } from 'mobx-react';

import Spinner from './../common/Spinner';
import ListColumn from '../common/ListColumn';

@inject('albumModel')
@observer
export default class Playlist extends Component {
  componentDidMount() {
    this.props.albumModel.find(this.props.match.params.id);
  }

  get playlist() {
    const { data, loading } = this.props.albumModel;
    return (loading || data.error || !data.tracks ? null : <ListColumn heading={'tak'} data={data.tracks.data} avatar={data.cover_small}/>);
  }

  get spinner() {
    const { loading } = this.props.albumModel;
    return loading ? <Spinner /> : null;
  }

  get errorMessage() {
    const { error } = this.props.albumModel.data;
    return !error ? <Alert message="Album does not exist" type="info" showIcon /> : null;
  }

  render() {
    return (
      <div>
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
