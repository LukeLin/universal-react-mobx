import {
    observable,
    computed,
    extendObservable,
    action,
    runInAction,
    asFlat
} from 'mobx';

import TodoModel from '../models/TodoModel';

class TodoStore {
    // only the children of the value becomes observable
    @observable todos = asFlat([]);

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
        if(state && state.todos) {
            let todoStore = new TodoStore({
                todos: state.todos.map(item => TodoModel.fromJS(item))
            });
            return todoStore;
        }
    }
}

export default TodoStore;
