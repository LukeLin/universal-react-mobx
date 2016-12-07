import {
    observable,
    action,
    runInAction
} from 'mobx';

import fetchList from '../fetchList';

export default class VoteStore {
    @observable data = {};

    constructor(){

    }

    @action
    async loadData(opts, req){
        try {
            let resp = await fetchList.getVote(opts, req);

            runInAction("update state after fetching data", () => {
                this.data.replace(resp.data);
            })
        } catch(ex){}
    }
}

