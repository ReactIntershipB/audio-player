import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'mobx-react';

import Search from './Search';

class MockSearchModel {
    term = 'test';
    termText = 'test';
    filterName = 'artist';
}

describe('Search', () => {
    it('should match snapshot', () => {
        // arrange
        const props = {
            albumModel: {},
            songModel: {},
            searchModel: new MockSearchModel(),
            appUI: {}
        };
        const match = {
            params: {}
        };

        // act
        const search = renderer
            .create(
                <Provider {...props} >
                    <Search match={match} />
                </Provider>
            ).toJSON();

        // assert
        expect(search).toMatchSnapshot();
    });
});
