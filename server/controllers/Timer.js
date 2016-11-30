import React from 'react';
import Page from '../../common/pages/timer/TimerPage.jsx';
import Store from '../../common/stores/TimerStore';


module.exports = function (req, res, next) {
    res.renderReactHTML({
        component: <Page/>,
        store: new Store(),
        locals: {
            appName: 'timer',
            title: 'timer page'
        },
        pageConfig: {
            user: 'test'
        }
    });
};
