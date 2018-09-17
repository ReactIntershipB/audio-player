import { action, observable } from 'mobx';

export class AppUI {
    @observable isPaused = true;
    @observable isButtonDisabled = true;

    @action
    togglePause () {
        this.isPaused = !this.isPaused;
    }

    @action
    enableButton(term) {
      this.isButtonDisabled = !term;
    }
}

export const appUI = new AppUI();
