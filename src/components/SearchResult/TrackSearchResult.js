import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import { ListComponent } from '../common/ListComponent';
import Spinner from './../common/Spinner';
import { Start } from './../common/Start';

import './../common/Common.css';

@inject('searchModel', 'songModel')
@observer
export default class TrackSearchResult extends React.Component {
    componentDidMount() {
        this.props.searchModel.setTermText(this.props.match.params.term);
    }

    handleClick = (item) => {
        this.props.songModel.setCurrentSongId(item.id);
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
          return <ListComponent heading={termText} data={dataList} getButtonType={this.getButtonType} handleClick={this.handleClick} />;
       } else {
          return null;
       }
   }

   render() {
       return (
           <React.Fragment>
            {this.spinner}
            {this.startComponent}
            {this.listComponent}
           </React.Fragment>
       );
   }
}

TrackSearchResult.propTypes = {
    searchModel: PropTypes.object,
    songModel: PropTypes.object,
    match: PropTypes.object
};
