import React from 'react';
import PropTypes from 'prop-types';
import { Button, Slider } from 'antd';
import { observer, inject } from 'mobx-react';

import { PlayIcon } from './../common/PlayIcon/PlayIcon';
import { reaction, when } from 'mobx';
import { PlayerUI } from './PlayerUI';

import './Player.css';

@inject('appUI', 'songModel', 'albumModel')
@observer
class Player extends React.Component {
  constructor(props) {
    super(props);
    this.playerUI = new PlayerUI();

    when(
      () => this.playerUI.getNextSong,
      () => {
        this.changeSong('next');
      }
    );

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

  handleRepeatClick = () => {
    this.playerUI.toggleRepeatOption();
  }

  handleRandomizeClick = () => {
    this.playerUI.toggleRandomizeOption();
  }

  stopSong () {
    this.playerUI.reset();
    this.audioRef.pause();
    this.audioRef.currentTime = 0;
  }

  changeSong (direction) {
    this.stopSong();
    if (this.playerUI.repeat) {
      this.changeSongByRepeat();
    } else if (this.playerUI.randomize) {
      this.props.songModel.setCurrentSongId(
        this.props.albumModel.changeSongRandomly()
      );
    } else {
      this.props.songModel.setCurrentSongId(
        this.props.albumModel.changeSongByDirection(direction, this.props.songModel.currentSongId)
      );
    }
  }

  changeSongByRepeat () {
    this.playerUI.setTimer(this.props.songModel.songLength);
    this.playerUI.playSong();
    this.audioRef.play();
  }

  sliderChange = (value) => {
    this.audioRef.currentTime = value;
    this.playerUI.updateTimer(value);
  }

  get currentSongTime () {
    return this.playerUI.timer;
  }

  get songTimeStatus () {
    return `${parseInt(this.currentSongTime)} : ${this.props.songModel.songLength}`;
  }

  get randomButtonStyle() {
    return this.playerUI.randomize ? { color: 'orange' } : { color: 'grey' };
  }

  get repeatButtonStyle() {
    return this.playerUI.repeat ? { color: 'orange' } : { color: 'grey' };
  }

  onAudioRef = (audio) => {
    this.audioRef = audio;
  }

  get backgroundSrc() {
     if (this.props.songModel.data.album) {
         return this.props.songModel.data.album.cover_xl;
     } else if (this.props.albumModel.data) {
        return this.props.albumModel.data.cover_xl;
     }
     return null;
  }

  render() {
    const { songLink, songAuthor, songTitle, songLength, songDurationString, currentSongId } = this.props.songModel;

    return (
      <div className={this.backgroundSrc ? 'player background-image' : 'player'} style={{ backgroundImage: `url(${this.backgroundSrc})` }}>
        <audio id='audioPlayer' autoPlay ref={this.onAudioRef} src={songLink}></audio>
        <h4 className="player-general player-author">{songAuthor || (this.backgroundSrc ? '' : 'Deezer Player')}</h4>
        <p className="player-general player-title">{songTitle || ''}</p>
        <div className="slider-container">
          <Slider min={0} max={songLength} value={this.currentSongTime} disabled={false} onChange={this.sliderChange} />
          <div className="slider-duration-container">
             <p>{currentSongId ? this.songTimeStatus : ' '}</p>
             <p>{currentSongId ? songDurationString : ' '}</p>
          </div>
        </div>
        <div className="buttons-container">
          <Button onClick={this.handleRandomizeClick}>
              <i className="fas fa-random" style={this.randomButtonStyle}></i>
          </Button>
          <Button shape='circle' size={'large'} icon='backward' onClick={this.handlePreviousSongClick} />
          <PlayIcon disabled={!songLink} songId={currentSongId}/>
          <Button shape='circle' size={'large'} icon='forward' onClick={this.handleNextSongClick} />
          <Button onClick={this.handleRepeatClick}>
              <i className="fas fa-redo-alt" style={this.repeatButtonStyle}></i>
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
