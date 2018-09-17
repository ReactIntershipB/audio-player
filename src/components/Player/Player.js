import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Col, Row, Slider } from 'antd';
import { observer, inject } from 'mobx-react';
import './Player.css';
import { PlayIcon } from './../common/PlayIcon';

@inject('appUI', 'songModel')
@observer
class Player extends React.Component {
  constructor(props) {
    super(props);
    this.ui = new PlayerUI();
    this.props.songModel.init();
  }

  handleNextSongClick = () => {
    ;
  }

  handlePreviousSongClick = () => {
    ;
  }

  sliderChange = (value) => {
    this.ui.updateTimer(value);
  }

  secondsToStringTime = (time) => {
    return `${parseInt(time / 60)}:${time % 60}`;
  }

  get trackLength () {
    // return this.props.songModel.currentSong.duration ? this.props.songModel.currentSong.duration : 0;
    return 30;
  }

  get trackTimeStatus () {
    return this.secondsToStringTime(this.ui.timer) + '/' + this.secondsToStringTime(this.trackLength);
  }

  get trackTitle () {
    return this.props.songModel.track ? this.props.songModel.track.title : '';
  }

  render() {
    return (
      <div className='player'>
      {this.props.songModel.currentSong.preview}

        <audio autoPlay src={this.props.songModel.currentSong.preview}></audio>

        <Row type='flex'
          justify='center'
          align='middle'>

          <Col span={2}>
            <Avatar shape='square'
              size={80}
              icon='star' />

            <br />

            <span>jhjhjhjh</span>

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

                <PlayIcon />

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
                  max={this.props.songModel.track ? this.props.songModel.track.time : 0}
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

}

Player.propTypes = {
  songModel: PropTypes.object,
  appUI: PropTypes.object
};

export default Player;
