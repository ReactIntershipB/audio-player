import React, { Component } from 'react';
import { Avatar, Button, Col, Row, Slider } from 'antd';
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
class Player extends Component {
  constructor() {
    super();
    this.model = new PlayerModel();
  }

  componentDidMount() {
    autorun(() => this.model.find(this.props.mediator.currentSongId));
  }

  handleNextSongClick = () => {
    this.props.mediator.getNextSong();
  }

  handlePreviousSongClick = () => {
    this.props.mediator.getPreviousSong();
  }

  render() {
    const songTitle = this.model.currentSong ? this.model.currentSong.title : '';
    const songLength = this.model.currentSong ? this.model.currentSong.time : '0:00';
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

            <span>{songTitle}</span>

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
                        icon='backward'
                        onClick={this.handlePreviousSongClick}
                />
              
              </Col>

              <Col span={2}>
              
                <Button shape='circle'
                        size={'large'}
                        icon='caret-right'
                />
              
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

            <Row  type='flex'
                  justify='center'
                  align='middle'>

              <Col span={22}>
              
                <Slider defaultValue={25} disabled={false} />
              
              </Col>

              <Col span={2}>
              
                <span>{songLength}</span>
              
              </Col>

            </Row>

          </Col>

        </Row>

      </div>

    );

  }

}

export default Player;

class PlayerModel {
  @observable
  currentSong = null;

  find(songId) {
     this.fetch(songId).then(song => this.currentSong = song);
  }

  fetch(songId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const matchedSong = data.filter(song => song.id === songId);
        if (matchedSong.length) resolve(matchedSong[0]);
      }, 500)
    }); 
  }
}