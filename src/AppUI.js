import { action, observable } from 'mobx';

export class AppUI {
    @observable isPaused = false;
    @observable isButtonDisabled = true;

    @action
    togglePlay() {
        this.isPaused = !this.isPaused;
    }

    @action
    enableButton(term) {
      this.isButtonDisabled = !term;
    }
}

export const appUI = new AppUI();
