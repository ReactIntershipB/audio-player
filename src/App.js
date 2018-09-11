import React, { Component } from 'react';

import Searcher from './components/Searcher';
import Playlist from './components/Playlist';
import Player from './components/Player';

class App extends Component {
  render() {
    return (
      <div>
        <Searcher />
        <Playlist />
        <Player />
      </div>
    );
  }
}

export default App;
