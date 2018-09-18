import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Alert } from 'antd';

import './AlbumPlaylist.css';
import Spinner from './../common/Spinner';
import ListComponent from '../common/List';
import { MessageBox } from '../common/MessageBox';
import { ResultsMessage } from '../common/ResultsMessage';

@inject('albumModel')
@observer
export default class AlbumPlaylist extends Component {
  componentDidMount() {
    this.props.albumModel.find(this.props.match.params.id);
  }

  get playlist() {
    const { data, loading } = this.props.albumModel;

    return (loading || data.error || !data.tracks ? this.resultsMessage : <ListComponent heading={data.title} data={data.tracks.data} avatar={data.cover_small} />);
  }

  get spinner() {
    const { loading } = this.props.albumModel;
    return loading ? <Spinner /> : null;
  }

  get resultsMessage() {
    return this.props.albumModel.loading ? null : <ResultsMessage />;
  }

  get errorMessage() {
    return this.props.albumModel.isError
    ? <MessageBox>
      <Alert message="Something went wrong with download data. Please try refresh the page." type="warning" showIcon />
    </MessageBox>
    : null;
  }

  render() {
    return (
      <div>
        {this.spinner}
        {this.playlist}
        {this.errorMessage}
      </div>
    );
  }
}

AlbumPlaylist.propTypes = {
  mediator: PropTypes.object,
  albumModel: PropTypes.object,
  match: PropTypes.any
};
