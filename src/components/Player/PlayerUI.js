import { observable, action } from 'mobx';

export class PlayerUI {
    @observable timer = 0;
    @observable songIsPlaying = false;

    setTimer (songDuration) {
        this.songDuration = songDuration;
        this.initTimer();
    }

    @action playSong() {
        this.songIsPlaying = true;
    }

    @action pauseSong() {
        this.songIsPlaying = false;
    }

    @action reset () {
        clearInterval(this.timerInterval);
        this.timer = 0;
        this.songIsPlaying = false;
    }

    @action timerStep () {
        this.timer = this.timer + 0.1;
    }

    initTimer() {
        this.timerInterval = setInterval(() => {
            if (this.songIsPlaying) {
                if (this.timer < this.songDuration) {
                    this.timerStep();
                } else {
                    this.reset();
                }
            }
        }, 100);
    }

    @action
    updateTimer (value) {
        this.timer = value;
    }
}
