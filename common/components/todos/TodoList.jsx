import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Base from '../../pages/Base';

import Todo from './Todo';

@observer
class TodoList extends Base {
    render() {
        return (
            <div>
                <ul>
                    {this.props.todoList.todos.map(todo =>
                        <Todo todo={todo} key={todo.id} />
                    )}
                </ul>
                Tasks left: {this.props.todoList.unfinishedTodoCount}
            </div>
        );
    }
}

export default TodoList;
