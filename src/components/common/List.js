import React from 'react';
import PropTypes from 'prop-types';
import { List, Button } from 'antd';
import './Common.css';

const ListComponent = ({ heading, getButtonType, handleClick, data }) => {
  const ui = new ListUi();
  if (data.length === 0) {
      return (
        <div className="no-results-container">
            <i className="far fa-sad-tear"></i>
            <p>No Results</p>
        </div>
      );
  } else {
    return (
        <div className='playlist-container'>
            <div className='avatar'>
                <h2>{heading}</h2>
            </div>
            <div>
                {data.map(item => {
                    return (
                        <div key={item.id}>
                        <List.Item>
                                <List.Item.Meta
                                    avatar={<Button type="primary" shape="circle" icon={getButtonType(item.id)} size="large" onClick={() => handleClick(item)}/>}
                                    title={item.title}
                                    description={ui.getDescription(item.artist.name, item.album.title)}/>
                                <div>{ui.getDurationString(item.duration)}</div>
                        </List.Item>
                        <hr />
                        </div>
                    );
                })}
            </div>
        </div>
      );
  }
};

ListComponent.propTypes = {
    heading: PropTypes.string,
    getButtonType: PropTypes.func,
    handleClick: PropTypes.func,
    data: PropTypes.array
};

class ListUi {
    getDurationString(duration) {
        return `${parseInt(duration / 60)} : ${duration % 60}`;
    }

    getDescription(author, album) {
        return `${author} - ${album}`;
    }
}

export default ListComponent;
