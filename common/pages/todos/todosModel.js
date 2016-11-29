import {
    observable,
    extendObservable,
    action,
    runInAction
} from 'mobx';

class TodoModel {
    id;
    @observable title = '';
    @observable finished = false;

	constructor(data) {
        runInAction('initialize TodoModel', () => {
            extendObservable(this, data);
        });
	}

    @action
    setFinished(finished) {
        this.finished = finished
    }

    static fromJS(object) {
        return new TodoModel(object);
    }
}

export default TodoModel;
