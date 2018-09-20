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
