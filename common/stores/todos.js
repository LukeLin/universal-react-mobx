import { observable, computed, extendObservable } from 'mobx';

class TodoList {
    @observable todos = [];
    @computed get unfinishedTodoCount(){
        return this.todos.filter(todo => !todo.finished).length;
    }

    constructor(state = {}){
        extendObservable(this, state);
    }
}

export default TodoList;
