import React from 'react';
import Immutable from 'immutable';

import createRender from '../utils/createApp';
import Page from '../../../common/pages/index/IndexPage.jsx';
import IndexStore from '../../../common/stores/index';

import '../../css/main.css';

let createApp = createRender({
    transformer: Immutable.fromJS
});

createApp({
    store: new IndexStore(),
    component: <Page/>
});
