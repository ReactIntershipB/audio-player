import React from 'react';
import { Avatar, Button, Col, Row, Slider } from 'antd';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import './Player.css';
import { observer } from 'mobx-react';
import { observable, autorun } from 'mobx';

const data = [
  {
      id: 0,
      title: "Tytuł1",
      author: "Author1",
      album: "Chocolate cake dessert sweet roll jujubes",
      time: "03:14"
  },
  {
      id: 1,
      title: "Tytuł2",
      author: "Author2",
      album: "Lollipop chupa chups tart bonbon",
      time: "02:30"
  },
  {
      id: 2,
      title: "Tytuł3",
      author: "Author3",
      album: "Gummi bears wafer pastry macaroon icing biscuit",
      time: "04:02"
  },
  {
      id: 3,
      title: "Tytuł4",
      author: "Author4",
      album: "Jujubes caramels jelly carrot cake",
      time: "03:18"
  }
]

@observer
class Player extends React.Component {
  constructor() {
    super();
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
        <Row  type='flex'
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
    return this.fetchTrack(songId);
  }

  find = (songId) => {
    return this.fetch(songId).then(song => this.currentSong = song);
  }

  fetch = (songId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const matchedSong = data.filter(song => song.id === songId);
        if (matchedSong.length) resolve(matchedSong[0]);
      }, 500)
    }); 
  }
}
