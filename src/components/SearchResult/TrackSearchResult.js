import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import ListColumn from '../common/ListColumn';
import Spinner from './../common/Spinner';
import { Start } from './../common/Start';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
          return <ListColumn heading={termText} data={dataList} getButtonType={this.getButtonType} handleClick={this.handleClick} />;
       } else {
          return null;
       }
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
                { this.spinner }
                { this.startComponent }
                { this.listComponent }
           </ReactCSSTransitionGroup>
       );
   }
}

TrackSearchResult.propTypes = {
    searchModel: PropTypes.object,
    songModel: PropTypes.object,
    match: PropTypes.object
};
