import {
    observable,
    action,
    runInAction,
    extendObservable
} from 'mobx';

class CommonStore {
    constructor(state = {}) {
        runInAction('CommonStore init', () => {
            extendObservable(this, state)
        });
    }
}

export default CommonStore;