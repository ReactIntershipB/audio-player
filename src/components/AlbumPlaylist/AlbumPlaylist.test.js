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

  it('should match snapshot', () => {
    const props = {
      albumModel: new mockStore.AlbumModel(),
      songModel: {},
      playerModel: {},
      appUI: {}
    };

    const albumPlaylist = renderer
      .create(
        <Provider
          albumModel={props.albumModel}
          songModel={props.songModel}
          playerModel={props.playerModel}
          appUI={props.appUI}
        >
          <AlbumPlaylist match={match} />
        </Provider>
        ).toJSON();

    expect(albumPlaylist).toMatchSnapshot();
  });

  it('should call the find function with proper arguments', () => {
    const props = {
      albumModel: new mockStore.AlbumModel(),
      songModel: {},
      playerModel: {},
      appUI: {}
    };
    const find = props.albumModel.find;

    renderer
      .create(
        <Provider
          albumModel={props.albumModel}
          songModel={props.songModel}
          playerModel={props.playerModel}
          appUI={props.appUI}
        >
          <AlbumPlaylist match={match} />
        </Provider>
      );

    expect(find).toHaveBeenCalled();
    expect(find).toHaveBeenCalledWith(match.params.id);
    expect(find).toHaveBeenCalledTimes(1);
  });
});
