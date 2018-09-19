import React from 'react';
import PropTypes from 'prop-types';
import { PlayIcon } from './PlayIcon';
import './Common.css';

const ListComponent = ({ heading, data, avatar }) => {
  const ui = new ListUi();
    return (
      <div className="playlist-container">
        <div className="list-column-container">
          <h2 className="list-column-title">{heading}</h2>
          {data.map(item => {
            const { title } = item.album ? item.album : item;
            return (
              <div key={item.id} className="list-column-item-container">
                <div className="list-column-item-content">
                  <PlayIcon songId="item.id" />
                  <h3>{title}</h3>
                  <p>{ui.getDescription(item.artist.name, title)}</p>
                  <p>{ui.getDuration(item.duration)}</p>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    );
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
