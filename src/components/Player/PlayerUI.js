import { observable, action } from 'mobx';

export class PlayerUI {
    @observable timer = 0;
    @observable songIsPlaying = false;
    @observable getNextSong = false;
    @observable repeat = false;
    @observable randomize = false;

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
        this.getNextSong = false;
        this.timerInterval = setInterval(() => {
            if (this.songIsPlaying) {
                if (this.timer < this.songDuration) {
                    this.timerStep();
                } else {
                    this.reset();
                    this.getNextSong = true;
                }
            }
        }, 100);
    }

    @action
    updateTimer (value) {
        this.timer = value;
    }

    @action
    toggleRepeatOption () {
        this.repeat = !this.repeat;
        this.randomize = this.randomize && this.repeat ? false : this.randomize;
    }

    @action
    toggleRandomizeOption () {
        this.randomize = !this.randomize;
        this.repeat = this.repeat && this.randomize ? false : this.repeat;
    }
}
