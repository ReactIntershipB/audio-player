import React from 'react';
import PropTypes from 'prop-types';
import { Button, Slider } from 'antd';
import { observer, inject } from 'mobx-react';

import { PlayIcon } from './../common/PlayIcon';
import { reaction } from 'mobx';
import { PlayerUI } from './PlayerUI';

import './Player.css';

@inject('appUI', 'songModel', 'albumModel')
@observer
class Player extends React.Component {
  constructor(props) {
    super(props);
    this.playerUI = new PlayerUI();

    reaction(
      () => this.props.songModel.currentSongId,
      () => this.props.songModel.find()
    );

    reaction(
      () => this.props.songModel.data,
      () => {
        this.playerUI.reset();
        this.playerUI.setTimer(this.props.songModel.songLength);
        this.playerUI.playSong();
      }
    );

    reaction(
      () => this.props.appUI.isPlaying,
      () => {
        if (this.props.songModel.songLoaded) {
          if (this.props.appUI.isPlaying) {
            this.playerUI.playSong();
            this.audioRef.play();
          } else {
            this.playerUI.pauseSong();
            this.audioRef.pause();
          }
        }
      }
    );
  }

  handleNextSongClick = () => {
    this.changeSong('next');
  }

  handlePreviousSongClick = () => {
    this.changeSong('previous');
  }

  changeSong (direction) {
    const currentSongId = this.props.songModel.currentSongId;

    this.playerUI.reset();
    this.audioRef.pause();

    this.props.albumModel.songsIdList.map(
      (songId, index) => {
        if (songId === currentSongId) {
          if (direction === 'previous') {
            this.props.songModel.setCurrentSongId(this.props.albumModel.songsIdList[index - 1]);
          } else if (direction === 'next') {
            this.props.songModel.setCurrentSongId(this.props.albumModel.songsIdList[index + 1]);
          }
          return null;
        }
      }
    );
  }

  sliderChange = (value) => {
    this.audioRef.currentTime = value;
    this.playerUI.updateTimer(value);
  }

  get currentSongTime () {
    return this.playerUI.timer;
  }

  get songTimeStatus () {
    return `${parseInt(this.currentSongTime)}/${this.props.songModel.songLength}`;
  }

  onAudioRef = (audio) => {
    this.audioRef = audio;
  }

  render() {
    const { songLink, songTitle, songLength, songDurationString, currentSongId } = this.props.songModel;

    return (
      <div className='player'>
        <audio id='audioPlayer' autoPlay ref={this.onAudioRef} src={songLink}></audio>
        <p className="player-title">{songTitle || ''}</p>
        <div className="slider-container">
          <Slider min={0} max={songLength} value={this.currentSongTime} disabled={false} onChange={this.sliderChange} />
          <div className="slider-duration-container">
             <p>{currentSongId ? this.songTimeStatus : ' '}</p>
             <p>{currentSongId ? songDurationString : ' '}</p>
          </div>
        </div>
        <div className="buttons-container">
          <Button>
            <i className="fas fa-random"></i>
          </Button>
          <Button shape='circle' size={'large'} icon='backward' onClick={this.handlePreviousSongClick} />
          <PlayIcon disabled={!songLink} songId={currentSongId}/>
          <Button shape='circle' size={'large'} icon='forward' onClick={this.handleNextSongClick} />
          <Button>
            <i className="fas fa-redo-alt"></i>
          </Button>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  songModel: PropTypes.object,
  appUI: PropTypes.object,
  albumModel: PropTypes.object
};

export default Player;
