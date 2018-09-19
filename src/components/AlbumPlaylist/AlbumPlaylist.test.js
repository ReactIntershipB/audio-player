import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'mobx-react';

import AlbumPlaylist from './AlbumPlaylist';
import * as mockStore from './mockStore';

describe('AlbumPlaylist', () => {
  const match = {
    params: {
      id: 123456
    }
  };

  it('should match snapshot', () => {
    const albumModel = new mockStore.AlbumModel();
    const songModel = {};
    const playerModel = {};

    const albumPlaylist = renderer
      .create(
        <Provider
          albumModel={albumModel}
          songModel={songModel}
          playerModel={playerModel}
          appUI={{}}
        >
          <AlbumPlaylist match={match} />
        </Provider>)
      .toJSON();
    expect(albumPlaylist).toMatchSnapshot();
  });

  it('should call the find function with proper arguments', () => {
    const albumModel = new mockStore.AlbumModel();
    const songModel = {};
    const playerModel = {};
    const find = albumModel.find;

    renderer
      .create(
        <Provider
          albumModel={albumModel}
          songModel={songModel}
          playerModel={playerModel}
          appUI={{}}
        >
          <AlbumPlaylist match={match} />
        </Provider>
      );

    expect(find).toHaveBeenCalled();
    expect(find).toHaveBeenCalledWith(match.params.id);
    expect(find).toHaveBeenCalledTimes(1);
  });
});
