import { action, observable } from 'mobx';

export class AppUI {
    @observable isPaused = true;
    @observable isButtonDisabled = true;

    @action
    togglePause () {
        this.isPaused = !this.isPaused;
    }

    @action
    changeButton(term) {
      if (!term) {
        this.isButtonDisabled = false;
      }
    }
}

export const appUI = new AppUI();
