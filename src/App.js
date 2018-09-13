import React from 'react';
import Mediator from './services/Mediator';

import Playlist from './components/Playlist/Playlist';
import Searcher from './components/Searcher/Searcher';
import Player from './components/Player/Player';

class App extends React.Component {
  render () {
    return (
      <div>
        <Searcher />
        <Playlist mediator={Mediator} />
        <Player mediator={Mediator}/>
      </div>
    );
  }
}

export default App;
