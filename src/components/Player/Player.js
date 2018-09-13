import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Col, Row, Slider } from 'antd';
import { observer } from 'mobx-react';
import { observable, action, autorun } from 'mobx';
import { PlayerModel } from '../../models/PlayerModel/PlayerModel';
import './Player.css';

@observer
class Player extends React.Component {
  constructor() {
    super();
    this.ui = new PlayerUI();
    this.model = new PlayerModel();
  }

  componentDidMount() {
    autorun(() => {
      const initPromise = this.model.init(this.props.mediator.currentSongId);
      initPromise.then(() => {
        this.ui.playTrack(this.model.track.time);
      });
    });
  }

  handleNextSongClick = () => {
    this.props.mediator.getNextSong();
  }

  handlePreviousSongClick = () => {
    this.props.mediator.getPreviousSong();
  }

  sliderChange = (value) => {
    this.ui.updateTimer(value);
  }

  get trackLength () {
    return this.model.track ? this.model.track.time : 0;
  }

  get trackTimeStatus () {
    return this.ui.secondsToStringTime(this.ui.timer) + '/' + this.ui.secondsToStringTime(this.trackLength);
  }

  get trackTitle () {
    return this.model.track ? this.model.track.title : '';
  }

  render() {
    return (
      <div className='player'>
        <Row type='flex'
             justify='center'
             align='middle'>

          <Col span={2}>

            <Avatar shape='square'
              size={80}
              icon='star' />

            <br />

            <span>Album title</span>

          </Col>

          <Col span={20}>

            <Row
              type='flex'
              justify='center'
              align='middle'>
                <span className='title'>{this.trackTitle}</span>
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

                <Button shape='circle'
                        size={'large'}
                        icon={this.ui.getIconType()}
                        onClick={() => this.ui.updateSongState()} />
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
                        max={this.model.track ? this.model.track.time : 0}
                        value={this.ui.timer}
                        disabled={false}
                        onChange={this.sliderChange} />
              </Col>

              <Col span={2}>
                <span>{this.trackTimeStatus}</span>
              </Col>

            </Row>

          </Col>

        </Row>
      </div>

    );
  }
}

Player.propTypes = {
  mediator: PropTypes.object
};

class PlayerUI {
  @observable isPaused = false;
  @observable timer = 0;
  intervalId;

  iconTypes = {
    pause: 'pause',
    play: 'caret-right'
  }

  @action
  updateSongState () {
    this.isPaused = !this.isPaused;
  }

  @action
  updateTimer (value) {
    this.timer = value;
  }

  @action
  playTrack (trackLength) {
    this.resetTimeTrack();
    this.intervalId = setInterval(() => {
      if (!this.isPaused && this.timer < trackLength) {
        this.timer++;
      } else if (this.time >= trackLength) {
        window.clearInterval(this.intervalId);
      }
    }, 1000);
  }

  resetTimeTrack = () => {
    if (this.intervalId !== undefined || this.intervalId !== null) {
        window.clearInterval(this.intervalId);
        this.intervalId = null;
    }
    this.timer = 0;
  }

  secondsToStringTime = (time) => {
    return `${parseInt(time / 60)}:${time % 60}`;
  }

  getIconType = () => {
    return this.isPaused ? this.iconTypes.play : this.iconTypes.pause;
  }
}

export default Player;
