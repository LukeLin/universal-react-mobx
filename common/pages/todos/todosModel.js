import {
    observable,
    extendObservable,
    action
} from 'mobx';

class TodoModel {
    id = Math.random();
    @observable title;
    @observable finished = false;

	constructor(data) {
        extendObservable(this, data);
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
