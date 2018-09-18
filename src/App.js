import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Layout } from 'antd';

import AlbumSearchResult from './components/SearchResult/AlbumSearchResult';
import TrackSearchResult from './components/SearchResult/TrackSearchResult';
import AlbumPlaylist from './components/AlbumPlaylist/AlbumPlaylist';
import Player from './components/Player/Player';
import Search from './components/Search/Search';
import './components/common/Common.css';

const { Header, Footer, Content } = Layout;

@observer
class App extends React.Component {
  render () {
    return (
      <Layout>
        <div id="message-box"></div>
        <Header>
           <Search history={this.props.history}/>
        </Header>
        <Content className="content-container">
          <Switch>
            <Route exact path='/search/artist' component={AlbumSearchResult} />
            <Route exact path='/search/album' component={AlbumSearchResult} />
            <Route exact path='/search/track' component={TrackSearchResult} />
            <Route exact path='/album/:id' component={({ match }) => <AlbumPlaylist match={match} />} />
          </Switch>
        </Content>
        <Footer>
          <Player />
        </Footer>
      </Layout>
    );
  }
}

App.propTypes = {
  history: PropTypes.object
};

export default App;
