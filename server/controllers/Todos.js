import React from 'react';
import Page from '../../common/pages/todos/TodosPage.jsx';
import Store from '../../common/stores/todos';
import Todo from '../../common/pages/todos/todosModel';


module.exports = function (req, res, next) {
    let store = new Store();

    store.addTodo(new Todo({
        title: "Get Coffee"
    }));
    store.addTodo(new Todo({
        title: "Write simpler code"
    }));

    store.todos[0].setFinished(true);

    res.renderReactHTML({
        component: <Page/> ,
        store,
        locals: {
            appName: 'todos',
            title: 'todos page'
        },
        pageConfig: {
            user: 'test'
        }
    });
};
