import React from 'react';

import createRender from '../utils/createApp';
import Page from '../../../common/pages/todos/TodosPage.jsx';
import Store from '../../../common/stores/todos';

import '../../css/main.css';

let createApp = createRender();

createApp({
    Store,
    component: <Page/>
});
