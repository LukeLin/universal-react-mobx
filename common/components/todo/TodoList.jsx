import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Base from '../../pages/Base';

import Todo from './Todo';
import TodoModel from '../../models/TodoModel.js';

@observer
class TodoList extends Base {
    constructor(props, context) {
        super(props, context);

        // this.addTodo = this.addTodo.bind(this);
        // this.removeTodo = this.removeTodo.bind(this);
    }

    onAddTodo(e) {
        e.preventDefault();

        let { todoList } = this.props;

        todoList.addTodo(new TodoModel({
            id: todoList.todos.length,
            title: 'some text' + todoList.todos.length
        }));
    }

    onRemoveTodo(e, index){
        e.preventDefault();

        let { todoList } = this.props;

        todoList.removeTodo(index);
    }

    render() {
        let { todoList } = this.props;

        return (
            <div>
                <ul>
                    {todoList.todos.map((todo, index) => {
                        return (
                            <Todo todo={todo}
                        index={ index }
                            key={todo.id} 
                            addTodo={this.onAddTodo}
                            removeTodo={ this.onRemoveTodo }/>
                        );
                    })}
                </ul>
                Tasks left: {todoList.unfinishedTodoCount}
            </div>
        );
    }
}

export default TodoList;
