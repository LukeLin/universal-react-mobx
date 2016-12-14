import {
    observable,
    action,
    runInAction,
    extendObservable
} from 'mobx';

import fetchList from '../fetchList';

export default class VoteStore {
    @observable message = '';

    constructor(state = {}){
        runInAction('initialize VoteStore', () => {
            extendObservable(this, state);
        });
    }

    @action
    loadData(opts, req){
        console.log('loadData...');

        return fetchList.getVote(opts, req).then(action('update state after fetching data', (resp) => {
            this.message = resp.data.message;
        }));
    }
}

