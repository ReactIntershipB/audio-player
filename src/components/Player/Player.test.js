import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'mobx-react';

import Player from './Player';
import * as mockStore from './mockStorePlayer';

describe('Player', () => {
    it('should match snapshot', () => {
        const albumModel = {};
        const songModel = new mockStore.SongModel();
        const playerModel = {};
        const appUI = new mockStore.AppUI();

        const player = renderer
            .create(
                <Provider
                    albumModel={albumModel}
                    songModel={songModel}
                    playerModel={playerModel}
                    appUI={appUI}
                >
                    <Player />
                </Provider>
            ).toJSON();

        expect(player).toMatchSnapshot();
    });
});
