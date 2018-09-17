import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import AlbumPlaylist from './components/AlbumPlaylist/AlbumPlaylist';
import Search from './components/Search/Search';
import Player from './components/Player/Player';

class App extends React.Component {
  render () {
    return (
      <div>
        <Search history={this.props.history}/>
        <Route path='/album/:id' component={({ match }) => <AlbumPlaylist match={match} />} />
        <Player />
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.object
};

export default App;
