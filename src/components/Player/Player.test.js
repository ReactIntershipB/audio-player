import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'mobx-react';

import Player from './Player';
import * as mockStore from './mockStorePlayer';

describe('Player', () => {
    it('should match snapshot', () => {
        // arrange
        const props = {
            albumModel: {},
            songModel: new mockStore.SongModel(),
            searchModel: {},
            appUI: {}
        };

        // act
        const player = renderer
            .create(
                <Provider {...props} >
                    <Player />
                </Provider>
            ).toJSON();

        // assert
        expect(player).toMatchSnapshot();
    });
});
