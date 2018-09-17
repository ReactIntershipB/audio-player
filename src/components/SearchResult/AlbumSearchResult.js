import React from 'react';
import { observer, inject } from 'mobx-react';
// import { reaction } from 'mobx';
import PropTypes from 'prop-types';
import { Card, Row, Col, Button } from 'antd';
import './SearchResult.css';

const { Meta } = Card;

@inject('searchModel')
@observer
export default class AlbumSearchResult extends React.Component {
   handleClick = (id) => {
     this.props.history.push(`/playlist/${id}`);
   }
   render() {
       return (
           <div className="list-container">
            <Row type="flex" justify="center" align="middle">
                {this.props.searchModel.albumData.map(item => {
                    return (
                        <Col span={4} key={item.album.id} className="list-item">
                            <Card style={{ width: 240 }} cover={<img alt="example" src={item.album.cover} />} >
                                <Meta title={item.album.title} description={<Button onClick={() => this.handleClick(item.album.id)} type="primary" shape="circle" icon="caret-right" />}/>
                            </Card>
                        </Col>);
                })}
            </Row>
           </div>
       );
   }
}

AlbumSearchResult.propTypes = {
    searchModel: PropTypes.object,
    history: PropTypes.object
};
