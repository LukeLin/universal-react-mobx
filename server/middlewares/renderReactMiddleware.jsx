import ejs from 'ejs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider, useStaticRendering } from 'mobx-react'
import { jsObj as safeJSON } from 'secure-filters';
import fs from 'fs';

import App from '../../common/App.jsx';
import config from '../config/config.json';

useStaticRendering(true);

const defaultTemplate = fs.readFileSync(__dirname + '/../views/index.html', 'utf8');
const reg = /-(\w+)\./gi;

export function getDefaultJSVersion(name) {
    let webpackAssets = fs.readFileSync(__dirname + '/../../webpack-assets.json', 'utf8');

    try {
        webpackAssets = JSON.parse(webpackAssets);
    } catch (ex) {
        console.log('webpack-assets.json parsed error');
        webpackAssets = {};
    }

    let match = reg.exec(webpackAssets[name]);

    return match && match[1] || '';
}

export default function reactRender(middlewareConfig = {}) {
    return function (req, res, next) {
        res.renderReactHTML = function (opts = {}) {
            let {
                template = '',
                component = '',
                store = {},
                locals = {},
                pageConfig = {},
                needTransform = true
            } = opts;
            let html = '';
            pageConfig = Object.assign(typeof middlewareConfig.appConfig === 'object'
                ? middlewareConfig.appConfig : {}, pageConfig);

            try {
                html = renderToString((
                    <Provider store={store}>
                        <App appconfig={pageConfig}>
                            {component}
                        </App>
                    </Provider>
                ));
            } catch (ex) {
                html = 'internal server error: \n' + ex.message;
                console.error(ex.stack);
            }

            let debug = req.query.debug && (req.query.debug === config.application.debugName);
            let version = config.application.version;
            let jsVersion = '';
            // prefer config version, useful when using CDN config
            if (process.env.NODE_ENV === 'production') {
                jsVersion = version && version.js;
            } else {
                jsVersion = getDefaultJSVersion(locals.appName || 'index');
            }
            template = template || middlewareConfig.defaultTemplate || defaultTemplate;

            let finalLocals = Object.assign({
                html,
                state: safeJSON(store),
                appName: 'index',
                title: '',
                test: process.env.NODE_ENV !== 'production',
                debug,
                appConfig: safeJSON(pageConfig),
                version: {
                    js: jsVersion,
                    css: version && version.css
                }
            }, res.locals, locals);

            let pageStr = ejs.render(template, finalLocals, {
                compileDebug: false
            });

            res.status(200).send(pageStr);
        };

        next();
    };
}
