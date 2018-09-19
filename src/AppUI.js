import { action, observable } from 'mobx';

export class AppUI {
    @observable isPlaying = false;
    @observable isButtonDisabled = true;

    @action
    togglePlaying() {
        this.isPlaying = !this.isPlaying;
    }

    @action
    updatePlayingStatus(status) {
      this.isPlaying = status;
    }

    @action
    changeButtonStatus(term) {
      this.isButtonDisabled = !term;
    }
}

export const appUI = new AppUI();
