import React, { Component } from 'react';

import './App.css';
import Searcher from './components/Searcher/Searcher';
import Playlist from './components/Playlist/Playlist';
import Player from './Player/Player';

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
