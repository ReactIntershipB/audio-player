import React, { Component } from 'react';

import Playlist from './components/Playlist/Playlist';
import Searcher from './components/Searcher/Searcher';
import Player from './components/Player/Player';

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
