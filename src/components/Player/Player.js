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
    this.playerUI = new PlayerUI();
    this.props.songModel.init();

    reaction(
      () => this.props.songModel.songLink,
      () => {
          this.props.appUI.togglePause();
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
    return (
      <div className='player'>

        <audio id='audioPlayer'
          autoPlay
          src={this.props.songModel.songLink}
        ></audio>

        <Row type='flex'
          justify='center'
          align='middle'>

          <Col span={2}>
            <Avatar shape='square'
              size={80}
              icon='star' />

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
                className='btns'>

                <Button shape='circle'
                  size={'large'}
                  icon='backward'
                  onClick={this.handlePreviousSongClick}
                />

              </Col>

              <Col
                span={2}
                className='btns'>

                <PlayIcon
                  disabled={!this.props.songModel.songLink}
                />

              </Col>

              <Col
                span={2}
                className='btns'>

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
              align='middle'>

              <Col span={22}>
                <Slider min={0}
                  max={this.props.songModel.songLength}
                  value={this.currentSongTime}
                  disabled={false}
                  onChange={this.sliderChange} />
              </Col>

              <Col span={2}>
                <span>{}</span>
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
  @observable songStatus = false;

  @action toggleSong () {
    console.log(this.songStatus);
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
