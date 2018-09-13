import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Col, Row, Slider } from 'antd';
import { observer } from 'mobx-react';
import { observable, action, autorun } from 'mobx';
import './Player.css';

const data = [
  {
      id: 0,
      title: 'No trailing space',
      author: 'Linter',
      album: 'Chocolate cake dessert sweet roll jujubes',
      time: 194
  },
  {
      id: 1,
      title: 'I\'m forgotten',
      author: 'Var',
      album: 'Lollipop chupa chups tart bonbon',
      time: 160
  },
  {
      id: 2,
      title: 'I don\'t have this',
      author: 'Arrow function',
      album: 'Gummi bears wafer pastry macaroon icing biscuit',
      time: 242
  },
  {
      id: 3,
      title: 'Deadline is coming',
      author: 'Scrum master',
      album: 'Jujubes caramels jelly carrot cake',
      time: 198
  }
];

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

            <span>{this.trackTitle}</span>
          </Col>

          <Col span={20}>

            <Row
              type='flex'
              justify='center'
              align='middle'>

              <Col span={2}>
                <Button href='#'>shuffle</Button>
              </Col>

              <Col span={2}>
                <Button shape='circle'
                        size={'large'}
                        icon='backward'
                        onClick={this.handlePreviousSongClick}
                />
              </Col>

              <Col span={2}>
                <Button shape='circle'
                        size={'large'}
                        icon={this.ui.getIconType()}
                        onClick={() => this.ui.updateSongState()} />
              </Col>

              <Col span={2}>
                <Button shape='circle'
                        size={'large'}
                        icon='forward'
                        onClick={this.handleNextSongClick}
                />
              </Col>

              <Col span={2}>
                <Button href='#'>repeat</Button>
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
    setInterval(() => {
      if (!this.isPaused && this.timer < trackLength) {
        this.timer++;
      }
    }, 1000);
  }

  secondsToStringTime = (time) => {
    return `${parseInt(time / 60)}:${time % 60}`;
  }

  getIconType = () => {
    return this.isPaused ? this.iconTypes.play : this.iconTypes.pause;
  }
}

export default Player;

class PlayerModel {
  @observable
  track;

  init = (songId) => {
    return this.find(songId);
  }

  find = (songId) => {
    return this.fetch(songId).then(song => {
      this.track = song;
    });
  }

  fetch = (songId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const matchedSong = data.filter(song => song.id === songId);
        if (matchedSong.length) resolve(matchedSong[0]);
      }, 500);
    });
  }
}
