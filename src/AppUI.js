import { action, observable } from 'mobx';

export class AppUI {
    @observable isPaused = false;

    @action
    togglePlay () {
        this.isPaused = !this.isPaused;
    }
}

export const appUI = new AppUI();
