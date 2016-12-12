import {
    observable,
    action,
    runInAction
} from 'mobx';

import fetchList from '../fetchList';

export default class VoteStore {
    @observable message = '';

    constructor(){

    }

    @action
    loadData(opts, req){
        return fetchList.getVote(opts, req).then(action('update state after fetching data', (resp) => {
            this.message = resp.data.message;
        }))
    }
}

