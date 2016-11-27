import { observable, computed, extendObservable, action } from 'mobx';

import TodoModel from '../pages/todos/todosModel';

class TodoStore {
    @observable todos = [];
    @computed get unfinishedTodoCount(){
        return this.todos.filter(todo => !todo.finished).length;
    }

    constructor(state = {}){
        extendObservable(this, state);
    }

    @action
    addTodo(todo){
        todo && this.todos.push(todo);
    }

    static fromJS(state){
        let todoStore = new TodoStore();
		todoStore.todos = state.todos.map(item => TodoModel.fromJS(item));
		return todoStore;
    }
}

export default TodoStore;
