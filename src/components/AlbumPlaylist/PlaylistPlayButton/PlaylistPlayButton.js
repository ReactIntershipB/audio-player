import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'antd';
import { inject, observer } from 'mobx-react';

@inject('appUI')
@observer
export class PlaylistPlayButton extends Component {
  render() {
    return (
      <Button
        type='primary'
        shape='circle'
        size='large'
        icon={this.props.appUI.icon}
        onClick={this.props.appUI.togglePause}
      />
    );
  }
};

PlaylistPlayButton.propTypes = {
  item: PropTypes.object,
  appUI: PropTypes.object
};
