import React from 'react';
import PropTypes from 'prop-types';

import Playlist from './components/Playlist/Playlist';
import Search from './components/Search/Search';
import Player from './components/Player/Player';

class App extends React.Component {
  render () {
    return (
      <div>
        <Search history={this.props.history} />
        <Playlist />
        <Player />
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.object
};

export default App;
