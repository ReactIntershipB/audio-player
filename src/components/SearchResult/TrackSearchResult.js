import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import ListColumn from '../common/ListColumn';
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

   get startComponent() {
        const { termText } = this.props.searchModel;
        return termText === '' ? <Start /> : null;
   }

   get spinner() {
       const { loading } = this.props.searchModel;
       return loading ? <Spinner /> : null;
   }

   get listComponent() {
       const { termText, loading, dataList } = this.props.searchModel;

       if (!loading && termText !== '') {
          return <ListColumn heading={termText} data={dataList} getButtonType={this.getButtonType} handleClick={this.handleClick} />;
       } else {
          return null;
       }
   }

   render() {
       return (
           <React.Fragment>
                { this.spinner }
                { this.startComponent }
                { this.listComponent }
           </React.Fragment>
       );
   }
}

TrackSearchResult.propTypes = {
    searchModel: PropTypes.object,
    songModel: PropTypes.object
};
