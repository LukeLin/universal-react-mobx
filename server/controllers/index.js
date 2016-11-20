import React from 'react';
import Page from '../../common/pages/index/IndexPage';
import IndexStore from '../../common/stores/index';


module.exports = function (req, res, next) {
    res.renderReactHTML({
        component: <Page/>,
        store: new IndexStore(),
        locals: {
            appName: 'index',
            title: 'index page'
        },
        pageConfig: {
            user: 'test'
        }
    });
};
