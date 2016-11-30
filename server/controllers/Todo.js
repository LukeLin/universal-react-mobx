import React from 'react';
import Page from '../../common/pages/todo/TodoPage.jsx';
import Store from '../../common/stores/TodoStore';
import TodoModel from '../../common/models/TodoModel';


module.exports = function (req, res, next) {
    let store = new Store();

    store.addTodo(new TodoModel({
        id: 0,
        title: "Get Coffee"
    }));
    store.addTodo(new TodoModel({
        id: 1,
        title: "Write simpler code"
    }));

    store.todos[0].setFinished(true);

    res.renderReactHTML({
        component: <Page/> ,
        store,
        locals: {
            appName: 'todo',
            title: 'todo page'
        },
        pageConfig: {
            user: 'test'
        }
    });
};
