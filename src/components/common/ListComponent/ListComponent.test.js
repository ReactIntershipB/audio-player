import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ListComponent, ListUi } from './ListComponent';

const mockData = {
    id: 302127,
    title: 'Discovery',
    album: {
        cover_small: 'https://e-cdns-images.dzcdn.net/images/cover/2e018122cb56986277102d2041a592c8/56x56-000000-80-0-0.jpg'
    },
    tracks: {
        data: [
            {
                id: 3135553,
                title: 'One More Time',
                duration: 320,
                artist: {
                    name: 'Daft Punk'
                }
            }
        ]
    }
};

describe('ListComponent', () => {
    it('should match snapshot', () => {
        // arrange
        const props = {
            albumModel: {},
            songModel: {},
            searchModel: {},
            appUI: {}
        };

        // act
        const listComponent = renderer
            .create(
                <Provider {...props} >
                    <Router>
                        <ListComponent
                            type={'track'}
                            heading={mockData.title}
                            data={mockData.tracks.data}
                            albumTitle={mockData.title}
                        />
                    </Router>
                </ Provider>
            )
            .toJSON();

        // assert
        expect(listComponent).toMatchSnapshot();
    });
});

describe('ListUi', () => {
    const listUi = new ListUi();

    describe('formatNumber', () => {
        it('should return number passed as an argument when number is above 10', () => {
            // arrange
            const mockDurationSec = 50;

            // act
            const formatNumber = listUi.formatNumber(mockDurationSec);

            // assert
            expect(formatNumber).toEqual(mockDurationSec);
        });

        it('should return passed number with 0 at the beginning when number is less then 10.', () => {
            // arrange
            const mockDurationSec = 1;

            // act
            const formatNumber = listUi.formatNumber(mockDurationSec);

            // assert
            expect(formatNumber).toEqual('01');
        });
    });

    describe('getDuration', () => {
        it('should convert duration in seconds to string in minutes format', () => {
            // arrange
            const mockDuration = 125;

            // act
            const getDuration = listUi.getDuration(mockDuration);

            // assert
            expect(getDuration).toEqual('2:05');
        });
    });
});
