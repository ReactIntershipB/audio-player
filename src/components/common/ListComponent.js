import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FadeIn from 'react-fade-in';
import { Avatar } from 'antd';

import { PlayIcon } from './PlayIcon';

import './Common.css';

export class ListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.ui = new ListUi();
  }

  get list() {
    if (this.props.data.length === 0) {
       return null;
    } else {
      return (
        <FadeIn>
          <div className="playlist-container">
            <div className="list-column-container">
              {this.props.data.map(item => {
                return (
                  <div key={item.id}>
                    <div className="list-column-item-content">
                    <Link to={this.getLink(item)} onClick={this.enableLink}>
                      {this.getPlayIcon(item.id)}
                      {this.getAvatar(item)}
                      <div className="list-column-item-content-heading">
                        <p>{`${item.artist.name} - ${this.getTitle(item)}`}</p>
                        { this.props.type === 'track' && <p>{this.getAlbumTitle(item)}</p>}
                      </div>
                      {this.props.type === 'track' && <p>{this.ui.getDuration(item.duration)}</p>}
                    </Link>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      );
    }
  }

  getPlayIcon = (id) => {
    const { type } = this.props;

    return type === 'track' ? <PlayIcon songId={id} /> : null;
  }

  getAvatar = (item) => {
    const { type } = this.props;

    return type !== 'track' ? <Avatar size={60} src={item.album.cover_small} shape={'square'}/> : null;
  }

  getTitle = (item) => {
    const { type } = this.props;

    return type !== 'track' ? item.album.title : item.title;
  }

  getAlbumTitle = (item) => {
    const { albumTitle } = this.props;
    if (albumTitle) return albumTitle;
    if (item.album) return item.album.title;
    return '';
  }

  getLink = (item) => {
    const { type } = this.props;
    return type === 'track' || !type ? '' : `/album/${item.album.id}`;
  }

  enableLink = (event) => {
     if (this.props.type === 'track') {
        event.preventDefault();
     }
  }

  render() {
    return (
      <React.Fragment>
         {this.list}
      </React.Fragment>
    );
  }
};

ListComponent.propTypes = {
    heading: PropTypes.string,
    getButtonType: PropTypes.func,
    handleClick: PropTypes.func,
    data: PropTypes.array,
    avatar: PropTypes.string,
    type: PropTypes.string,
    albumTitle: PropTypes.string
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
