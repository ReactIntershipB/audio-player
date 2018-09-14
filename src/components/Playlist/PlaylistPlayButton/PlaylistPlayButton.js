import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'antd';

export class PlaylistPlayButton extends Component {
  onClickHandler = (item) => {
    console.log(item);
  }

  render() {
    return (
      <Button
        type='primary'
        shape='circle'
        icon={this.props.icon}
        size='large'
        onClick={() => this.onClickHandler(this.props.item)}
      />
    );
  }
};

PlaylistPlayButton.propTypes = {
  item: PropTypes.object,
  icon: PropTypes.string
};
