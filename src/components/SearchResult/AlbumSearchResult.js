import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './SearchResult.css';

import Spinner from './../common/Spinner';
import { Start } from './../common/Start';
import { ListGrid } from './../common/ListGrid';

@inject('searchModel', 'songModel')
@observer
export default class AlbumSearchResult extends React.Component {
    handleClick = (id) => {
        this.props.songModel.setCurrentSongId(id);
    }

   get startComponent() {
        const { termText, loading, dataWithoutDuplicates } = this.props.searchModel;
        return termText === '' && !loading && dataWithoutDuplicates.leegth === 0 ? < Start / > : null;
   }

   get spinner() {
        const { loading } = this.props.searchModel;
        return loading ? <Spinner /> : null;
   }

   get listComponent() {
       const { loading, dataWithoutDuplicates } = this.props.searchModel;
       return !loading && dataWithoutDuplicates.length > 0 ? <ListGrid data={dataWithoutDuplicates}/> : null;
   }

   render() {
       return (
        <ReactCSSTransitionGroup
            transitionName="slide"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
        >
            {this.startComponent}
            {this.spinner}
            {this.listComponent}
        </ReactCSSTransitionGroup>
       );
   }
}

AlbumSearchResult.propTypes = {
    searchModel: PropTypes.object,
    songModel: PropTypes.object
};
