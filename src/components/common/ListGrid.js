import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'antd';
import { PlayIcon } from './PlayIcon/PlayIcon';
import './Common.css';

const { Meta } = Card;

export const ListGrid = ({ data }) => {
    return (
        <div className="playlist-container">
            <Row type="flex" justify="flex-start" align="top">
                {data.map(item => {
                    return (
                        <Col span={8} key={item.album.id} className="list-item">
                            <Card style={{ minWidth: '10vw', maxWidth: '17vw' }} cover={<img alt={item.album.title} src={item.album.cover_big} />} >
                                <Meta title={item.album.title}
                                    description={
                                        <span>
                                            <PlayIcon songId={item.id}/>
                                            {` ${item.title}`}
                                        </span>
                                        }/>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

ListGrid.propTypes = {
  data: PropTypes.array
};
