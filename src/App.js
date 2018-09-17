import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AlbumSearchResult from './components/SearchResult/AlbumSearchResult';
import TrackSearchResult from './components/SearchResult/TrackSearchResult';
import Playlist from './components/Playlist/Playlist';

import Search from './components/Search/Search';
import Player from './components/Player/Player';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react';

@observer
class App extends React.Component {
  render () {
    return (
      <div>
        <Search history={this.props.history}/>
        <Switch>
          <Route exact path='/search/artist' component={AlbumSearchResult} />
          <Route exact path='/search/album' component={AlbumSearchResult} />
          <Route exact path='/search/track' component={TrackSearchResult} />
          <Route exact path='/album/:id' component={Playlist} />
        </Switch>
        <Player />
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.object
};

export default App;
