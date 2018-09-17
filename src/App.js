import React from 'react';

import Playlist from './components/Playlist/Playlist';
import Search from './components/Search/Search';
import Player from './components/Player/Player';

class App extends React.Component {
  render () {
    return (
      <div>
        <Searcher />
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
