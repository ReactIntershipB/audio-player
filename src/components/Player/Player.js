import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Col, Row, Slider } from 'antd';
import { observer, inject } from 'mobx-react';
import { PlayIcon } from './../common/PlayIcon';
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
        this.changeSongByDirection('next');
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
      this.props.songModel.changeSongRandomly(this.props.albumModel.songsIdList);
    } else {
      this.props.songModel.changeSongByDirection(this.props.albumModel.songsIdList, direction);
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
    return `${parseInt(this.currentSongTime)}/${this.props.songModel.songLength}`;
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

  render() {
    return (
      <div className='player'>

        <audio id='audioPlayer'
          autoPlay
          ref={this.onAudioRef}
          src={this.props.songModel.songLink}
        ></audio>

        <Row type='flex'
          justify='center'
          align='middle'
        >

          <Col span={2}>

            <Avatar shape='square'
              size={80}
              icon='star'
            />

            <br />

            <span>Title</span>

          </Col>

          <Col span={20}>

            <Row
              type='flex'
              justify='center'
              align='middle'
            >

              <span className='title'>{this.props.songModel.songTitle}</span>

            </Row>

            <Row
              type='flex'
              justify='center'
              align='middle'
            >

              <Col
                span={2}
                className='btns'
              >

                <Button onClick={this.handleRandomizeClick}>
                  <i
                    className="fas fa-random"
                    style={this.randomButtonStyle}
                  ></i>
                </Button>

              </Col>

              <Col
                span={2}
                className='btns'
              >

                <Button shape='circle'
                  size={'large'}
                  icon='backward'
                  onClick={this.handlePreviousSongClick}
                />

              </Col>

              <Col
                span={2}
                className='btns'
              >

                <PlayIcon
                  disabled={!this.props.songModel.songLink}
                  songId={this.props.songModel.currentSongId}
                />

              </Col>

              <Col
                span={2}
                className='btns'
              >

                <Button shape='circle'
                  size={'large'}
                  icon='forward'
                  onClick={this.handleNextSongClick}
                />

              </Col>

              <Col span={2} className='btns'>

                <Button onClick={this.handleRepeatClick}>
                  <i
                    className="fas fa-redo-alt"
                    style={this.repeatButtonStyle}
                  ></i>
                </Button>

              </Col>

            </Row>

            <Row
              type='flex'
              justify='center'
              align='middle'
            >

              <Col span={22}>

                <Slider min={0}
                  max={this.props.songModel.songLength}
                  value={this.currentSongTime}
                  disabled={false}
                  onChange={this.sliderChange}
                />

              </Col>

              <Col span={2}>
                <span>{this.songTimeStatus}</span>
              </Col>

            </Row>

          </Col>

        </Row>

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
