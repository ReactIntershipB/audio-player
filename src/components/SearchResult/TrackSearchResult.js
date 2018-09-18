import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import ListComponent from './../common/List';
import Spinner from './../common/Spinner';

@inject('searchModel', 'songModel')
@observer
export default class TrackSearchResult extends React.Component {
   handleClick = (item) => {
      this.props.songModel.setCurrentSongId(item.id);
   }

   getButtonType = (id) => {
      return this.props.songModel.currentSongId === id ? 'pause' : 'caret-right';
   }

   render() {
       if (this.props.searchModel.loading) {
           return <Spinner />;
       } else if (this.props.searchModel.termText === '') {
           return (
                <div className="no-serach-term-container">
                   <i className="fas fa-music"></i>
                   <p>Listen To Your Favourite Music</p>
                 </div>
           );
       } else {
            return (
                <ListComponent heading={this.props.searchModel.termText}
                               data={this.props.searchModel.data.data}
                               getButtonType={this.getButtonType}
                               handleClick={this.handleClick}
                               />
            );
       }
   }
}

TrackSearchResult.propTypes = {
    searchModel: PropTypes.object,
    songModel: PropTypes.object
};
