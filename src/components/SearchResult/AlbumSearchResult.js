import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

import './SearchResult.css';
import './../common/Common.css';

import Spinner from './../common/Spinner/Spinner';
import { Start } from './../common/Start';
import { ListComponent } from './../common/ListComponent';

@inject('searchModel', 'songModel')
@observer
export default class AlbumSearchResult extends React.Component {
    handleClick = (id) => {
        this.props.songModel.setCurrentSongId(id);
    }

   get startComponent() {
        const { termText, loading, dataWithoutDuplicates } = this.props.searchModel;
        return termText === '' && !loading && dataWithoutDuplicates.leegth === 0 ? < Start /> : null;
   }

   get spinner() {
        const { loading } = this.props.searchModel;
        return loading ? <Spinner /> : null;
   }

   get listComponent() {
       const { loading, dataWithoutDuplicates } = this.props.searchModel;
       return !loading && dataWithoutDuplicates.length > 0 ? <ListComponent data={dataWithoutDuplicates} type={'album'} /> : null;
   }

   render() {
       return (
            <div className="component-container">
                {this.startComponent}
                {this.spinner}
                {this.listComponent}
            </div>
       );
   }
}

AlbumSearchResult.propTypes = {
    searchModel: PropTypes.object,
    songModel: PropTypes.object
};
