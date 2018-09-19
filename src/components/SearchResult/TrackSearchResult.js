import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import { ListComponent } from '../common/ListComponent/ListComponent';
import Spinner from './../common/Spinner/Spinner';
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
          return <ListComponent data={dataList} getButtonType={this.getButtonType} handleClick={this.handleClick} type={'track'} />;
       } else {
          return null;
       }
   }

   render() {
       return (
           <div className="component-container">
                {this.spinner}
                {this.startComponent}
                {this.listComponent}
           </div>
       );
   }
}

TrackSearchResult.propTypes = {
    searchModel: PropTypes.object,
    songModel: PropTypes.object,
    match: PropTypes.object
};
