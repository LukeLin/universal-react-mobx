import React, { PropTypes, Component } from 'react';
import { observer } from 'mobx-react';

@observer
class Todo extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let { todo } = this.props;

        return (
            <li>
                <input
                    type="checkbox"
                    checked={todo.finished}
                    onChange={() => todo.finished = !todo.finished}
                    />{todo.title}
            </li>
        );
    }
}

export default Todo;
