import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { Card, Row, Col, Button } from 'antd';
import Spinner from './../common/Spinner';
import './SearchResult.css';

const { Meta } = Card;

@inject('searchModel', 'songModel')
@observer
export default class AlbumSearchResult extends React.Component {
   handleClick = (id) => {
     this.props.songModel.setCurrentSongId(id);
   }

   render() {
       if (this.props.searchModel.loading) {
           return <Spinner />;
       } else {
            return (
                <div className="list-container">
                <Row type="flex" justify="center" align="middle">
                    {this.props.searchModel.dataWithoutDuplicates.map(item => {
                        return (
                            <Col span={4} key={item.album.id} className="list-item">
                                <Card style={{ width: 240 }} cover={<img alt={item.album.title} src={item.album.cover} />} >
                                    <Meta title={item.album.title}
                                          description={
                                              <span>
                                                  <Button onClick={() => this.handleClick(item.id)} type="primary" shape="circle" icon="caret-right" />
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
       }
   }
}

AlbumSearchResult.propTypes = {
    searchModel: PropTypes.object,
    songModel: PropTypes.object,
    history: PropTypes.object
};
