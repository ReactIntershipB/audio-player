import React from 'react';
import PropTypes from 'prop-types';
import { Button, Slider } from 'antd';
import { observer, inject } from 'mobx-react';
import './Player.css';
import { PlayIcon } from './../common/PlayIcon';
import { reaction, action, observable } from 'mobx';

@inject('appUI', 'songModel')
@observer
class Player extends React.Component {
  constructor(props) {
    super(props);
    this.playerUI = new PlayerUI();
    this.props.songModel.init();

    reaction(
      () => this.props.songModel.songLink,
      () => {
          this.props.appUI.togglePlaying();
          this.playerUI.play();
      }
    );

    reaction(
      () => this.props.appUI.isPaused,
      () => {
        this.playerUI.toggleSong();
      }
    );
  }

  handleNextSongClick = () => {
    ;
  }

  handlePreviousSongClick = () => {
    ;
  }

  sliderChange = (value) => {
    // TO DO
  }

  get currentSongTime () {
    return this.playerUI.timer;
  }

  render() {
    const { songLink, songTitle, songLength } = this.props.songModel;
    return (
      <div className='player'>
        <audio id='audioPlayer' autoPlay src={songLink}></audio>
        <p className="player-title">{songTitle || 'TITLE'}</p>
        <div className="slider-container">
          <Slider min={0} max={songLength} value={this.currentSongTime} disabled={false} onChange={this.sliderChange} />
          <p>{songLength}</p>
        </div>
        <div className="buttons-container">
          <Button>
            <i className="fas fa-random"></i>
          </Button>
          <Button shape='circle' size={'large'} icon='backward' onClick={this.handlePreviousSongClick} />
          <PlayIcon disabled={!this.props.songModel.songLink} />
          <Button shape='circle' size={'large'} icon='forward' onClick={this.handleNextSongClick} />
          <Button>
            <i className="fas fa-redo-alt"></i>
          </Button>
        </div>
      </div>
    );
  }
}

class PlayerUI {
  @observable timer = 0;
  @observable songStatus = false;

  @action toggleSong () {
    this.songStatus = !this.songStatus;
  }

  @action
  play() {
    setInterval(() => {
      if (this.songStatus) {
        this.timer++;
      }
    }, 1000);
  }
}

Player.propTypes = {
  songModel: PropTypes.object,
  appUI: PropTypes.object
};

export default Player;
