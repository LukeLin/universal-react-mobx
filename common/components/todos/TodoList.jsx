import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Base from '../../pages/Base';

import Todo from './Todo';
import TodoModel from '../../pages/todos/todosModel.js';

@observer
class TodoList extends Base {
    constructor(props, context) {
        super(props, context);

        this.addTodo = this.addTodo.bind(this);
    }

    addTodo(e) {
        e.preventDefault();

        let { todoList } = this.props;
        
        todoList.addTodo(new TodoModel('some text'));
    }

    render() {
        return (
            <div>
                <ul>
                    {this.props.todoList.todos.map(todo =>
                        <Todo todo={todo} key={todo.id} addTodo={this.addTodo} />
                    )}
                </ul>
                Tasks left: {this.props.todoList.unfinishedTodoCount}
            </div>
        );
    }
}

export default TodoList;
