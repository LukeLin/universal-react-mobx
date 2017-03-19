import React, {PropTypes, Component} from 'react';
import {observer, inject} from 'mobx-react';
import Base from '../../pages/Base';

@observer
class Todo extends Base {
    constructor(props, context) {
        super(props, context);

        // this.onChange = this.onChange.bind(this);
        // this.removeTodo = this.removeTodo.bind(this);
    }

    onChange() {
        let {todo} = this.props;

        todo.setFinished(!todo.finished)
    }

    onRemoveTodo(e){
        this.props.removeTodo(e, this.props.index);
    }

    render() {
        let {todo, index} = this.props;

        return (
            <li>
                <input
                    type="checkbox"
                    checked={todo.finished}
                    onChange={ this.onChange }
                />{todo.title}
                <button onClick={ this.props.addTodo }>add</button>
                <button onClick={ this.onRemoveTodo }>remove</button>
            </li>
        );
    }
}

export default Todo;
