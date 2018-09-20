import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from 'react-testing-library';
import { Provider } from 'mobx-react';

import Player from './Player';
import * as mockStore from './mockStorePlayer';

describe('Player', () => {
    it('should match snapshot', () => {
        const props = {
            albumModel: {},
            songModel: new mockStore.SongModel(),
            searchModel: {},
            appUI: {}
        };

        const player = renderer
            .create(
                <Provider {...props} >
                    <Player />
                </Provider>
            ).toJSON();

        expect(player).toMatchSnapshot();
    });

    it('should match snapshot after click play button', () => {
        const props = {
            albumModel: {},
            songModel: new mockStore.SongModel(),
            searchModel: {},
            appUI: {}
        };
        const player = render(
            <Provider {...props} >
                <Player />
            </Provider>
        );

        // const playButton = player.querySelector(`[data-testid="play-button"]`);
        // fireEvent.click(playButton);

        // expect(player).toMatchSnapshot();
    });
});
