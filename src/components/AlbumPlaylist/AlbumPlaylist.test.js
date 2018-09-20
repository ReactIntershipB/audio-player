import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'mobx-react';

import AlbumPlaylist from './AlbumPlaylist';
import * as mockStore from './mockStorePlaylist';

describe('AlbumPlaylist', () => {
  const match = {
    params: {
      id: 123456
    }
  };

  it('should match snapshot when song is playing', () => {
    const props = {
      albumModel: new mockStore.AlbumModel(),
      songModel: {},
      searchModel: {},
      appUI: {}
    };

    const albumPlaylist = renderer
      .create(
        <Provider {...props} >
          <AlbumPlaylist match={match} />
        </Provider>
      ).toJSON();

    expect(albumPlaylist).toMatchSnapshot();
  });

  it('should match snapshot when is loading', () => {
    const props = {
      albumModel: new mockStore.AlbumModel(),
      songModel: {},
      searchModel: {},
      appUI: {}
    };

    mockStore.mockData = {};
    props.albumModel.loading = true;

    const albumPlaylist = renderer
      .create(
        <Provider {...props} >
          <AlbumPlaylist match={match} />
        </Provider>
      ).toJSON();

    expect(albumPlaylist).toMatchSnapshot();
  });

  it('should match snapshot when there is no results', () => {
    const props = {
      albumModel: new mockStore.AlbumModel(),
      songModel: {},
      searchModel: {},
      appUI: {}
    };

    props.albumModel.getData = jest.fn();

    const albumPlaylist = renderer
      .create(
        <Provider {...props} >
          <AlbumPlaylist match={match} />
        </Provider>
      ).toJSON();

    expect(albumPlaylist).toMatchSnapshot();
  });

  it('should call the find function with proper arguments', () => {
    const props = {
      albumModel: new mockStore.AlbumModel(),
      songModel: {},
      searchModel: {},
      appUI: {}
    };
    const find = props.albumModel.find;

    renderer
      .create(
        <Provider {...props} >
          <AlbumPlaylist match={match} />
        </Provider>
      );

    expect(find).toHaveBeenCalled();
    expect(find).toHaveBeenCalledWith(match.params.id);
    expect(find).toHaveBeenCalledTimes(1);
  });
});
