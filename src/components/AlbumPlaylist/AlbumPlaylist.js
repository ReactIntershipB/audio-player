import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Alert } from 'antd';

import Spinner from './../common/Spinner/Spinner';
import { ListComponent } from '../common/ListComponent/ListComponent';
import { MessageBox } from '../common/MessageBox';

@inject('albumModel')
@observer
export default class AlbumPlaylist extends Component {
  componentDidMount() {
    this.props.albumModel.find(this.props.match.params.id);
  }

  get playlist() {
    const { data, loading } = this.props.albumModel;

    return (loading || data.error || !data.tracks ? null : <ListComponent heading={data.title} data={data.tracks.data} type={'track'} albumTitle={data.title} />);
  }

  get spinner() {
    const { loading } = this.props.albumModel;
    return loading ? <Spinner /> : null;
  }

  get errorMessage() {
    return this.props.albumModel.isError
    ? <MessageBox>
      <Alert message="Something went wrong with download data. Please try to refresh the page." type="error" showIcon />
    </MessageBox>
    : null;
  }

  render() {
    return (
      <div className="component-container">
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
