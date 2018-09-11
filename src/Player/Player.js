import React, { Component } from 'react';
import { Avatar, Button, Col, Row, Slider } from 'antd';

class Player extends Component {

  render() {

    let style = {
      width: '100%',
      height: '120px',
      paddingTop: '10px',
      position: 'fixed',
      bottom: '0rem',
      border: 'solid 1px lightgrey'
    };

    return (

      <div style={style}>
        
        <Row  type='flex'
              justify='center'
              align='middle'>

          <Col span={2}>

            <Avatar shape='square'
                    size={80}
                    icon='star' />

            <br />

            <span>Track 1</span>

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
                        icon='caret-right'/>
              
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
              
                <Slider defaultValue={25} disabled={false} />
              
              </Col>

              <Col span={2}>
              
                <span>2:05</span>
              
              </Col>

            </Row>

          </Col>

        </Row>

      </div>

    );

  }

}

export default Player;
