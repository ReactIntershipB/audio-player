import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'mobx-react';

import AlbumPlaylist from './AlbumPlaylist';
import * as mockStore from './mockStorePlaylist';
import { BrowserRouter as Router } from 'react-router-dom';

describe('AlbumPlaylist', () => {
  const match = {
    params: {
      id: 123456
    }
  };

  it('should match snapshot when song is playing', () => {
    // arrange
    const props = {
      albumModel: new mockStore.AlbumModel(),
      songModel: {},
      searchModel: {},
      appUI: {}
    };

    // act
    const albumPlaylist = renderer
      .create(
        <Provider {...props} >
          <Router >
            <AlbumPlaylist match={match} />
          </Router>
        </Provider>
      ).toJSON();

    // assert
    expect(albumPlaylist).toMatchSnapshot();
  });

  it('should match snapshot when is loading', () => {
    // arrange
    const props = {
      albumModel: new mockStore.AlbumModel(),
      songModel: {},
      searchModel: {},
      appUI: {}
    };

    mockStore.mockData = {};
    props.albumModel.loading = true;

    // act
    const albumPlaylist = renderer
      .create(
        <Provider {...props} >
          <Router >
            <AlbumPlaylist match={match} />
          </Router>
        </Provider>
      ).toJSON();

    // assert
    expect(albumPlaylist).toMatchSnapshot();
  });

  it('should call the find function with proper arguments', () => {
    // arrange
    const props = {
      albumModel: new mockStore.AlbumModel(),
      songModel: {},
      searchModel: {},
      appUI: {}
    };
    const find = props.albumModel.find;

    // act
    renderer
      .create(
        <Provider {...props} >
          <Router >
            <AlbumPlaylist match={match} />
          </Router>
        </Provider>
      );

    // assert
    expect(find).toHaveBeenCalled();
    expect(find).toHaveBeenCalledWith(match.params.id);
    expect(find).toHaveBeenCalledTimes(1);
  });
});
