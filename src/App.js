import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';

import AlbumSearchResult from './components/SearchResult/AlbumSearchResult';
import TrackSearchResult from './components/SearchResult/TrackSearchResult';
import AlbumPlaylist from './components/AlbumPlaylist/AlbumPlaylist';
import Player from './components/Player/Player';
import Search from './components/Search/Search';

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
          <Route exact path='/album/:id' component={({ match }) => <AlbumPlaylist match={match} />} />
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
