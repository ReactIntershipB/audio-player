import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'mobx-react';
import { PlayIcon } from './PlayIcon';

class MockAppUI {
    isPlaying = true;
}

describe('PlayIcon', () => {
    it('should match snapshot when song is playing', () => {
        // arrange
        const props = {
            albumModel: {},
            songModel: {},
            searchModel: {},
            appUI: new MockAppUI()
        };

        // act
        const albumPlaylist = renderer
            .create(
                <Provider {...props}>
                    <PlayIcon />
                </Provider>
            ).toJSON();

        // assert
        expect(albumPlaylist).toMatchSnapshot();
    });

    it('should match snapshot when song is not playing', () => {
        // arrange
        const props = {
            albumModel: {},
            songModel: {},
            searchModel: {},
            appUI: {}
        };

        // act
        const albumPlaylist = renderer
            .create(
                <Provider {...props}>
                    <PlayIcon />
                </Provider>
            ).toJSON();

        // assert
        expect(albumPlaylist).toMatchSnapshot();
    });
});
