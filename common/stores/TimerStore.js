import {
    observable,
    action,
    runInAction
} from 'mobx';

class TimerStore {
    @observable timer = 0;

    constructor() {
        
    }

    @action
    startTimer(){
        setInterval(action('startTimer', () => {
            this.timer += 1;
        }), 1000);
    }

    @action
    resetTimer() {
        this.timer = 0;
    }
}

export default TimerStore;
