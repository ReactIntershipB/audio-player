import React from 'react';
import PropTypes from 'prop-types';
import { List, Avatar } from 'antd';

import { PlayIcon } from './PlayIcon';
import './Common.css';

const ListComponent = ({ heading, data, avatar }) => {
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
                {avatar && <Avatar shape='square' size={64} src={avatar} />}
                <h2>{heading}</h2>
            </div>
            <div>
                {data.map(item => {
                    const title = item.album ? item.album.title : item.title;
                    return (
                        <div key={item.id}>
                        <List.Item>
                                <List.Item.Meta
                                    avatar={<PlayIcon />}
                                    title={item.title}
                                    description={ui.getDescription(item.artist.name, title)}/>
                                <div>{ui.getDuration(item.duration)}</div>
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
    data: PropTypes.array,
    avatar: PropTypes.string
};

class ListUi {
    getDuration = (duration) => {
        const durationMin = Math.floor(duration / 60);
        const durationSec = duration % 60;
        const formattedDurationSec = this.formatNumber(durationSec);
        return `${durationMin}:${formattedDurationSec}`;
      }

      formatNumber = (num) => {
        if (num < 10) {
          return `0${num}`;
        } else {
          return num;
        }
      }

    getDescription(author, album) {
        return `${author} - ${album}`;
    }
}

export default ListComponent;
