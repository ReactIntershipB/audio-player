import { action, observable } from 'mobx';

const mockData = {
    id: 302127,
    title: 'Discovery',
    cover_small: 'https://e-cdns-images.dzcdn.net/images/cover/2e018122cb56986277102d2041a592c8/56x56-000000-80-0-0.jpg',
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

export class AlbumModel {
    @observable data = [];
    @observable loading = false;

    @action
    find = () => {
        this.getData();
    }

    getData = () => {
        this.data = mockData;
    }
}

export const albumModel = new AlbumModel();
export const songModel = {};
export const playerModel = {};
