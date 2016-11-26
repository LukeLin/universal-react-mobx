import {
    observable,
    action
} from 'mobx';

class TodoModel {
    id = Math.random();
    @observable title;
    @observable finished = false;

	constructor(store, id, title, finished) {
		this.store = store;
		this.id = id;
		this.title = title;
		this.finished = finished;
	}

    @action
    setFinished(finished) {
        this.finished = finished
    }

    toJS() {
        return {
            id: this.id,
            title: this.title,
            finished: this.finished
        };
    }

    static fromJS(store, object) {
        return new TodoModel(store, object.id, object.title, object.finished);
    }
}

export default TodoModel;
