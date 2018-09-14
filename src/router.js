import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Playlist from './components/Playlist/Playlist';
import SearchResult from './components/SearchResult/SearchResult';

const Router = (props) => (
    <Switch>
      <Route exact path='/search' component={SearchResult} />
      <Route exact path='/playlist' component={() => <Playlist mediator={props.mediator}/>} />
      <Route component={SearchResult} />
    </Switch>
);

Router.propTypes = {
  mediator: PropTypes.object
};

export default Router;
