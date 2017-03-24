import React from 'react';
import { renderToString } from 'react-dom/server';
// import {createMemoryHistory, match, RouterContext} from 'react-router';
import { matchPath } from 'react-router-dom'
import { StaticRouter } from 'react-router'
import { Provider, useStaticRendering } from 'mobx-react';

import configureStore from '../../common/stores/spaStores.js';
import preRenderMiddleware from '../utils/preRender';
import ejs from 'ejs';
import config from '../config/config.json';
import { getDefaultJSVersion } from './renderReactMiddleware';
import App from '../../common/AppForSpa';
import { jsObj as safeJSON } from 'secure-filters';
import fs from 'fs';
import routes from '../../common/routes.js';

const defaultTemplate = fs.readFileSync(__dirname + '/../views/index.html', 'utf8');

useStaticRendering(true);

// todo: to be migrated to react router v4
export default async function renderMatch(req, res) {
    const history = createMemoryHistory();
    const stores = configureStore({
        commonStore: {
            user: {
                name: 'test'
            }
        }
    });
    let appConfig = {
        time: Date.now()
    };

    const component = null;

    routes.some((route) => {
        const match = matchPath(req.originalUrl, route);
        if (match) component = route.component;

        return match;
    });

    if (!component) {
        res.redirect('/');;
        return;
    }

    let debug = req.query.debug && (req.query.debug === config.application.debugName);
    let version = config.application.version;
    let jsVersion = '';
    // prefer config version, useful when using CDN config
    if (process.env.NODE_ENV === 'production') {
        jsVersion = version && version.js;
    } else {
        jsVersion = getDefaultJSVersion('app');
    }
    let componentHTML = '';
    let errorMsg = '';
    let context = {};

    try {
        await preRenderMiddleware(stores, {
            component,
            // location,
            // params
        }, appConfig, req);

        componentHTML = renderToString(
            <StaticRouter
                location={req.originalUrl}
                context={context}>
                <Provider { ...stores }>
                    <App appConfig={appConfig}/>
                </Provider>
            </StaticRouter>
        );

    } catch (ex) {
        errorMsg = ex.stack;
        console.log(ex.stack)
    }

    if (context.url) {
        res.writeHead(301, {
            Location: context.url
        })
        return res.end();
    }

    let pageStr = ejs.render(defaultTemplate, Object.assign({
        errorMsg,
        html: componentHTML,
        state: safeJSON(stores),
        appName: 'app',
        title: '',
        test: process.env.NODE_ENV !== 'production',
        debug: debug,
        appConfig: safeJSON(appConfig),
        version: {
            js: jsVersion,
            css: version && version.css
        }
    }, {}), {
            compileDebug: false
        });

    res.status(200).send(pageStr);


    /*const routes = createRoutes(stores, appConfig);

    match({routes, location: req.originalUrl}, async function (err, redirect, props){
        if (err) {
            res.status(500).json(err);
        } else if (redirect) {
            res.redirect(302, redirect.pathname + redirect.search);
        } else if (props) {
            let debug = req.query.debug && (req.query.debug === config.application.debugName);
            let version = config.application.version;
            let jsVersion = '';
            // prefer config version, useful when using CDN config
            if (process.env.NODE_ENV === 'production') {
                jsVersion = version && version.js;
            } else {
                jsVersion = getDefaultJSVersion('app');
            }
            let componentHTML = '';
            let errorMsg = '';

            try {
                await preRenderMiddleware(stores, props, appConfig, req);

                componentHTML = renderToString(
                    <Provider { ...stores }>
                        <App appConfig={ appConfig }>
                            <RouterContext {...props} />
                        </App>
                    </Provider>
                );

            } catch(ex){
                errorMsg = ex.stack;
                console.log(ex.stack)
            }

            let pageStr = ejs.render(defaultTemplate, Object.assign({
                errorMsg,
                html: componentHTML,
                state: safeJSON(stores),
                appName: 'app',
                title: '',
                test: process.env.NODE_ENV !== 'production',
                debug: debug,
                appConfig: safeJSON(appConfig),
                version: {
                    js: jsVersion,
                    css: version && version.css
                }
            }, {}), {
                compileDebug: false
            });

            res.status(200).send(pageStr);

        } else {
            res.redirect('/');
        }
    });*/
}
