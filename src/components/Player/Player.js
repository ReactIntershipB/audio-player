import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Col, Row, Slider } from 'antd';
import { observer, inject } from 'mobx-react';
import './Player.css';
import { PlayIcon } from './../common/PlayIcon';
import { autorun } from 'mobx';

@inject('appUI', 'songModel')
@observer
class Player extends React.Component {
  constructor(props) {
    super(props);
    this.props.songModel.init();

    autorun(() => {
      if (this.songLink) {
        this.props.appUI.togglePause();
      }
    });
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

  secondsToStringTime = (time) => {
    return `${parseInt(time / 60)}:${time % 60}`;
  }

  get trackLength () {
    // return this.props.songModel.currentSong.duration ? this.props.songModel.currentSong.duration : 0;
    return 30;
  }

  get trackTitle () {
    return this.props.songModel.track ? this.props.songModel.track.title : '';
  }

  get songLink () {
    return this.props.songModel.currentSong.preview;
  }

  render() {
    return (
      <div className='player'>

        <audio autoPlay src={this.songLink}></audio>

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

                <PlayIcon disabled={!this.songLink}/>

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
                  value={this.props.appUI.timer}
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
  songModel: PropTypes.object,
  appUI: PropTypes.object
};

export default Player;
