import { action, observable } from 'mobx';

export class AppUI {
    @observable isPaused = false;
    @observable isButtonDisabled = true;

    @action
    togglePlay () {
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
