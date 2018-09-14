import React from 'react';
import Mediator from './services/Mediator';
import Router from './router';

import Search from './components/Search/Search';
import Player from './components/Player/Player';

class App extends React.Component {
  render () {
    return (
      <div>
        <Search />
        <Router mediator={Mediator} />
        <Player mediator={Mediator}/>
      </div>
    );
  }
}

export default App;
