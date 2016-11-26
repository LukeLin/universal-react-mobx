import React from 'react';

import createRender from '../utils/createApp';
import Page from '../../../common/pages/index/IndexPage.jsx';
import Store from '../../../common/stores/index';

import '../../css/main.css';

let createApp = createRender();

createApp({
    Store,
    component: <Page/>
});
