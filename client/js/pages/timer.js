import React from 'react';

import createRender from '../utils/createApp';
import Page from '../../../common/pages/timer/TimerPage.jsx';
import Store from '../../../common/stores/TimerStore';

import '../../css/main.css';

let createApp = createRender();

createApp({
    Store,
    component: <Page/>
});
