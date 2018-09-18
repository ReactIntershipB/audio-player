import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import ListComponent from './../common/List';
import Spinner from './../common/Spinner';
import { Start } from './../common/Start';

@inject('searchModel', 'songModel')
@observer
export default class TrackSearchResult extends React.Component {
   handleClick = (item) => {
      this.props.songModel.setCurrentSongId(item.id);
   }

   getButtonType = (id) => {
      return this.props.songModel.currentSongId === id ? 'pause' : 'caret-right';
   }

   get spinner() {
       const { loading } = this.props.searchModel;
       return loading ? <Spinner /> : null;
   }

   get beforeSearch() {
       const { termText } = this.props.searchModel;
       return termText === '' ? <Start /> : null;
   }

   get listComponent() {
       const { termText, loading } = this.props.searchModel;
       return !loading && termText !== '' ? <ListComponent heading={this.props.searchModel.termText} data={this.props.searchModel.dataList}
                                                           getButtonType={this.getButtonType} handleClick={this.handleClick} /> : null;
   }

   render() {
       return (
           <div>
                { this.spinner }
                { this.beforeSearch }
                { this.listComponent }
           </div>
       );
   }
}

TrackSearchResult.propTypes = {
    searchModel: PropTypes.object,
    songModel: PropTypes.object
};
