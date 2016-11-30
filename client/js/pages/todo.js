import React from 'react';

import createRender from '../utils/createApp';
import Page from '../../../common/pages/todo/TodoPage.jsx';
import Store from '../../../common/stores/TodoStore';

import '../../css/main.css';

let createApp = createRender();

createApp({
    Store,
    component: <Page/>
});
