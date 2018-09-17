import { action, observable } from 'mobx';

export class AppUI {
    @observable isPaused = false;
    @observable isButtonDisabled = true;
    @observable timer = 0;

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

    @action
    timerStart() {
      setInterval(() => {
        if (!this.isPaused) {
          this.timer++;
        }
      }, 1000);
    }
}

export const appUI = new AppUI();
