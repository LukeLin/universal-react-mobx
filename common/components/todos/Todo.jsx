import React, {PropTypes, Component} from 'react';
import {observer} from 'mobx-react';

@observer
class Todo extends Component {
    constructor(props, context) {
        super(props, context);

        this.onChange = this.onChange.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
    }

    onChange() {
        let {todo} = this.props;

        todo.setFinished(!todo.finished)
    }

    removeTodo(e){
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
                <button onClick={ this.removeTodo }>remove</button>
            </li>
        );
    }
}

export default Todo;
