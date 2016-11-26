import { observable } from 'mobx';

class Todo {
    id = Math.random();
    @observable title;
    @observable finished = false;

    constructor(title){
        this.title = title;
    }
}

export default Todo;
