import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Col, Row, Slider } from 'antd';
import { observer, inject } from 'mobx-react';
import './Player.css';
import { PlayIcon } from './../common/PlayIcon';
import { reaction, action, observable } from 'mobx';

@inject('appUI', 'songModel')
@observer
class Player extends React.Component {
  constructor(props) {
    super(props);
    this.props.songModel.init();
    this.playerUI = new PlayerUI(this.props.songModel.songLength);

    reaction(
      () => this.props.appUI.isPlaying,
      () => {
        if (this.props.appUI.isPlaying) {
          if (this.props.songModel.songLink.length) {
            this.playerUI.playSong();
            this.audioRef.play();
          }
        } else {
          this.playerUI.pauseSong();
          this.audioRef.pause();
        }
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
    this.audioRef.currentTime = value;
    this.playerUI.updateTimer(value);
  }

  get currentSongTime () {
    return this.playerUI.timer;
  }

  onAudioRef = (audio) => {
    this.audioRef = audio;
  }

  render() {
    return (
      <div className='player'>
        <audio id='audioPlayer'
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
              align='middle'>

              <span className='title'>{this.props.songModel.songTitle}</span>

            </Row>

            <Row
              type='flex'
              justify='center'
              align='middle'>

              <Col
                span={2}
                className='btns'>

                <Button>
                  <i className="fas fa-random"></i>
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

                <Button>
                  <i className="fas fa-redo-alt"></i>
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
                {/* <span>TO DO</span> */}
              </Col>

            </Row>

          </Col>

        </Row>
      </div>

    );
  }
}

class PlayerUI {
  @observable timer = 0;
  @observable songIsPlaying = false;

  constructor (songDuration) {
    this.songDuration = songDuration;
    this.initTimer();
  }

  @action toggleSong () {
    this.songIsPlaying = !this.songIsPlaying;
  }

  @action playSong() {
    this.songIsPlaying = true;
  }

  @action pauseSong() {
    this.songIsPlaying = false;
  }

  @action
  initTimer() {
    setInterval(() => {
      if (this.songIsPlaying && this.timer < this.songDuration) {
        this.timer = this.timer + 0.1;
      } else if (this.songIsPlaying && this.timer >= this.songDuration) {
        this.timer = 0;
        this.songIsPlaying = false;
      }
    }, 100);
  }

  @action
  updateTimer (value) {
    this.timer = value;
  }
}

Player.propTypes = {
  songModel: PropTypes.object,
  appUI: PropTypes.object
};

export default Player;
