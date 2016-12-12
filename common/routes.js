import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './pages/App/App';
// import Vote from './universalPage/Vote';
import About from './pages/App/About';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
    require.ensure = function requireModule(deps, callback) {
        callback(require);
    };
}

function onChange(prevState, nextState, replace, cb){
    let lastRoute = nextState.routes[nextState.routes.length - 1];

    if(lastRoute.component) {
        let component = lastRoute.component;
        let location = nextState.location;
        let pageComponent = component.OriginalPage ? component.OriginalPage : component;

        Object.assign(window.__APP_CONFIG__, {
            pageId: location.query.pageId || (pageComponent.pageConfig && pageComponent.pageConfig.pageId)
        });
    }

    cb();
}


export default (stores) => {
    return (
        <Route path="/" component={App} onChange={ onChange }>
            <IndexRoute getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./pages/App/Vote').default);
                }, 'Vote');
            }}/>
            <Route path="vote" getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./pages/App/Vote').default);
                }, 'Vote');
            }}/>
            <Route path="about" component={About} />
        </Route>
    );
};
