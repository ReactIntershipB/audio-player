import { observable, action } from 'mobx';

export class PlayerUI {
    @observable timer = 0;
    @observable songIsPlaying = false;

    constructor (songDuration) {
        this.songDuration = songDuration;
        this.initTimer();
    }

    @action playSong() {
        this.songIsPlaying = true;
    }

    @action pauseSong() {
        this.songIsPlaying = false;
    }

    @action
    initTimer() {
        setInterval(() => {
        if (this.songIsPlaying && this.timer < this.songDuration) {
            this.timer = this.timer + 0.1;
        } else if (this.songIsPlaying && this.timer >= this.songDuration) {
            this.timer = 0;
            this.songIsPlaying = false;
        }
        }, 100);
    }

    @action
    updateTimer (value) {
        this.timer = value;
    }
}
