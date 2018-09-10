import React, { Component } from 'react';

import Searcher from './Searcher';
import Playlist from './Playlist';
import Player from './Player';

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
