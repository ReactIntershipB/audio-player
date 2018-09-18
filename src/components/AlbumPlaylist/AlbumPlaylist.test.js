import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'mobx-react';

import AlbumPlaylist from './AlbumPlaylist';
import { appUI } from '../../AppUI';
import * as models from './mockStore';

describe('AlbumPlaylist', () => {
  it('should match snapshot', () => {
    const match = {
      params: {
        id: 123456
      }
    };

    const albumPlaylist = renderer
      .create(
        <Provider {...models} appUI={appUI}>
          <AlbumPlaylist match={match} />
        </Provider>)
      .toJSON();
    expect(albumPlaylist).toMatchSnapshot();
  });
});
