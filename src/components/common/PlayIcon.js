import React from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

@inject('appUI', 'songModel')
@observer
export class PlayIcon extends React.Component {
    get iconType() {
        return this.isCurrentSong && this.props.appUI.isPlaying ? 'pause' : 'caret-right';
    }

    get isCurrentSong() {
        return this.props.songId === this.props.songModel.currentSongId;
    }

    onClickHandler = () => {
        if (this.props.songModel.currentSongId !== this.props.songId) {
            this.props.songModel.setCurrentSongId(this.props.songId);
            this.props.appUI.updatePlayingStatus(true);
        } else {
            this.props.appUI.togglePlaying();
        }
    }

    render() {
        return (
            <Button
                disabled={this.props.disabled}
                shape='circle'
                size={'large'}
                icon={this.iconType}
                onClick={this.onClickHandler}
            />
        );
    }
}

PlayIcon.propTypes = {
    appUI: PropTypes.object,
    disabled: PropTypes.bool
    songModel: PropTypes.object,
    songId: PropTypes.number
};
