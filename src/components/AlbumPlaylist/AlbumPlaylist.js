import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Alert } from 'antd';

import { Spinner } from './../common/Spinner/Spinner';
import { ListComponent } from '../common/ListComponent/ListComponent';
import { MessageBox } from '../common/MessageBox/MessageBox';

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

  get alertMessage() {
    const { data, loading, isError } = this.props.albumModel;
    if ((data.error && !loading) || isError) {
      const msg = isError
        ? 'Something went wrong with download data. Please try to refresh the page.'
        : 'No results';
      const type = isError
        ? 'error'
        : 'warning';

      return (
        <MessageBox>
          <Alert message={msg} type={type} showIcon />
        </MessageBox>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="component-container">
        {this.spinner}
        {this.playlist}
        {this.alertMessage}
      </div>
    );
  }
}

AlbumPlaylist.propTypes = {
  mediator: PropTypes.object,
  albumModel: PropTypes.object,
  match: PropTypes.any
};
