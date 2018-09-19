import { observable } from 'mobx';

export const mockData = {
    data: {
        id: 3135553,
        readable: true,
        title: 'One More Time',
        title_short: 'One More Time',
        title_version: '',
        link: 'https://www.deezer.com/track/3135553',
        duration: 320,
        rank: 817122,
        explicit_lyrics: false,
        preview: 'https://cdns-preview-e.dzcdn.net/stream/c-e77d23e0c8ed7567a507a6d1b6a9ca1b-7.mp3',
        artist: {
            id: 27,
            name: 'Daft Punk',
            tracklist: 'https://api.deezer.com/artist/27/top?limit=50',
            type: 'artist'
        }
    }
};

class MockModel {
    @observable data = [];
    @observable loading = false;

    find = jest.fn(() => {
        this.getData();
    });

    getData = () => {
        this.data = mockData;
    }
}

export class SongModel extends MockModel {
    @observable currentSongId = 0;

    get songLink() {
        return this.data.preview;
    }

    get songTitle() {
        return this.data.title;
    }

    get songLength() {
        return 30;
    }

    get songLoaded() {
        return !!this.data.preview;
    }

    setCurrentSongId(id) {
        this.currentSongId = id;
    }
}

export class AppUI {
    @observable isPlaying = false;
    @observable isButtonDisabled = true;

    togglePlaying() {
        this.isPlaying = !this.isPlaying;
    }

    updatePlayingStatus(status) {
      this.isPlaying = status;
    }

    changeButtonStatus(term) {
      this.isButtonDisabled = !term;
    }
}
