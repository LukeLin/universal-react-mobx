import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Base from '../Base';

import TodoList from '../../components/todos/TodoList';

@observer(['store'])
class TodosPage extends Base {
    constructor(props, context){
        super(props, context);
    }

    render(){
        return (
            <TodoList todoList={ this.props.store }/>
        );
    }
}

export default TodosPage;
