import React, { Component } from 'react';
import { Avatar, Button, Col, Row, Slider } from 'antd';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import './Player.css';

const data =  {
  id: 2,
  title: "Tytuł3",
  author: "Author3",
  album: "Gummi bears wafer pastry macaroon icing biscuit",
  time: 200
};

@observer
class Player extends Component {

  constructor() {
    super();
    this.ui = new PlayerUI();
    this.model = new PlayerModel();
  }
  
  componentDidMount() {
    const initPromise = this.model.init();
    initPromise.then(() => {
      this.ui.playTrack(this.model.track.time)
    });
  }
  
  sliderChange = (value) => {
    this.ui.updateTimer(value);
  }
  
  get trackLength() {
    return this.model.track ? this.model.track.time : 0;
  }

  get trackTimeStatus() {
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

            <Row  type='flex'
                  justify='center'
                  align='middle'>
              
              <Col span={2}>
              
                <Button href='#'>shuffle</Button>
              
              </Col>

              <Col span={2}>

                <Button shape='circle'
                        size={'large'}
                        icon='backward'/>
              
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
                        icon='forward'/>
              
              </Col>

               <Col span={2}>
              
                <Button href='#'>repeat</Button>
              
              </Col>

            </Row>

            <Row  type='flex'
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
  updateSongState() {
    this.isPaused = !this.isPaused;
  }

  @action
  updateTimer(value) {
    this.timer = value;
  }
  
  @action
  playTrack(trackLength) {
    setInterval(() => {
      if (!this.isPaused && this.timer < trackLength)
        this.timer++;
    }, 1000)
  }

  secondsToStringTime = (time) => {
    return `${parseInt(time / 60)}:${time % 60}`;
  }
  
  getIconType = () => {
    return this.isPaused ? this.iconTypes.play : this.iconTypes.pause;
  }
}

class PlayerModel {
  
  @observable track = null;
  
  
  init = () => {
    return this.fetchTrack();
  }


  fetchTrack = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            this.track = data;
            console.debug('this.trackt', this.track)
            resolve(true);
        }, 2000);
    });
  }
}

export default Player;