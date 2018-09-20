import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'mobx-react';
import { PlayIcon } from './PlayIcon';

class MockAppUI {
     isPlaying = true;
}

describe('PlayIcon', () => {
    it('should match snapshot when song is playing', () => {
        const props = {
            albumModel: {},
            songModel: {},
            playerModel: {},
            appUI: new MockAppUI()
        };

        const albumPlaylist = renderer
            .create(
                <Provider {...props}>
                    <PlayIcon />
                </Provider>
            ).toJSON();

        expect(albumPlaylist).toMatchSnapshot();
    });

    it('should match snapshot when song is not playing', () => {
        const props = {
            albumModel: {},
            songModel: {},
            playerModel: {},
            appUI: {}
        };

        const albumPlaylist = renderer
            .create(
                <Provider {...props}>
                    <PlayIcon />
                </Provider>
            ).toJSON();

        expect(albumPlaylist).toMatchSnapshot();
    });
});
