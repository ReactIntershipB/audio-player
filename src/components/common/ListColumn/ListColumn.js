import React from 'react';
import PropTypes from 'prop-types';
import { List, Avatar } from 'antd';

import { PlayIcon } from './PlayIcon';
import './Common.css';
import { ResultsMessage } from './ResultsMessage';

export const ListColumn = ({ heading, data, avatar }) => {
  const ui = new ListUi();
  if (data.length === 0) {
      return (
        <ResultsMessage />
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
                                    avatar={<PlayIcon songId={item.id}/>}
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

ListColumn.propTypes = {
    heading: PropTypes.string,
    getButtonType: PropTypes.func,
    handleClick: PropTypes.func,
    data: PropTypes.array,
    avatar: PropTypes.string
};

export class ListUi {
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
