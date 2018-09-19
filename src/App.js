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
  render() {
    return (
      <Layout>
        <Header>
           <Switch>
            <Route path='/search/:type/:term' component={Search} />
            <Route component={Search} />
          </Switch>
        </Header>
        <Content className="content-container">
          <Switch>
            <Route path='/search/artist/:term' component={({ match }) => <AlbumSearchResult match={match} />} />
            <Route path='/search/album/:term' component={({ match }) => <AlbumSearchResult match={match} />} />
            <Route path='/search/track/:term' component={({ match }) => <TrackSearchResult match={match} />} />
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
  history: PropTypes.object,
  match: PropTypes.object
};

export default App;
