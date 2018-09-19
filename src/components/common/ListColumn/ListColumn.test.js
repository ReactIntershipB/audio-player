import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'mobx-react';

import ListColumn from './ListColumn';
import * as models from '../../../models/mockStore';

describe('ListColumn', () => {
    it('should match snapshot', () => {
        const listColumn = renderer
            .create(
                <Provider {...models} appUI={{}}>
                    <ListColumn
                        heading={models.mockData.title}
                        data={models.mockData.tracks.data}
                        avatar={models.mockData.cover_small} />
                </ Provider>
            )
            .toJSON();

        expect(listColumn).toMatchSnapshot();
    });
});
