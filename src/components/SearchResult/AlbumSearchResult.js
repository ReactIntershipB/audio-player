import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Spinner from './../common/Spinner';
import { Start } from './../common/Start';
import { ListGrid } from './../common/ListGrid';
import './SearchResult.css';

@inject('searchModel', 'songModel')
@observer
export default class AlbumSearchResult extends React.Component {
   handleClick = (id) => {
     this.props.songModel.setCurrentSongId(id);
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
       const { loading, termText, dataWithoutDuplicates } = this.props.searchModel;
       console.log('dadsf', dataWithoutDuplicates);
       return !loading && termText !== '' ? <ListGrid data={dataWithoutDuplicates}/> : null;
   }

   render() {
       return (
           <div>
              { this.startComponent }
              { this.spinner }
              { this.listComponent }
           </div>
       );
   }
}

AlbumSearchResult.propTypes = {
    searchModel: PropTypes.object,
    songModel: PropTypes.object,
    history: PropTypes.object
};
