import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'mobx-react';

import Player from './Player';
import * as mockStore from './mockStorePlayer';

describe('Player', () => {
    it('should match snapshot', () => {
        const props = {
            albumModel: {},
            songModel: new mockStore.SongModel(),
            playerModel: {},
            appUI: {}
        };

        const player = renderer
            .create(
                <Provider
                    albumModel={props.albumModel}
                    songModel={props.songModel}
                    playerModel={props.playerModel}
                    appUI={props.appUI}
                >
                    <Player />
                </Provider>
            ).toJSON();

        expect(player).toMatchSnapshot();
    });
});
