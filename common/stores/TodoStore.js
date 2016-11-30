import {
    observable,
    computed,
    extendObservable,
    action,
    runInAction
} from 'mobx';

import TodoModel from '../models/TodoModel';

class TodoStore {
    @observable todos = [];
    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }

    constructor(state = {}) {
        // required in strict mode to be allowed to update state:
        runInAction('initialize TodoStore', () => {
            extendObservable(this, state);
        });
    }

    @action
    addTodo(todo) {
        todo && this.todos.push(todo);
    }

    @action
    removeTodo(index){
        this.todos.splice(index, 1);
    }

    static fromJS(state) {
        let todoStore = new TodoStore({
            todos: state.todos.map(item => TodoModel.fromJS(item))
        });
        return todoStore;
    }
}

export default TodoStore;
