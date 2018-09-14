import React from 'react';
import Mediator from './services/Mediator';
import PropTypes from 'prop-types';

import Playlist from './components/Playlist/Playlist';
import Search from './components/Search/Search';
import Player from './components/Player/Player';

class App extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
  }

  render () {
    return (
      <div>
        <Search history={this.props.history}/>
        <Playlist mediator={Mediator} />
        <Player mediator={Mediator}/>
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.object
};

export default App;
