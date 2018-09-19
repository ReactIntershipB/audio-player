import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';

import AlbumSearchResult from './components/SearchResult/AlbumSearchResult';
import TrackSearchResult from './components/SearchResult/TrackSearchResult';
import AlbumPlaylist from './components/AlbumPlaylist/AlbumPlaylist';
import Player from './components/Player/Player';
import Search from './components/Search/Search';
import './components/common/Common.css';

@observer
class App extends React.Component {
  render() {
    return (
      <div className="player-container">
        <div className="top-layer-container">
          <div className="background-image"></div>
          <Switch>
            <Route path='/search/:type/:term' component={Search} />
            <Route component={Search} />
          </Switch>
          <Player />
        </div>
        <Switch>
          <Route path='/search/artist/:term' component={({ match }) => <AlbumSearchResult match={match} />} />
          <Route path='/search/album/:term' component={({ match }) => <AlbumSearchResult match={match} />} />
          <Route path='/search/track/:term' component={({ match }) => <TrackSearchResult match={match} />} />
          <Route exact path='/album/:id' component={({ match }) => <AlbumPlaylist match={match} />} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object
};

export default App;
